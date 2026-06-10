// src/types/index.ts
// Shared TypeScript interfaces mirroring the Supabase schema exactly.
// Import these everywhere — never use inline `any` for DB rows.

// ── Geography ────────────────────────────────────────────────────────────────

export interface County {
  id:         number;
  name:       string;
  slug:       string;
  created_at: string;
}

export interface Town {
  id:         number;
  county_id:  number;
  name:       string;
  slug:       string;
  latitude:   number | null;
  longitude:  number | null;
  created_at: string;
}

export interface TownWithCounty extends Town {
  counties: County;
}

export interface Outcode {
  outcode:    string;
  town_id:    number;
  county_id:  number;
  created_at: string;
}

export interface OutcodeWithRelations extends Outcode {
  towns:    Town;
  counties: County;
}

// ── Partners ─────────────────────────────────────────────────────────────────

export type PlumberStatus = 'active' | 'suspended' | 'pending_onboarding';

export interface Plumber {
  id:                   string;
  company_name:         string;
  contact_name:         string | null;
  email:                string | null;
  phone_routing_number: string;
  mobile_number:        string;
  account_status:       PlumberStatus;
  gas_safe_number:      string | null;
  created_at:           string;
  updated_at:           string;
}

// ── Territories ───────────────────────────────────────────────────────────────

export interface ExclusiveTerritory {
  id:          number;
  outcode:     string;
  plumber_id:  string;
  assigned_at: string;
}

export interface TerritoryWithPlumber extends ExclusiveTerritory {
  plumbers: Plumber;
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export type LeadType   = 'call' | 'form';
export type LeadStatus = 'new' | 'routed' | 'answered' | 'missed' | 'converted' | 'spam';

// All valid service slugs — must stay in sync with src/lib/services.ts
export type ServiceSlug =
  | '24-hour-emergency-plumber'
  | 'plumbing-installation'
  | 'plumbing-repairs'
  | 'kitchen-plumbing-repairs'
  | 'drain-blockages'
  | 'toilet-plumbing-services'
  | 'leaking-tap-repair'
  | 'emergency-heating-engineers'
  | 'emergency-boiler-repair'
  | 'boiler-repair-service'
  | 'boiler-installation'
  | 'central-heating-service'
  | 'central-heating-repairs'
  | 'power-flush'
  | 'emergency-drain-services'
  | 'drain-repair-services'
  | 'blocked-toilets'
  | 'blocked-drains'
  | 'blocked-sink-services'
  | 'drain-cleaning'
  | 'blocked-shower-services'
  | 'bathroom-fitting-installation'
  | 'bathroom-repairs';

export interface LeadPayload {
  name:         string;
  phone:        string;
  issue:        string;
  service_slug: ServiceSlug | null;
  source:       'web_form' | 'call';
  unassigned?:  boolean;
}

export interface Lead {
  id:         string;
  plumber_id: string;
  outcode:    string;
  lead_type:  LeadType;
  payload:    LeadPayload | null;
  status:     LeadStatus;
  created_at: string;
  updated_at: string;
}

// ── API Response shapes ───────────────────────────────────────────────────────

export interface LeadRoutingResponse {
  success:        boolean;
  outcode:        string;
  plumber_id:     string;
  routing_number: string;
  company_name:   string;
  lead_id:        string;
}

export interface ApiError {
  success: false;
  error:   string;
}

// ── Page Props helpers ────────────────────────────────────────────────────────

export interface CountyPageProps {
  county: County;
  towns:  Town[];
}

export interface TownPageProps {
  county: County;
  town:   Town;
}

export interface OutcodePageProps {
  outcode: Outcode;
  town:    Town;
  county:  County;
}
