export interface Service {
  slug:        string;
  name:        string;
  category:    'Plumbing' | 'Heating' | 'Drains' | 'Bathrooms';
  icon:        string;
  tagline:     string;
  description: string;
  features:    string[];
  faqs:        { q: string; a: string }[];
}

export const services: Service[] = [

  // ── Plumbing ─────────────────────────────────────────────────────────────
  {
    slug:     '24-hour-emergency-plumber',
    name:     '24 Hour Emergency Plumber',
    category: 'Plumbing',
    icon:     'bolt',
    tagline:  '24/7 emergency response — typically within 60 minutes',
    description:
      'Plumbing emergencies don\'t wait for business hours. Our exclusive local partners are on-call around the clock, every day of the year including bank holidays. One call connects you directly to the vetted Gas Safe engineer assigned to your postcode — no call centres, no queues.',
    features: [
      '24/7 availability including weekends and bank holidays',
      'Typical arrival within 60 minutes across covered areas',
      'Fully stocked vans for same-visit repairs',
      'Gas Safe registered and DBS-checked engineers',
      'Upfront fixed pricing — no call-out surprise fees',
      'Direct connection — zero call centres or middlemen',
    ],
    faqs: [
      { q: 'How quickly can a plumber reach me?', a: 'Our partners target under 60 minutes for emergencies across London and the Home Counties.' },
      { q: 'Is there a call-out charge?', a: 'Each partner sets their own pricing. All fees are quoted upfront before any work begins.' },
      { q: 'Are you available on Christmas Day?', a: 'Yes — our network operates 365 days a year, including all bank holidays.' },
      { q: 'What counts as a plumbing emergency?', a: 'Burst pipes, uncontrolled leaks, sewage backups, total loss of water, and flooding all qualify for emergency response.' },
    ],
  },
  {
    slug:     'plumbing-installation',
    name:     'Plumbing Installation',
    category: 'Plumbing',
    icon:     'wrench-screwdriver',
    tagline:  'New pipework, fixtures and full system installations',
    description:
      'Whether you need a single fixture fitted or a full new plumbing system installed, our partners handle every stage — from first-fix pipework to final connections and pressure testing. All installations meet current Building Regulations and Water Regulations standards.',
    features: [
      'First and second-fix plumbing for new builds and extensions',
      'Bathroom and kitchen fixture installation',
      'Outside tap supply and installation',
      'Washing machine and dishwasher plumbing',
      'Water softener and filter installation',
      'Pressure testing and commissioning on completion',
    ],
    faqs: [
      { q: 'Do I need Building Regulations approval for new plumbing?', a: 'Most like-for-like replacements don\'t require approval. New installations or significant alterations — especially involving drainage — may require a Building Notice.' },
      { q: 'Can you install an outside tap?', a: 'Yes — outside tap installation is a common job. Your engineer will fit an isolation valve inside and the tap externally, with insulation to prevent winter freezing.' },
      { q: 'How long does a full bathroom plumbing installation take?', a: 'Rough-in plumbing for a standard bathroom typically takes one day. Second-fix connections follow once tiling is complete.' },
    ],
  },
  {
    slug:     'plumbing-repairs',
    name:     'Plumbing Repairs',
    category: 'Plumbing',
    icon:     'wrench',
    tagline:  'Fast, lasting repairs to all pipework and plumbing fixtures',
    description:
      'From a dripping tap to a failed soil pipe, our local partners diagnose and repair the full range of domestic plumbing faults. All repairs use quality parts and are carried out to current standards — with a written guarantee.',
    features: [
      'Dripping and leaking tap repair or replacement',
      'Toilet cistern, fill valve, and flush mechanism repair',
      'Isolation valve and stop tap replacement',
      'Flexible hose and under-sink connection repair',
      'Shower tray and enclosure leak repair',
      'Soil stack and waste pipe repair',
    ],
    faqs: [
      { q: 'Is it cheaper to repair or replace a leaking tap?', a: 'In most cases a tap repair (new cartridge or washer) is cost-effective. For older taps where parts are unavailable, replacement is often better value.' },
      { q: 'My toilet keeps running — what\'s the cause?', a: 'A continuously running toilet is almost always a faulty fill valve or flap valve inside the cistern. Both are straightforward and inexpensive to replace.' },
      { q: 'Do you guarantee repair work?', a: 'Yes — all repair work carried out by our partners carries a minimum 12-month parts and labour guarantee.' },
    ],
  },
  {
    slug:     'kitchen-plumbing-repairs',
    name:     'Kitchen Plumbing Repairs',
    category: 'Plumbing',
    icon:     'home-modern',
    tagline:  'Leak detection and repair for all kitchen plumbing',
    description:
      'Kitchen plumbing faults — from a leaking sink to a failed dishwasher connection — can damage cabinets and flooring fast. Our partners carry standard waste fittings, flexible hoses, and isolation valves to fix most kitchen plumbing issues on the same visit.',
    features: [
      'Kitchen sink leak repair and trap replacement',
      'Mixer tap replacement and cartridge repair',
      'Dishwasher and washing machine plumbing',
      'Under-sink flexible hose replacement',
      'Waste disposal unit installation and repair',
      'Isolation valve replacement',
    ],
    faqs: [
      { q: 'My kitchen sink is blocked — is that a plumbing job?', a: 'Yes — if plunging and chemical cleaners haven\'t cleared it, a plumber can rod the waste run or jet the drain to clear the blockage properly.' },
      { q: 'Can you fix a leaking dishwasher connection?', a: 'Yes — most dishwasher leaks are from the inlet hose, drain hose, or door seal. All are repairable on the same visit.' },
      { q: 'How do I turn off water to just my kitchen?', a: 'There should be isolation valves on the hot and cold supplies under your kitchen sink. Turn the slot 90° to close. If none exist, your engineer can fit them.' },
    ],
  },
  {
    slug:     'drain-blockages',
    name:     'Drain Blockages',
    category: 'Plumbing',
    icon:     'funnel',
    tagline:  'Rapid clearance of blocked internal and external drains',
    description:
      'A blocked drain can quickly become a health hazard. Our partners respond to drain blockages across London and the Home Counties, clearing internal waste pipes and external drainage systems using rods, high-pressure jetting, and CCTV diagnosis.',
    features: [
      'Same-day emergency drain clearance',
      'Manual rodding for simple blockages',
      'High-pressure water jetting for stubborn blockages',
      'Kitchen, bathroom, and utility drain clearance',
      'External gulley and inspection chamber clearance',
      'CCTV survey available for recurring blockages',
    ],
    faqs: [
      { q: 'What causes most drain blockages?', a: 'Kitchen fat and grease, wet wipes, hair, soap scum, and root ingress are the most common causes.' },
      { q: 'My drain is slow but not completely blocked — should I call a plumber?', a: 'Yes — a slow drain indicates a partial blockage that will worsen. Clearing it early is cheaper than waiting for a full backup.' },
      { q: 'Can you unblock a drain at night or on weekends?', a: 'Yes — our partners operate 24/7 for drain emergencies.' },
    ],
  },
  {
    slug:     'toilet-plumbing-services',
    name:     'Toilet Plumbing Services',
    category: 'Plumbing',
    icon:     'circle',
    tagline:  'Toilet installation, repair and blocked toilet clearance',
    description:
      'From a running cistern to a completely blocked toilet, our partners handle all toilet plumbing work. We supply and fit close-coupled, back-to-wall, and wall-hung WCs, and carry common cistern components for same-visit repairs.',
    features: [
      'Toilet installation — close-coupled, back-to-wall, wall-hung',
      'Cistern fill valve and flap valve replacement',
      'Flush handle and push-button mechanism repair',
      'Blocked toilet clearance using plunger and auger',
      'Toilet pan seal replacement to stop base leaks',
      'Concealed frame and cistern installation',
    ],
    faqs: [
      { q: 'My toilet is leaking at the base — what\'s the cause?', a: 'A leak at the base of the pan is almost always a failed pan-to-soil-pipe connector or a worn wax seal. Both require the toilet to be temporarily lifted to replace.' },
      { q: 'Can you install a wall-hung toilet?', a: 'Yes — wall-hung installation requires a concealed frame and cistern built into a studwork or block wall. Your engineer will assess the wall suitability before quoting.' },
      { q: 'How do I unblock a toilet if I can\'t get a plumber immediately?', a: 'Use a toilet plunger with a strong in-out pumping action. Never use caustic chemicals in a toilet — they rarely work and can damage seals.' },
    ],
  },
  {
    slug:     'leaking-tap-repair',
    name:     'Leaking Tap Repair',
    category: 'Plumbing',
    icon:     'droplet',
    tagline:  'Stop dripping taps fast — same-day repair or replacement',
    description:
      'A single dripping tap can waste thousands of litres of water per year and add significantly to your bill. Our partners carry tap cartridges, washers, and ceramic discs for all common mixer and pillar tap types — resolving most tap faults on the same visit.',
    features: [
      'Dripping tap diagnosis and repair',
      'Ceramic disc and rubber washer replacement',
      'Mixer tap cartridge replacement',
      'Tap re-seating for worn valve seats',
      'Full tap replacement where repair is uneconomical',
      'Kitchen, bathroom, and bath tap repair',
    ],
    faqs: [
      { q: 'Why is my tap still dripping after I changed the washer?', a: 'If a new washer doesn\'t fix the drip, the valve seat is likely worn or pitted. A plumber can re-seat the valve with a reseating tool or replace the tap head.' },
      { q: 'Can you repair a dripping tap without turning off the water supply?', a: 'No — the water supply to the tap must be isolated before internal components can be safely accessed.' },
      { q: 'Is it worth repairing an old tap?', a: 'If the tap body is in good condition, a cartridge or washer replacement is significantly cheaper than replacement. Your engineer will advise on the best approach.' },
    ],
  },

  // ── Heating ──────────────────────────────────────────────────────────────
  {
    slug:     'emergency-heating-engineers',
    name:     'Emergency Heating Engineers',
    category: 'Heating',
    icon:     'fire',
    tagline:  '24/7 emergency heating cover — no heat or hot water',
    description:
      'Losing heating or hot water in cold weather is a household emergency. Our Gas Safe registered partners are on-call around the clock to diagnose and repair heating failures — from boiler lockouts to broken zone valves — typically within 60 minutes.',
    features: [
      '24/7 emergency response for no heat or hot water',
      'Boiler lockout diagnosis and reset',
      'Zone valve, pump, and motorised valve repair',
      'Thermostat and programmer fault diagnosis',
      'Pressure loss investigation and refill',
      'Gas Safe certification for all gas work',
    ],
    faqs: [
      { q: 'My boiler has locked out — what should I do?', a: 'Press the reset button once. If it locks out again within minutes, do not keep resetting — call an engineer to diagnose the underlying fault.' },
      { q: 'Why do I have hot water but no heating?', a: 'This usually points to a faulty diverter valve, zone valve, or programmer issue rather than the boiler itself.' },
      { q: 'Is loss of heating a gas emergency?', a: 'Loss of heating alone is not a gas emergency. If you smell gas, evacuate and call the National Gas Emergency line: 0800 111 999.' },
    ],
  },
  {
    slug:     'emergency-boiler-repair',
    name:     'Emergency Boiler Repair',
    category: 'Heating',
    icon:     'exclamation-circle',
    tagline:  'Same-day Gas Safe boiler repair — all major brands',
    description:
      'A broken boiler in winter cannot wait. Our Gas Safe registered partners carry common boiler spares and can diagnose fault codes across all major brands — Worcester Bosch, Vaillant, Ideal, Baxi — often restoring your heating and hot water on the same visit.',
    features: [
      'Same-day callout for complete boiler breakdown',
      'All major brands: Worcester, Vaillant, Ideal, Baxi, Viessmann',
      'Fault code diagnosis and PCB testing',
      'Ignition electrode and gas valve replacement',
      'Heat exchanger inspection and descaling',
      'Gas Safe certificate issued on completion',
    ],
    faqs: [
      { q: 'My boiler shows a fault code — is it serious?', a: 'Fault codes vary by brand. Common codes relate to ignition failure, low pressure, or pump faults — all typically repairable on the same visit.' },
      { q: 'Do your engineers carry spare parts?', a: 'Our partners stock common parts for the most popular boiler brands. Less common parts are sourced and fitted within 24–48 hours.' },
      { q: 'Is it worth repairing an old boiler?', a: 'If repair cost exceeds one-third of a new boiler price and the boiler is over 10 years old, replacement is often better value. Your engineer will advise.' },
    ],
  },
  {
    slug:     'boiler-repair-service',
    name:     'Boiler Repair and Service',
    category: 'Heating',
    icon:     'cog',
    tagline:  'Annual boiler service and repair — keep your warranty valid',
    description:
      'An annual boiler service is required to maintain manufacturer warranties and ensure safe, efficient operation. Our Gas Safe partners carry out full strip-down services on all boiler types and combine servicing with any necessary repairs in a single visit.',
    features: [
      'Full annual boiler service to manufacturer specification',
      'Flue integrity and combustion analysis test',
      'Heat exchanger inspection and cleaning',
      'Condensate trap and pump inspection',
      'Gas pressure and rate check',
      'Service record update for warranty compliance',
    ],
    faqs: [
      { q: 'How often should a boiler be serviced?', a: 'Every 12 months. Most manufacturers require annual servicing to keep the warranty valid.' },
      { q: 'What does a boiler service include?', a: 'Visual inspection, combustion analysis, heat exchanger check, flue test, gas pressure verification, and a full safety assessment.' },
      { q: 'Can I combine a service with a repair?', a: 'Yes — if a fault is found during the service, your engineer will quote for the repair and can typically complete it in the same visit.' },
    ],
  },
  {
    slug:     'boiler-installation',
    name:     'Boiler Installation',
    category: 'Heating',
    icon:     'cube-transparent',
    tagline:  'New boiler supply and fit — all major brands, Gas Safe certified',
    description:
      'Whether you need a like-for-like replacement or an upgrade to a modern condensing combi, our Gas Safe partners handle the full installation: removal, flue, pipework modifications, controls, and Building Regulations notification — all in a single day for most properties.',
    features: [
      'Free no-obligation boiler survey and quote',
      'Worcester Bosch, Vaillant, Ideal, Baxi, Viessmann supply',
      'Combi, system, and regular boiler installation',
      'Flue installation and extension where required',
      'Magnetic system filter and inhibitor treatment',
      'Gas Safe certification and Building Regulations notification',
    ],
    faqs: [
      { q: 'How long does a boiler installation take?', a: 'A standard like-for-like combi replacement takes 6–8 hours. More complex system changes may take up to two days.' },
      { q: 'Do I need to notify Building Control?', a: 'Yes — all gas boiler installations must be notified to your local Building Authority. Your Gas Safe engineer handles this automatically.' },
      { q: 'What warranty comes with a new boiler?', a: 'Most manufacturers offer 5–10 year warranties when installed by a registered engineer. We register your warranty on completion.' },
    ],
  },
  {
    slug:     'central-heating-service',
    name:     'Central Heating Service',
    category: 'Heating',
    icon:     'fire',
    tagline:  'Full central heating system service and efficiency check',
    description:
      'A central heating service covers the entire system — not just the boiler. Our engineers balance radiators, check zone valves and pump operation, test controls, and treat the system with inhibitor to prevent corrosion and maintain efficiency.',
    features: [
      'Full radiator balance and bleed',
      'TRV and lockshield valve check',
      'Zone valve and pump operation test',
      'Magnetic filter clean and inhibitor top-up',
      'Thermostat and programmer calibration',
      'System pressure check and refill',
    ],
    faqs: [
      { q: 'Why are some of my radiators cold?', a: 'Cold radiators usually indicate trapped air (bleed the radiator), a closed lockshield valve, or sludge build-up. A system service will identify and resolve the cause.' },
      { q: 'What is a TRV and should I have one on every radiator?', a: 'A Thermostatic Radiator Valve controls individual radiator temperature. Fitting TRVs to all radiators except the one nearest the thermostat is best practice and reduces energy use.' },
      { q: 'How often should the whole heating system be serviced?', a: 'Annually — ideally in late summer before the heating season begins.' },
    ],
  },
  {
    slug:     'central-heating-repairs',
    name:     'Central Heating Repairs',
    category: 'Heating',
    icon:     'wrench',
    tagline:  'Radiator, valve, pump and zone valve repairs',
    description:
      'Central heating faults beyond the boiler — leaking radiators, seized valves, failed pumps, broken zone valves — are all handled by our partners. Most repairs are completed on the same visit using stocked components.',
    features: [
      'Radiator leak repair and replacement',
      'Zone valve and motorised valve replacement',
      'Circulating pump replacement',
      'TRV and lockshield valve replacement',
      'Expansion vessel recharge or replacement',
      'Pressure relief valve replacement',
    ],
    faqs: [
      { q: 'My radiator is leaking from the valve — is this serious?', a: 'A valve leak can be stopped temporarily by closing the valve. Call an engineer to replace the valve gland packing or the valve itself.' },
      { q: 'How do I know if my heating pump has failed?', a: 'A failed pump results in little or no heat despite the boiler firing. You may hear a humming noise from the pump location, or no noise at all when it should be running.' },
      { q: 'What is a zone valve and why does it fail?', a: 'A zone valve controls hot water flow to different circuits (heating or hot water). The internal motor wears over time and typically lasts 10–15 years before requiring replacement.' },
    ],
  },
  {
    slug:     'power-flush',
    name:     'Power Flush',
    category: 'Heating',
    icon:     'arrow-path',
    tagline:  'Remove sludge and restore full heating efficiency',
    description:
      'Over time, central heating systems accumulate iron oxide sludge that causes cold spots, noisy pipes, and boiler breakdowns. A professional power flush forces high-velocity water through your entire system, removing sludge and restoring efficiency.',
    features: [
      'Full system power flush using professional Kamco equipment',
      'Chemical descaling and sludge removal',
      'Inhibitor treatment to prevent future corrosion',
      'Magnetic filter supply and installation',
      'Radiator bleed and pressure rebalancing',
      'Before-and-after system performance check',
    ],
    faqs: [
      { q: 'How do I know if I need a power flush?', a: 'Cold spots at the bottom of radiators, slow-to-heat radiators, discoloured water when bleeding, and noisy pipes are all signs of sludge build-up.' },
      { q: 'How long does a power flush take?', a: 'Typically 6–8 hours for an average 10-radiator system. Larger systems may require a full day.' },
      { q: 'Is a power flush required before a new boiler?', a: 'Most manufacturers require evidence of a clean system to validate the warranty. A power flush or magnetic filter installation is strongly recommended.' },
    ],
  },

  // ── Drains ───────────────────────────────────────────────────────────────
  {
    slug:     'emergency-drain-services',
    name:     'Emergency Drain Services',
    category: 'Drains',
    icon:     'bolt',
    tagline:  '24/7 emergency drain clearance across London & Home Counties',
    description:
      'A blocked or overflowing drain is a health hazard and can cause serious property damage quickly. Our drain specialists respond to emergencies around the clock — arriving with jetting equipment and CCTV cameras to clear and diagnose the problem fast.',
    features: [
      '24/7 emergency response for blocked or overflowing drains',
      'High-pressure water jetting on arrival',
      'CCTV survey to identify cause of blockage',
      'Internal and external drain clearance',
      'Sewage backup and overflow clearance',
      'Same-visit written report for insurance purposes',
    ],
    faqs: [
      { q: 'What is a drain emergency?', a: 'Sewage backing up into the property, external drains overflowing, or complete blockage of all drainage in the building all constitute emergencies.' },
      { q: 'Do you operate on bank holidays?', a: 'Yes — our drain specialists are available 365 days a year including Christmas Day.' },
      { q: 'Who is responsible for the blocked drain — me or the water company?', a: 'Drains within your property boundary are your responsibility. Shared sewers outside the boundary are managed by your water company.' },
    ],
  },
  {
    slug:     'drain-repair-services',
    name:     'Drain Repair Services',
    category: 'Drains',
    icon:     'wrench-screwdriver',
    tagline:  'No-dig drain lining, patch repair and structural fixes',
    description:
      'Cracked, collapsed, or root-damaged drains don\'t always require excavation. Our partners offer CCTV survey, patch lining, and full pipe relining to repair structural drain damage with minimal disruption to driveways, gardens, and floors.',
    features: [
      'CCTV drain survey to locate and assess damage',
      'Patch lining for isolated cracks and joint failures',
      'Full pipe relining for extensively damaged runs',
      'Root cutting and root barrier treatment',
      'Traditional excavation repair where lining is unsuitable',
      'Post-repair CCTV verification survey',
    ],
    faqs: [
      { q: 'Can a drain be repaired without digging up my driveway?', a: 'In many cases yes — pipe lining inserts a new pipe inside the existing one, requiring only small access points rather than full excavation.' },
      { q: 'How do I know if my drain is structurally damaged?', a: 'Recurring blockages, subsidence near drain runs, sinkholes in the garden, and slow-draining outlets can all indicate structural damage. A CCTV survey confirms the cause.' },
      { q: 'How long does a drain lining repair last?', a: 'Properly installed CIPP (cured-in-place pipe) lining typically carries a 50-year design life.' },
    ],
  },
  {
    slug:     'blocked-toilets',
    name:     'Blocked Toilets',
    category: 'Drains',
    icon:     'no-symbol',
    tagline:  'Fast blocked toilet clearance — same day across all areas',
    description:
      'A blocked toilet that won\'t flush or is at risk of overflowing needs immediate attention. Our partners carry toilet augers and drain rods to clear the full range of toilet blockages — from foreign objects to deep drain obstructions — on the same visit.',
    features: [
      'Same-day emergency response for blocked toilets',
      'Toilet auger and drain rod clearance',
      'Foreign object retrieval where possible',
      'Soil stack inspection for downstream blockages',
      'Toilet removal and refit for deep access if required',
      'Hygiene clean recommendation on completion',
    ],
    faqs: [
      { q: 'What should I do if my toilet is about to overflow?', a: 'Remove the cistern lid and push the flap valve down over the outlet to stop the flush. Do not flush again until the blockage is cleared.' },
      { q: 'What commonly blocks toilets?', a: 'Wet wipes (even "flushable" ones), nappy liners, cotton wool, children\'s toys, and excessive toilet paper are the most common causes.' },
      { q: 'My toilet flushes but then fills up slowly and gurgling — is that a blockage?', a: 'Yes — gurgling and slow fill after flushing indicates a partial downstream blockage in the soil pipe or drain. Call a plumber before it becomes a complete blockage.' },
    ],
  },
  {
    slug:     'blocked-drains',
    name:     'Blocked Drains',
    category: 'Drains',
    icon:     'funnel',
    tagline:  'High-pressure jetting, CCTV survey and full drain clearance',
    description:
      'Blocked or slow-draining sinks, baths, and gullies are among the most common drain callouts. Our partners use high-pressure water jetting and CCTV cameras to clear and diagnose drain blockages — from kitchen grease to root intrusion.',
    features: [
      'High-pressure water jetting for complete blockage clearance',
      'CCTV drain survey to diagnose cause and condition',
      'Internal drains: sinks, baths, toilets, shower traps',
      'External drains: inspection chambers, gullies, soakaways',
      'Root cutting and descaling for collapsed drains',
      'No-dig drain repair and lining where applicable',
    ],
    faqs: [
      { q: 'What causes most drain blockages?', a: 'Kitchen fat and grease, wet wipes, hair, and tree root ingress are the most common culprits.' },
      { q: 'Is a CCTV survey always necessary?', a: 'Not always — many blockages are cleared by jetting alone. CCTV is recommended for recurring blockages or suspected structural damage.' },
      { q: 'How long does drain jetting take?', a: 'A standard blocked drain can usually be cleared within 1–2 hours. Complex or root-related blockages may take longer.' },
    ],
  },
  {
    slug:     'blocked-sink-services',
    name:     'Blocked Sink Services',
    category: 'Drains',
    icon:     'beaker',
    tagline:  'Kitchen and bathroom sink blockage clearance — same day',
    description:
      'Blocked kitchen and bathroom sinks are the most frequent drain callout. Our partners clear sink blockages from the trap right through to the drain, and can replace damaged traps and waste fittings on the same visit.',
    features: [
      'Kitchen sink blockage clearance — grease and food waste',
      'Bathroom basin blockage clearance — hair and soap',
      'Trap and waste fitting inspection and replacement',
      'Under-sink waste pipe rodding and jetting',
      'Bottle and P-trap replacement',
      'Enzyme treatment advice to prevent recurrence',
    ],
    faqs: [
      { q: 'Can I clear a blocked sink myself?', a: 'Removing and cleaning the trap under the sink often resolves the issue. If the blockage is further down the pipe, or the trap is inaccessible, call a plumber.' },
      { q: 'Why does my sink smell even when it\'s draining normally?', a: 'A smelly but clear drain usually means the trap has dried out (common in guest bathrooms), or there\'s partial blockage building up in the waste run. Running the tap regularly or calling a plumber for a drain clean resolves it.' },
      { q: 'Are enzyme drain cleaners worth using?', a: 'As a monthly preventative treatment, enzyme cleaners are effective and safe. For an existing blockage, they are too slow — call a plumber for immediate clearance.' },
    ],
  },
  {
    slug:     'drain-cleaning',
    name:     'Drain Cleaning',
    category: 'Drains',
    icon:     'sparkles',
    tagline:  'Preventative drain cleaning to avoid costly blockages',
    description:
      'Regular professional drain cleaning removes grease, scale, and debris build-up before it causes a full blockage. Our partners offer scheduled drain maintenance for residential properties, landlords, and commercial premises across London and the Home Counties.',
    features: [
      'High-pressure water jetting for full drain de-scaling',
      'Chemical descaling for mineral and grease deposits',
      'Drain deodorising and bacteria treatment',
      'Kitchen drain cleaning — commercial grease removal',
      'Scheduled maintenance contracts for landlords',
      'Post-clean CCTV inspection available',
    ],
    faqs: [
      { q: 'How often should drains be professionally cleaned?', a: 'For most residential properties, annually is sufficient. Properties with heavy kitchen use benefit from cleaning every 6 months.' },
      { q: 'Is drain cleaning different from drain unblocking?', a: 'Yes — cleaning is preventative, removing partial build-up before it causes a full blockage. Unblocking is reactive, once the drain has already stopped flowing.' },
      { q: 'Can you set up a regular cleaning schedule for my rental properties?', a: 'Yes — we offer scheduled maintenance contracts for landlords and letting agents covering all properties in your portfolio.' },
    ],
  },
  {
    slug:     'blocked-shower-services',
    name:     'Blocked Shower Services',
    category: 'Drains',
    icon:     'droplet',
    tagline:  'Shower drain clearance — hair, soap and scale removal',
    description:
      'A blocked shower drain that causes water to pool underfoot is both unpleasant and a potential slip hazard. Our partners clear shower blockages at the drain, trap, and waste pipe level — and can replace slow shower drains with larger-bore alternatives to prevent recurrence.',
    features: [
      'Shower trap and hair filter clearance',
      'Waste pipe rodding and jetting',
      'Linear drain and tile-in drain clearance',
      'Shower tray waste fitting replacement',
      'Upgrade to 50mm waste for improved flow',
      'Wet room drain clearance and maintenance',
    ],
    faqs: [
      { q: 'Why does my shower drain slowly even after I clean the trap?', a: 'If cleaning the visible trap doesn\'t improve flow, the blockage is further down the waste pipe — likely a combination of hair, soap scum, and scale. Jetting the pipe will clear it.' },
      { q: 'How do I prevent shower drain blockages?', a: 'Fit a hair catcher over the drain and clean it after every shower. Monthly enzyme treatment helps dissolve soap and grease build-up in the pipe.' },
      { q: 'Can a slow shower drain cause damp problems?', a: 'In a wet room, poor drainage can cause water to spread beyond the tiled area. Address slow drains quickly to protect surrounding floor structures.' },
    ],
  },

  // ── Bathrooms ────────────────────────────────────────────────────────────
  {
    slug:     'bathroom-fitting-installation',
    name:     'Bathroom Fitting & Installation',
    category: 'Bathrooms',
    icon:     'squares',
    tagline:  'Full bathroom fit-outs — design to completion',
    description:
      'Our partners manage the complete bathroom installation process: strip-out, waterproofing, tiling, sanitaryware fitting, and final plumbing connections. Whether a simple suite swap or a full luxury fit-out, every installation is project-managed from start to finish.',
    features: [
      'Full strip-out and disposal of existing suite',
      'Waterproof tanking and backer board preparation',
      'Floor and wall tiling by experienced tilers',
      'Sanitaryware supply and fit (or customer-supplied)',
      'Bath, shower, basin, toilet, and heated towel rail',
      'Extractor fan and lighting installation (Part P compliant)',
    ],
    faqs: [
      { q: 'How long does a bathroom installation take?', a: 'A full bathroom replacement typically takes 5–7 working days depending on the scope of tiling and whether structural changes are needed.' },
      { q: 'Can you supply the sanitaryware and tiles?', a: 'Yes — our partners have trade accounts with major suppliers, or we can work with your own chosen suite and tiles.' },
      { q: 'Do I need planning permission for a new bathroom?', a: 'Standard bathroom replacements do not require planning permission. Moving soil pipes or adding a bathroom to a new room may require Building Regulations approval.' },
    ],
  },
  {
    slug:     'bathroom-repairs',
    name:     'Bathroom Repairs',
    category: 'Bathrooms',
    icon:     'wrench',
    tagline:  'Leak repairs, re-sealing, and fixture replacement',
    description:
      'Bathroom repairs range from a leaking shower tray to a failed bath panel seal causing damage to the floor below. Our partners carry common bathroom seals, tap cartridges, and shower components to fix most bathroom faults on the same visit.',
    features: [
      'Bath and shower tray re-sealing and re-grouting',
      'Shower valve and cartridge replacement',
      'Bath tap and mixer replacement',
      'Towel rail and heated towel rail repair',
      'Toilet seat, lid, and fixing replacement',
      'Bathroom extractor fan replacement',
    ],
    faqs: [
      { q: 'My shower is leaking through the ceiling below — what should I do?', a: 'Turn off the shower immediately. The leak is likely a failed shower tray seal, a cracked tray, or a loose connection on the shower valve. Call a plumber the same day to prevent further structural damage.' },
      { q: 'How do I know if my shower seal needs replacing?', a: 'Black mould on the sealant, visible gaps or cracks in the seal, and water marks on the wall or floor outside the shower area are all signs the seal has failed.' },
      { q: 'Can you repair a thermostatic shower that\'s gone cold?', a: 'Yes — a shower that suddenly runs cold usually has a failed thermostatic cartridge. Most are replaced within the same visit.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category);
}
