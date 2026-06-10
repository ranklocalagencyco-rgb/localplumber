-- ============================================================
-- LocalPlumber.co.uk — Initial Schema Migration
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. COUNTIES
-- ============================================================
create table if not exists counties (
  id   serial primary key,
  name text not null,
  slug text not null unique
);

comment on table counties is 'Phase 1 counties: London and the Home Counties.';

-- ============================================================
-- 2. TOWNS
-- ============================================================
create table if not exists towns (
  id        serial primary key,
  county_id integer not null references counties (id) on delete cascade,
  name      text    not null,
  slug      text    not null,
  lat       numeric(9, 6),
  lng       numeric(9, 6),
  unique (county_id, slug)
);

create index idx_towns_county_id on towns (county_id);

comment on table towns is 'Towns within each county. Slug is unique per county.';

-- ============================================================
-- 3. OUTCODES
-- ============================================================
create table if not exists outcodes (
  outcode   text    primary key,          -- e.g. GU1, SW3
  town_id   integer not null references towns   (id) on delete cascade,
  county_id integer not null references counties (id) on delete cascade
);

create index idx_outcodes_town_id   on outcodes (town_id);
create index idx_outcodes_county_id on outcodes (county_id);

comment on table outcodes is 'UK postcode outcodes mapped to a town and county.';

-- ============================================================
-- 4. PLUMBERS
-- ============================================================
create type plumber_status as enum ('active', 'inactive', 'suspended');

create table if not exists plumbers (
  id                   uuid         primary key default gen_random_uuid(),
  company_name         text         not null,
  phone_routing_number text         not null,
  status               plumber_status not null default 'inactive',
  created_at           timestamptz  not null default now()
);

comment on table plumbers is 'Trade partner firms. Phone routing number is a Twilio tracking number.';

-- ============================================================
-- 5. EXCLUSIVE TERRITORIES
--    Core business rule: exactly ONE plumber per outcode.
-- ============================================================
create table if not exists exclusive_territories (
  id         uuid primary key default gen_random_uuid(),
  outcode    text not null unique references outcodes (outcode) on delete cascade,
  plumber_id uuid not null references plumbers (id) on delete cascade,
  assigned_at timestamptz not null default now()
);

create index idx_excl_territories_plumber_id on exclusive_territories (plumber_id);

comment on table exclusive_territories is
  'Enforces the Rule of One: a single active plumber owns each outcode. '
  'The UNIQUE constraint on outcode is the hard database-level guarantee.';

-- ============================================================
-- 6. LEADS
-- ============================================================
create type lead_type   as enum ('call', 'form');
create type lead_status as enum ('new', 'contacted', 'converted', 'closed');

create table if not exists leads (
  id         uuid        primary key default gen_random_uuid(),
  plumber_id uuid        not null references plumbers (id) on delete cascade,
  type       lead_type   not null,
  content    jsonb       not null default '{}',
  status     lead_status not null default 'new',
  created_at timestamptz not null default now()
);

create index idx_leads_plumber_id on leads (plumber_id);
create index idx_leads_status     on leads (status);
create index idx_leads_created_at on leads (created_at desc);

comment on table leads is 'Inbound leads (calls forwarded via Twilio or form submissions).';

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Geography tables: publicly readable (needed for SSG builds)
alter table counties             enable row level security;
alter table towns                enable row level security;
alter table outcodes             enable row level security;
alter table plumbers             enable row level security;
alter table exclusive_territories enable row level security;
alter table leads                enable row level security;

create policy "Public read counties"              on counties              for select using (true);
create policy "Public read towns"                 on towns                 for select using (true);
create policy "Public read outcodes"              on outcodes              for select using (true);
create policy "Public read active plumbers"       on plumbers              for select using (status = 'active');
create policy "Public read exclusive_territories" on exclusive_territories for select using (true);

-- Leads: only service role can insert/read (API endpoints use service role key)
create policy "Service role insert leads" on leads for insert with check (true);
create policy "Service role read leads"   on leads for select using (true);

-- ============================================================
-- SEED: Phase 1 Counties
-- ============================================================
insert into counties (name, slug) values
  ('London',           'london'),
  ('Surrey',           'surrey'),
  ('Essex',            'essex'),
  ('Kent',             'kent'),
  ('Hertfordshire',    'hertfordshire'),
  ('Berkshire',        'berkshire'),
  ('Buckinghamshire',  'buckinghamshire')
on conflict (slug) do nothing;
