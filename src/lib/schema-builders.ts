import type { Town, County } from '../types/index';

// ── Types ─────────────────────────────────────────────────────────────────

export interface AreaContext {
  description: string;
  plumbingNote: string;
  responseNote: string;
}

interface TownSchemaProps {
  town:         Town;
  county:       County;
  canonicalUrl: string;
  areaContext:  AreaContext | undefined;
  isAssigned:   boolean;
  partnerPhone: string | null;
}

// ── All 23 Services ───────────────────────────────────────────────────────
// Kept in sync with src/lib/services.ts — update both if services change.

const ALL_SERVICES = [
  // Plumbing
  { slug: '24-hour-emergency-plumber',     name: '24 Hour Emergency Plumber',      category: 'Plumbing'  },
  { slug: 'plumbing-installation',         name: 'Plumbing Installation',          category: 'Plumbing'  },
  { slug: 'plumbing-repairs',              name: 'Plumbing Repairs',               category: 'Plumbing'  },
  { slug: 'kitchen-plumbing-repairs',      name: 'Kitchen Plumbing Repairs',       category: 'Plumbing'  },
  { slug: 'drain-blockages',               name: 'Drain Blockages',                category: 'Plumbing'  },
  { slug: 'toilet-plumbing-services',      name: 'Toilet Plumbing Services',       category: 'Plumbing'  },
  { slug: 'leaking-tap-repair',            name: 'Leaking Tap Repair',             category: 'Plumbing'  },
  // Heating
  { slug: 'emergency-heating-engineers',   name: 'Emergency Heating Engineers',    category: 'Heating'   },
  { slug: 'emergency-boiler-repair',       name: 'Emergency Boiler Repair',        category: 'Heating'   },
  { slug: 'boiler-repair-service',         name: 'Boiler Repair and Service',      category: 'Heating'   },
  { slug: 'boiler-installation',           name: 'Boiler Installation',            category: 'Heating'   },
  { slug: 'central-heating-service',       name: 'Central Heating Service',        category: 'Heating'   },
  { slug: 'central-heating-repairs',       name: 'Central Heating Repairs',        category: 'Heating'   },
  { slug: 'power-flush',                   name: 'Power Flush',                    category: 'Heating'   },
  // Drains
  { slug: 'emergency-drain-services',      name: 'Emergency Drain Services',       category: 'Drains'    },
  { slug: 'drain-repair-services',         name: 'Drain Repair Services',          category: 'Drains'    },
  { slug: 'blocked-toilets',               name: 'Blocked Toilets',                category: 'Drains'    },
  { slug: 'blocked-drains',               name: 'Blocked Drains',                 category: 'Drains'    },
  { slug: 'blocked-sink-services',         name: 'Blocked Sink Services',          category: 'Drains'    },
  { slug: 'drain-cleaning',               name: 'Drain Cleaning',                 category: 'Drains'    },
  { slug: 'blocked-shower-services',       name: 'Blocked Shower Services',        category: 'Drains'    },
  // Bathrooms
  { slug: 'bathroom-fitting-installation', name: 'Bathroom Fitting & Installation',category: 'Bathrooms' },
  { slug: 'bathroom-repairs',              name: 'Bathroom Repairs',               category: 'Bathrooms' },
];

// ── FAQ Items — fan-out query structure ───────────────────────────────────

export function buildFaqItems(town: Town, county: County, context?: AreaContext) {
  const townName   = town.name;
  const countyName = county.name;

  return [
    {
      q: `How quickly can I get a plumber in ${townName}?`,
      a: context?.responseNote
        ?? `Our ${townName} partner targets a 60-minute response for emergencies including burst pipes, leaks, and drain blockages. Response time depends on your exact location in ${townName} and current demand.`,
    },
    {
      q: `Are your plumbers in ${townName} Gas Safe registered?`,
      a: `Yes. Every partner covering ${townName} is Gas Safe registered and independently vetted before listing. You can verify any engineer's registration number at the official Gas Safe Register website.`,
    },
    {
      q: `What plumbing services are available in ${townName}?`,
      a: `The ${townName} partner covers 23 services across plumbing, heating, drains, and bathrooms — from 24-hour emergency response and boiler repair to drain jetting and full bathroom installations.`,
    },
    {
      q: `Is there a call-out fee for plumbers in ${townName}?`,
      a: `Call-out charges depend on the job type and time of day. Your local ${townName} engineer will confirm any charge before attending — no surprises on the invoice. Out-of-hours rates apply for evenings and weekends.`,
    },
    {
      q: `Can I get a same-day plumber in ${townName}?`,
      a: `For genuine emergencies — burst pipes, leaks, no heating — same-day attendance is the target. For planned work like bathroom installations or boiler upgrades, your ${townName} partner will schedule at a time that suits.`,
    },
    {
      q: `Is there one plumber exclusively covering ${townName}?`,
      a: `Yes. We use a Rule of One — exactly one vetted firm holds the territory for each postcode outcode. Calls and forms from ${townName} go directly to that partner, with no shared leads and no competing callbacks.`,
    },
    {
      q: `Do your ${townName} plumbers work weekends and bank holidays?`,
      a: `Yes. The ${townName} partner operates 24 hours a day, 7 days a week including bank holidays. Out-of-hours rates apply for evenings and weekends.`,
    },
    {
      q: `What are the most common plumbing problems in ${townName}?`,
      a: context?.plumbingNote
        ?? `Hard water is a significant issue across ${countyName} — limescale builds in boilers and heat exchangers faster than most homeowners expect, reducing efficiency before any visible symptoms appear. Older housing stock in ${townName} also generates regular callouts for blocked drains and ageing pipework.`,
    },
    {
      q: `What should I do while waiting for a plumber in ${townName}?`,
      a: `If water is leaking, turn off your stop tap immediately — it is usually under the kitchen sink or where the mains enters the property. For a gas smell, leave the building without using any switches, and call the National Gas Emergency line on 0800 111 999 before calling a plumber.`,
    },
    {
      q: `How do I know if my boiler needs replacing in ${townName}?`,
      a: `If your boiler is over 10 years old and repair costs are approaching a third of replacement cost, a new boiler is usually the better investment. Your ${townName} engineer will give you both options with honest advice on which makes financial sense for your situation.`,
    },
  ];
}

// ── FAQPage Schema ────────────────────────────────────────────────────────

export function buildFaqSchema(town: Town, county: County, context?: AreaContext) {
  const items = buildFaqItems(town, county, context);
  return {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name':  item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
    })),
  };
}

// ── LocalBusiness (Plumber) Schema ────────────────────────────────────────

export function buildLocalBusinessSchema(props: TownSchemaProps) {
  const { town, county, canonicalUrl, areaContext, isAssigned, partnerPhone } = props;

  const description = areaContext
    ? `${areaContext.description} ${areaContext.plumbingNote}`
    : `Vetted local plumber covering ${town.name}, ${county.name}. Gas Safe registered, 24/7 availability, direct connection with no call centres.`;

  const schema: Record<string, unknown> = {
    '@context':           'https://schema.org',
    '@type':              'Plumber',
    'name':               `Local Plumber ${town.name}`,
    'description':        description,
    'url':                canonicalUrl,
    'telephone':          isAssigned && partnerPhone ? partnerPhone : '+448000000000',
    'priceRange':         '££',
    'paymentAccepted':    'Cash, Credit Card, Bank Transfer',
    'currenciesAccepted': 'GBP',
    'areaServed': {
      '@type': 'City',
      'name':  town.name,
      'containedIn': {
        '@type': 'AdministrativeArea',
        'name':  county.name,
        'containedIn': { '@type': 'Country', 'name': 'United Kingdom' },
      },
    },
    'openingHoursSpecification': {
      '@type':     'OpeningHoursSpecification',
      'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      'opens':     '00:00',
      'closes':    '23:59',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name':  `Plumbing Services in ${town.name}`,
      'itemListElement': ALL_SERVICES.map((service, index) => ({
        '@type': 'Offer',
        'position': index + 1,
        'itemOffered': {
          '@type':    'Service',
          'name':     service.name,
          'url':      `https://www.localplumber.co.uk/services/${service.slug}`,
          'category': service.category,
        },
      })),
    },
  };

  if (town.latitude && town.longitude) {
    schema['geo'] = {
      '@type':     'GeoCoordinates',
      'latitude':  town.latitude,
      'longitude': town.longitude,
    };
  }

  return schema;
}

// ── BreadcrumbList Schema ─────────────────────────────────────────────────

export function buildBreadcrumbSchema(town: Town, county: County, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home',      'item': 'https://www.localplumber.co.uk' },
      { '@type': 'ListItem', 'position': 2, 'name': county.name, 'item': `https://www.localplumber.co.uk/${county.slug}` },
      { '@type': 'ListItem', 'position': 3, 'name': town.name,   'item': canonicalUrl },
    ],
  };
}

// ── SpeakableSpecification Schema ─────────────────────────────────────────

export function buildSpeakableSchema(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebPage',
    'url':      canonicalUrl,
    'speakable': {
      '@type':       'SpeakableSpecification',
      'cssSelector': [
        'h1',
        '.area-description',
        '.plumbing-note',
        '.response-note',
        '.faq-answer',
        '.at-a-glance-table',
      ],
    },
  };
}

// ── Place Schema ──────────────────────────────────────────────────────────

export function buildPlaceSchema(town: Town, county: County, context?: AreaContext) {
  const schema: Record<string, unknown> = {
    '@context':    'https://schema.org',
    '@type':       'Place',
    'name':        town.name,
    'description': context?.description ?? `${town.name} is a town in ${county.name}, England.`,
    'containedInPlace': {
      '@type': 'AdministrativeArea',
      'name':  county.name,
      'containedIn': { '@type': 'Country', 'name': 'United Kingdom' },
    },
  };

  if (town.latitude && town.longitude) {
    schema['geo'] = {
      '@type':     'GeoCoordinates',
      'latitude':  town.latitude,
      'longitude': town.longitude,
    };
  }

  return schema;
}

// ── Service Page Schemas ──────────────────────────────────────────────────
// Used in src/pages/services/[service].astro

export function buildServicePageSchemas(service: {
  slug:        string;
  name:        string;
  category:    string;
  description: string;
  tagline:     string;
  faqs:        { q: string; a: string }[];
}) {
  const canonicalUrl = `https://www.localplumber.co.uk/services/${service.slug}`;

  const serviceSchema = {
    '@context':    'https://schema.org',
    '@type':       'Service',
    'name':        service.name,
    'description': service.description,
    'url':         canonicalUrl,
    'category':    service.category,
    'provider': {
      '@type': 'LocalBusiness',
      'name':  'LocalPlumber.co.uk',
      'url':   'https://www.localplumber.co.uk',
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name':  'London and the Home Counties',
      'containedIn': { '@type': 'Country', 'name': 'United Kingdom' },
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name':  `${service.name} Services`,
      'itemListElement': [{
        '@type': 'Offer',
        'itemOffered': {
          '@type':       'Service',
          'name':        service.name,
          'description': service.tagline,
        },
      }],
    },
  };

  const faqSchema = {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    'mainEntity': service.faqs.map((item) => ({
      '@type': 'Question',
      'name':  item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home',        'item': 'https://www.localplumber.co.uk' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Services',    'item': 'https://www.localplumber.co.uk/services' },
      { '@type': 'ListItem', 'position': 3, 'name': service.name,  'item': canonicalUrl },
    ],
  };

  return [serviceSchema, faqSchema, breadcrumbSchema];
}

// ── Master Town Schema Builder ────────────────────────────────────────────
// Returns all 5 schemas. Pass result to BaseLayout's jsonLdSchemas prop.

export function buildAllTownSchemas(props: TownSchemaProps) {
  const { town, county, canonicalUrl, areaContext } = props;
  return [
    buildLocalBusinessSchema(props),
    buildFaqSchema(town, county, areaContext),
    buildBreadcrumbSchema(town, county, canonicalUrl),
    buildSpeakableSchema(canonicalUrl),
    buildPlaceSchema(town, county, areaContext),
  ];
}

// Legacy alias — remove once all callers are updated.
export { buildAllTownSchemas as buildAllSchemas };
