// scripts/import-geodata.mjs
// One-time geographic data import for LocalPlumber.co.uk
// Run: node scripts/import-geodata.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync }  from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Read .env from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath   = resolve(__dirname, '../.env');
const envVars   = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const SUPABASE_URL              = envVars.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ─── Phase 1 outcode lists per county slug ────────────────────────────────────

const COUNTY_OUTCODES = {
  london: [
    'E1','E2','E3','E4','E5','E6','E7','E8','E9','E10','E11','E12','E13','E14','E15','E16','E17','E18',
    'EC1A','EC1M','EC1N','EC1R','EC1V','EC1Y','EC2A','EC2M','EC2N','EC2R','EC2V','EC2Y',
    'EC3A','EC3M','EC3N','EC3R','EC3V','EC4A','EC4M','EC4N','EC4R','EC4V','EC4Y',
    'N1','N2','N3','N4','N5','N6','N7','N8','N9','N10','N11','N12','N13','N14','N15','N16','N17','N18','N19','N20','N21','N22',
    'NW1','NW2','NW3','NW4','NW5','NW6','NW7','NW8','NW9','NW10','NW11',
    'SE1','SE2','SE3','SE4','SE5','SE6','SE7','SE8','SE9','SE10','SE11','SE12','SE13','SE14','SE15','SE16','SE17','SE18','SE19','SE20','SE21','SE22','SE23','SE24','SE25','SE26','SE27','SE28',
    'SW1A','SW1E','SW1H','SW1P','SW1V','SW1W','SW1X','SW1Y','SW2','SW3','SW4','SW5','SW6','SW7','SW8','SW9','SW10','SW11','SW12','SW13','SW14','SW15','SW16','SW17','SW18','SW19','SW20',
    'W1A','W1B','W1C','W1D','W1F','W1G','W1H','W1J','W1K','W1S','W1T','W1U','W1W',
    'W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14',
    'WC1A','WC1B','WC1E','WC1H','WC1N','WC1R','WC1V','WC1X','WC2A','WC2B','WC2E','WC2H','WC2N','WC2R',
  ],
  surrey: [
    'GU1','GU2','GU3','GU4','GU5','GU6','GU7','GU8','GU9','GU10','GU11','GU12',
    'GU14','GU15','GU16','GU17','GU18','GU19','GU20','GU21','GU22','GU23','GU24','GU25','GU26','GU27',
    'KT1','KT2','KT3','KT4','KT5','KT6','KT7','KT8','KT9','KT10','KT11','KT12','KT13','KT14','KT15','KT16','KT17','KT18','KT19','KT20','KT21','KT22','KT23','KT24',
    'RH1','RH2','RH3','RH4','RH5','RH6','RH7','RH8','RH9',
    'SM1','SM2','SM3','SM4','SM5','SM6','SM7',
    'TW1','TW2','TW3','TW4','TW5','TW6','TW7','TW8','TW9','TW10','TW11','TW12','TW13','TW14','TW15','TW16','TW17','TW18','TW19','TW20',
    'CR3','CR5','CR6',
  ],
  essex: [
    'CM0','CM1','CM2','CM3','CM4','CM5','CM6','CM7','CM8','CM9','CM11','CM12','CM13','CM14','CM15','CM16','CM17','CM18','CM19','CM20','CM21','CM22','CM23','CM24',
    'CO1','CO2','CO3','CO4','CO5','CO6','CO7','CO8','CO9','CO10','CO11','CO12','CO13','CO14','CO15','CO16',
    'EN9',
    'IG1','IG2','IG3','IG4','IG5','IG6','IG7','IG8','IG9','IG10','IG11',
    'RM1','RM2','RM3','RM4','RM5','RM6','RM7','RM8','RM9','RM10','RM11','RM12','RM13','RM14','RM15','RM16','RM17','RM18','RM19','RM20',
    'SS0','SS1','SS2','SS3','SS4','SS5','SS6','SS7','SS8','SS9','SS11','SS12','SS13','SS14','SS15','SS16','SS17',
  ],
  kent: [
    'BR1','BR2','BR3','BR4','BR5','BR6','BR7','BR8',
    'CT1','CT2','CT3','CT4','CT5','CT6','CT7','CT8','CT9','CT10','CT11','CT12','CT13','CT14','CT15','CT16','CT17','CT18','CT19','CT20','CT21',
    'DA1','DA2','DA3','DA4','DA5','DA6','DA7','DA8','DA9','DA10','DA11','DA12','DA13','DA14','DA15','DA16','DA17','DA18',
    'ME1','ME2','ME3','ME4','ME5','ME6','ME7','ME8','ME9','ME10','ME11','ME12','ME13','ME14','ME15','ME16','ME17','ME18','ME19','ME20',
    'TN1','TN2','TN3','TN4','TN8','TN9','TN10','TN11','TN12','TN13','TN14','TN15','TN16','TN27','TN28','TN29','TN30',
  ],
  hertfordshire: [
    'AL1','AL2','AL3','AL4','AL5','AL6','AL7','AL8','AL9','AL10',
    'EN1','EN2','EN3','EN4','EN5','EN6','EN7','EN8','EN10','EN11',
    'HP1','HP2','HP3','HP4','HP5','HP23',
    'SG1','SG2','SG3','SG4','SG5','SG6','SG7','SG8','SG9','SG10','SG11','SG12','SG13','SG14',
    'WD3','WD4','WD5','WD6','WD7','WD17','WD18','WD19','WD23','WD24','WD25',
  ],
  berkshire: [
    'RG1','RG2','RG4','RG5','RG6','RG7','RG8','RG9','RG10','RG12','RG14','RG17','RG18','RG19','RG20',
    'RG21','RG22','RG23','RG24','RG25','RG26','RG27','RG28','RG29','RG30','RG31','RG40','RG41','RG42','RG45',
    'SL1','SL2','SL3','SL4','SL5','SL6',
  ],
  buckinghamshire: [
    'HP6','HP7','HP8','HP9','HP10','HP11','HP12','HP13','HP14','HP15','HP16','HP17','HP18','HP19','HP20','HP21','HP22','HP27',
    'MK1','MK2','MK3','MK4','MK5','MK6','MK7','MK8','MK9','MK10','MK11','MK12','MK13','MK14','MK15','MK16','MK17','MK18','MK19',
    'SL0','SL7','SL8','SL9',
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchOutcodeData(outcode) {
  try {
    const res = await fetch(`https://api.postcodes.io/outcodes/${outcode}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.result ?? null;
  } catch {
    return null;
  }
}

// ─── Main import ──────────────────────────────────────────────────────────────

async function main() {
  console.log('🔧 LocalPlumber — Geographic Data Import\n');

  // Load county IDs from DB
  const { data: counties, error: cErr } = await supabase
    .from('counties')
    .select('id, slug');
  if (cErr) { console.error('Failed to load counties:', cErr.message); process.exit(1); }

  const countyMap = Object.fromEntries(counties.map((c) => [c.slug, c.id]));
  console.log(`✓ Loaded ${counties.length} counties:`, Object.keys(countyMap).join(', '), '\n');

  let totalOutcodes = 0;
  let skipped       = 0;
  let errors        = 0;

  for (const [countySlug, outcodeList] of Object.entries(COUNTY_OUTCODES)) {
    const countyId = countyMap[countySlug];
    if (!countyId) {
      console.warn(`⚠  County not found in DB: ${countySlug} — skipping`);
      continue;
    }

    console.log(`\n📍 ${countySlug.toUpperCase()} — ${outcodeList.length} outcodes`);

    // town cache for this county: slug → id
    const townCache = {};

    for (const outcode of outcodeList) {
      await sleep(80); // ~12 req/s — well within postcodes.io limits

      const data = await fetchOutcodeData(outcode);
      if (!data) {
        console.log(`  ✗ ${outcode} — not found (terminated/invalid outcode)`);
        skipped++;
        continue;
      }

      // Derive town name: prefer admin_district (may be array), fallback to parish, then outcode
      const districtRaw = Array.isArray(data.admin_district)
        ? data.admin_district[0]
        : data.admin_district;
      const rawTown = districtRaw || (Array.isArray(data.parish) ? data.parish[0] : data.parish) || outcode;
      const townSlug = toSlug(rawTown);

      // Upsert town
      if (!townCache[townSlug]) {
        const { data: townRow, error: tErr } = await supabase
          .from('towns')
          .upsert(
            { county_id: countyId, name: rawTown, slug: townSlug, lat: data.latitude, lng: data.longitude },
            { onConflict: 'county_id,slug', ignoreDuplicates: false }
          )
          .select('id')
          .single();

        if (tErr) {
          console.error(`  ✗ Town upsert failed for "${rawTown}":`, tErr.message);
          errors++;
          continue;
        }
        townCache[townSlug] = townRow.id;
      }

      const townId = townCache[townSlug];

      // Insert outcode
      const { error: oErr } = await supabase
        .from('outcodes')
        .upsert(
          { outcode, town_id: townId, county_id: countyId },
          { onConflict: 'outcode', ignoreDuplicates: true }
        );

      if (oErr) {
        console.error(`  ✗ Outcode insert failed for ${outcode}:`, oErr.message);
        errors++;
      } else {
        console.log(`  ✓ ${outcode.padEnd(6)} → ${rawTown}`);
        totalOutcodes++;
      }
    }
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`✅ Import complete`);
  console.log(`   Outcodes inserted : ${totalOutcodes}`);
  console.log(`   Skipped (invalid) : ${skipped}`);
  console.log(`   Errors            : ${errors}`);
  console.log('─────────────────────────────────────────\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
