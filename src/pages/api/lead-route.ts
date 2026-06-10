// src/pages/api/lead-route.ts
// SSR endpoint — DO NOT set prerender = true.
// Handles form lead submissions: parses postcode → finds exclusive partner → returns routing JSON.

export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin, insertLead, insertLeadUntracked } from '../../lib/supabase';
import { parseOutcode, validateUKPostcode } from '../../lib/postcode';
import { services, getServiceBySlug } from '../../lib/services';
import type { ServiceSlug } from '../../types/index';

const VALID_SERVICE_SLUGS = new Set<string>(services.map((s) => s.slug));

interface InboundPayload {
  name:          string;
  phone:         string;
  postcode:      string;
  issue?:        string;
  service_slug?: string;
  town_slug?:    string;
  county_slug?:  string;
}

interface RoutingResponse {
  success:        boolean;
  outcode:        string;
  plumber_id:     string;
  routing_number: string;
  company_name:   string;
  lead_id:        string;
}

export const POST: APIRoute = async ({ request }) => {
  // Capture to a local const so TypeScript narrows it once and keeps the narrowing
  // across all await boundaries — imported bindings can lose narrowing after await.
  const db = supabaseAdmin;

  let body: InboundPayload;

  try {
    body = await request.json() as InboundPayload;
  } catch {
    return jsonError(400, 'Invalid JSON body.');
  }

  const { name, phone, postcode, issue, service_slug } = body;

  if (!name?.trim() || !phone?.trim() || !postcode?.trim()) {
    return jsonError(400, 'Missing required fields: name, phone, postcode.');
  }

  const safeName     = sanitise(name,        100);
  const safePhone    = sanitise(phone,        20);
  const safePostcode = sanitise(postcode,     10).toUpperCase();
  const safeIssue    = sanitise(issue ?? '', 500);

  // Validate service_slug against the known service list — reject unknown values
  const safeServiceSlug: ServiceSlug | null =
    service_slug && VALID_SERVICE_SLUGS.has(service_slug)
      ? (service_slug as ServiceSlug)
      : null;

  const serviceLabel = safeServiceSlug
    ? (getServiceBySlug(safeServiceSlug)?.name ?? safeServiceSlug)
    : null;

  if (!validateUKPostcode(safePostcode)) {
    return jsonError(422, `"${safePostcode}" does not appear to be a valid UK postcode.`);
  }

  const outcode = parseOutcode(safePostcode);
  if (!outcode) {
    return jsonError(422, 'Could not extract outcode from the provided postcode.');
  }

  if (!db) {
    return jsonError(500, 'Server configuration error.');
  }

  const { data: territory, error: territoryError } = await db
    .from('exclusive_territories')
    .select(`
      outcode,
      plumber_id,
      plumbers (
        id,
        company_name,
        phone_routing_number,
        mobile_number,
        account_status
      )
    `)
    .eq('outcode', outcode)
    .single();

  if (territoryError || !territory) {
    await insertLeadUntracked(db, {
      plumber_id: '00000000-0000-0000-0000-000000000000',
      outcode,
      lead_type:  'form',
      payload:    {
        name:         safeName,
        phone:        safePhone,
        issue:        safeIssue,
        service_slug: safeServiceSlug,
        source:       'web_form',
        unassigned:   true,
      },
      status: 'new',
    });
    return jsonError(404, `No partner currently covers the ${outcode} area. Your details have been logged.`);
  }

  const plumber = (territory as unknown as {
    plumbers: {
      id:                   string;
      company_name:         string;
      phone_routing_number: string;
      mobile_number:        string;
      account_status:       string;
    };
  }).plumbers;

  if (plumber.account_status !== 'active') {
    return jsonError(503, 'The partner for this area is temporarily unavailable. Please call our main line.');
  }

  const leadId = await insertLead(db, {
    plumber_id: plumber.id,
    outcode,
    lead_type:  'form',
    payload:    {
      name:         safeName,
      phone:        safePhone,
      issue:        safeIssue,
      service_slug: safeServiceSlug,
      source:       'web_form',
    },
    status: 'new',
  });

  if (!leadId) {
    console.error('[lead-route] Failed to persist lead for outcode:', outcode);
  }

  const serviceNote = serviceLabel ? `\nService: ${serviceLabel}` : '';
  triggerTwilioSMS({
    to:      plumber.mobile_number,
    message: `🔔 New LocalPlumber lead [${outcode}]${serviceNote}\nName: ${safeName}\nPhone: ${safePhone}\nIssue: ${safeIssue || 'Not specified'}\nLead ID: ${leadId ?? 'unknown'}`,
  }).catch((err) => console.error('[lead-route] Twilio SMS failed:', err));

  const response: RoutingResponse = {
    success:        true,
    outcode,
    plumber_id:     plumber.id,
    routing_number: plumber.phone_routing_number,
    company_name:   plumber.company_name,
    lead_id:        leadId ?? '',
  };

  return new Response(JSON.stringify(response), {
    status:  200,
    headers: { 'Content-Type': 'application/json' },
  });
};

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ success: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sanitise(value: string, maxLength: number): string {
  return value.trim().replace(/<[^>]*>/g, '').slice(0, maxLength);
}

async function triggerTwilioSMS({ to, message }: { to: string; message: string }): Promise<void> {
  const accountSid = import.meta.env.TWILIO_ACCOUNT_SID;
  const authToken  = import.meta.env.TWILIO_AUTH_TOKEN;
  const fromNumber = import.meta.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn('[triggerTwilioSMS] Twilio env vars not configured. SMS skipped.');
    return;
  }

  const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method:  'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type':  'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: fromNumber, Body: message }),
    },
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Twilio API error ${res.status}: ${errorBody}`);
  }
}
