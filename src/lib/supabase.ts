// src/lib/supabase.ts
// Typed Supabase client — single instance shared across all server-side code.
// Import this everywhere you need DB access. Never instantiate a second client.

import { createClient } from '@supabase/supabase-js';
import type {
  County,
  Town,
  Outcode,
  Plumber,
  ExclusiveTerritory,
} from '../types/index';

// Standalone DB-layer types for the leads table.
// Supabase's generic type inference breaks when JSONB payload contains complex union
// types (ServiceSlug is 23 string literals inside LeadPayload). These types use plain
// primitives so the schema resolves cleanly. LeadPayload still enforces the shape at
// the application layer in types/index.ts.
interface DbLead {
  id:         string;
  plumber_id: string;
  outcode:    string;
  lead_type:  'call' | 'form';
  payload:    Record<string, unknown> | null;
  status:     'new' | 'routed' | 'answered' | 'missed' | 'converted' | 'spam';
  created_at: string;
  updated_at: string;
}
interface DbLeadInsert {
  id?:         string;    // optional — DB auto-generates
  plumber_id:  string;
  outcode:     string;
  lead_type:   'call' | 'form';
  payload:     Record<string, unknown> | null;
  status:      'new' | 'routed' | 'answered' | 'missed' | 'converted' | 'spam';
  created_at?: string;   // optional — DB auto-generates
  updated_at?: string;   // optional — DB auto-generates
}

export interface Database {
  public: {
    Tables: {
      counties: {
        Row:           County;
        Insert:        Omit<County, 'id' | 'created_at'>;
        Update:        Partial<Omit<County, 'id' | 'created_at'>>;
        Relationships: [];
      };
      towns: {
        Row:           Town;
        Insert:        Omit<Town, 'id' | 'created_at'>;
        Update:        Partial<Omit<Town, 'id' | 'created_at'>>;
        Relationships: [];
      };
      outcodes: {
        Row:           Outcode;
        Insert:        Omit<Outcode, 'created_at'>;
        Update:        Partial<Omit<Outcode, 'created_at'>>;
        Relationships: [];
      };
      plumbers: {
        Row:           Plumber;
        Insert:        Omit<Plumber, 'id' | 'created_at' | 'updated_at'>;
        Update:        Partial<Omit<Plumber, 'id' | 'created_at' | 'updated_at'>>;
        Relationships: [];
      };
      exclusive_territories: {
        Row:           ExclusiveTerritory;
        Insert:        Omit<ExclusiveTerritory, 'id' | 'assigned_at'>;
        Update:        Partial<Omit<ExclusiveTerritory, 'id'>>;
        Relationships: [];
      };
      leads: {
        Row:           DbLead;
        Insert:        DbLeadInsert;
        Update:        Partial<DbLeadInsert>;
        Relationships: [];
      };
    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums:     Record<string, never>;
  };
}

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '[supabase.ts] SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env. ' +
    'Copy .env.example and fill in your project credentials.'
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession:   false,
        autoRefreshToken: false,
      },
    })
  : null;

// ── Lead insert helper ────────────────────────────────────────────────────────
// Supabase v2's RejectExcessProperties<Insert, Row> generic resolves to `never`
// when Row has more keys than Insert (id, created_at, updated_at). The insert
// call sites would all produce ts(2353). This helper centralises the one cast.

export interface LeadInsertData {
  plumber_id: string;
  outcode:    string;
  lead_type:  'call' | 'form';
  payload:    Record<string, unknown> | null;
  status:     'new' | 'routed' | 'answered' | 'missed' | 'converted' | 'spam';
}

type AdminClient = NonNullable<typeof supabaseAdmin>;

export async function insertLead(
  client: AdminClient,
  data:   LeadInsertData,
): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: row, error } = await (client as any)
    .from('leads')
    .insert(data)
    .select('id')
    .single();
  if (error || !row) return null;
  return (row as { id: string }).id;
}

export async function insertLeadUntracked(
  client: AdminClient,
  data:   LeadInsertData,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (client as any).from('leads').insert(data);
}
