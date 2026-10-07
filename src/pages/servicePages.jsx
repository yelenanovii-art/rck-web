import ContentPage from '../components/ContentPage'
import { BOOKING_URL } from '../config'

// Phase 1 — Advisory & Transformation service pages (spec section 2).
// Each renders through the shared ContentPage layout: hero + core modules
// (checklist) + case study / component grid + dual CTA.
const book = BOOKING_URL || '/contact'

const PAGES = {
  dealAdvisory: {
    eyebrow: 'Advisory & Transformation',
    title: 'Pre-Deal Operational Diligence to Flawless Day-1 Separation & TSA Exit.',
    dek: 'Anchored to capital protection and clean operational cutover. Co-investment under the 40/60 model, with 60% at-risk against Day-1 operational cutovers and milestone-locked TSA detachment.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Buy-side operational due diligence and stand-alone cost modelling.',
          'Day-1 cutover command centre and critical systems separation.',
          'TSA governance, stranded-cost elimination, and contract novation.',
        ],
      },
      {
        type: 'quote',
        tint: true,
        text: 'DAX Industrial Carve-Out: a €450M carve-out separated 4 months ahead of schedule, eliminating €8.2M in TSA run-rate costs.',
        cite: 'Verified engagement',
      },
      {
        type: 'related',
        heading: 'Diagnostics & tools',
        items: [
          { tag: 'Diagnostic', h: 'Value-at-Risk Assessment (carve-out)', href: '/diagnostics/value-at-risk' },
          { tag: 'Model', h: 'Deal Value Modeller — TSA delay leakage', href: '/diagnostics/deal-value-modeller' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Protect the value',
      title: 'Model your TSA cost of delay.',
      copy: 'See what every month of TSA overrun is costing, and how much of our fee is at risk against a clean Day-1.',
      primary: { label: 'Model Your TSA Cost of Delay', href: '/diagnostics/deal-value-modeller' },
      secondary: { label: 'Schedule a Partner Strategy Session', href: book },
    },
  },

  valueCreation: {
    eyebrow: 'Advisory & Transformation',
    title: 'Operational Restructuring and OPEX Optimisation, Verified in Your General Ledger.',
    dek: 'Positioned against theoretical consulting decks. 60% of fees are contingent upon EBITDA targets, SG&A reduction, and synergy baselines verified through hard accounting data.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Zero-based organisational redesign and direct/indirect OPEX rationalisation.',
          'Post-merger integration (PMI) and multi-entity synergy capture.',
          'Dual-metric variance governance: in-year cash impact plus run-rate EBITDA exit rate.',
        ],
      },
      {
        type: 'quote',
        tint: true,
        text: 'PE Portfolio Integration: a £200M revenue group realised £18M of verified EBITDA improvement across 14 European operating entities.',
        cite: 'Verified engagement',
      },
      {
        type: 'related',
        heading: 'Diagnostics & tools',
        items: [
          { tag: 'Diagnostic', h: 'Value-at-Risk Assessment (value creation)', href: '/diagnostics/value-at-risk' },
          { tag: 'Playbook', h: 'SG&A & Footprint Optimisation Playbook', href: '/resources/playbooks' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Verify the upside',
      title: 'Benchmark your value-creation readiness.',
      copy: 'A short diagnostic on where verifiable EBITDA and SG&A upside is realistically at stake.',
      primary: { label: 'Benchmark Value Readiness', href: '/diagnostics/value-at-risk' },
      secondary: { label: 'Download the Synergy Playbook', href: '/resources/playbooks' },
    },
  },

  restructuring: {
    eyebrow: 'Advisory & Transformation',
    title: 'Rapid Liquidity Stabilisation, Cash Governance, and Operational Recovery.',
    dek: 'Managing Partners and in-seat COOs in seat in Week 1 to stabilise distressed assets, protect covenants, and recover working capital.',
    meta: 'In seat in Week 1 · in-seat COO bench',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          '13-week cash-flow forecasting and tactical working capital release (AP / AR / inventory).',
          'Unprofitable product-line and facility rationalisation and footprint closure.',
          'Critical creditor, supplier, and customer relationship stabilisation.',
        ],
      },
      {
        type: 'related',
        heading: 'Diagnostics & leadership',
        items: [
          { tag: 'Diagnostic', h: 'Distressed Working Capital Stress-Test', href: '/diagnostics/value-at-risk' },
          { tag: 'Leadership', h: 'Restructuring Partner & Interim COO bench', href: '/about/team' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Move now',
      title: 'Request a rapid intervention.',
      copy: 'A direct partner line for distressed and time-critical situations.',
      primary: { label: 'Request a Rapid Intervention', href: '/contact' },
      secondary: { label: 'Download the Cash Governance Framework', href: '/resources/playbooks' },
    },
  },

  erpHub: {
    eyebrow: 'ERP & Enterprise Applications',
    title: 'Independent Enterprise Application Delivery, From SI Selection to Day-1 Cutover.',
    dek: 'Three distinct engagement points across the application lifecycle: choosing the platform and integrator, governing the programme from the client side, and delivering the implementation itself. All three run under the 40/60 model, with 60% of fees at risk against cutover, stabilisation, and benefit-realisation milestones.',
    meta: 'Vendor-neutral · client-side · milestone-locked',
    blocks: [
      {
        type: 'related',
        eyebrow: 'Service lines',
        heading: 'Three ways we engage across the ERP lifecycle',
        items: [
          { tag: '01', h: 'Application & SI Selection', href: '/services/erp/application-si-selection' },
          { tag: '02', h: 'Client-Side Programme Assurance', href: '/services/erp/programme-assurance' },
          { tag: '03', h: 'Implementation Services', href: '/services/erp/implementation' },
        ],
      },
      {
        type: 'callout',
        label: 'Vendor-neutral by design.',
        body: 'RCK holds no reseller, licence, or implementation partnership with any software vendor or SI, so the recommendation is driven by process fit and total cost, not channel margin.',
      },
    ],
    cta: {
      eyebrow: 'De-risk the programme',
      title: 'Audit your ERP cutover risk.',
      copy: 'A fast diagnostic on selection, governance and cutover readiness across your application lifecycle.',
      primary: { label: 'Audit Your ERP Cutover Risk', href: '/diagnostics/value-at-risk' },
      secondary: { label: 'Speak with an Interim CIO', href: book },
    },
  },

  erpSelection: {
    eyebrow: 'ERP & Enterprise Applications',
    title: 'Choose the Right Platform and the Right Integrator, Before the Capital Is Committed.',
    dek: 'Vendor-neutral selection support. RCK holds no reseller, licence, or implementation partnership with any software vendor or SI, so the recommendation is driven by process fit and total cost, not channel margin.',
    meta: 'Vendor-neutral selection',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Requirements baselining, process-fit assessment, and target operating model definition.',
          'Long-list to short-list evaluation across SAP, Oracle, NetSuite, Microsoft Dynamics, and Infor.',
          'SI capability, delivery-team and reference validation, including named-resource commitments.',
          'Commercial and contract stress-testing: scope boundaries, change control, milestone-linked payment schedules, and exit rights.',
          'TCO and business-case modelling with benefit baselines agreed up front for later GL verification.',
        ],
      },
      {
        type: 'related',
        heading: 'Diagnostics & tools',
        items: [
          { tag: 'Diagnostic', h: 'Application & SI Selection Readiness Check', href: '/diagnostics/value-at-risk' },
          { tag: 'Playbook', h: 'ERP Selection & SI Evaluation Scorecard', href: '/resources/playbooks' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Select with confidence',
      title: 'Benchmark your selection readiness.',
      primary: { label: 'Benchmark Your Selection Readiness', href: '/diagnostics/value-at-risk' },
      secondary: { label: 'Request an SI Contract Stress-Test', href: '/contact' },
    },
  },

  erpAssurance: {
    eyebrow: 'ERP & Enterprise Applications',
    title: 'Independent Client-Side Assurance That Holds Your Integrator to the Plan.',
    dek: 'We sit on your side of the table. Independent assurance of scope, cost, timeline, and cutover readiness, with the authority and seniority to escalate to the board before a milestone slips, not after.',
    meta: 'Client-side assurance',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Independent programme health reviews and red / amber stage-gate assessments.',
          'SI performance and contract governance: scope creep, change-order challenge, and milestone verification before payment release.',
          'Risk, dependency, and cutover-readiness tracking via TRANSFORM+ milestone governance.',
          'Benefits-realisation baselining so the business case is measured in the General Ledger, not a vendor benefits model.',
          'Board and sponsor reporting with a single, unfiltered view of programme status.',
        ],
      },
      {
        type: 'related',
        heading: 'Diagnostics & briefings',
        items: [
          { tag: 'Diagnostic', h: 'ERP Cutover Risk Check (Value-at-Risk)', href: '/diagnostics/value-at-risk' },
          { tag: 'Brief', h: 'Why System Integrators Fail Post-Cutover', href: '/case-studies' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Hold the line',
      title: 'Audit your ERP cutover risk.',
      primary: { label: 'Audit Your ERP Cutover Risk', href: '/diagnostics/value-at-risk' },
      secondary: { label: 'Request an Independent Programme Health Review', href: '/contact' },
    },
  },

  erpImplementation: {
    eyebrow: 'ERP & Enterprise Applications',
    title: 'In-Seat Delivery Leadership Through Cutover and Stabilisation.',
    dek: 'For clients who need execution capacity rather than oversight alone: interim programme directors, functional leads, and data / integration leads embedded directly in the delivery team, on milestone-linked terms.',
    meta: 'In-seat delivery · milestone-linked',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Programme and PMO leadership, workstream mobilisation, and vendor coordination.',
          'Data migration, cleansing, and reconciliation to auditable balances.',
          'Process design, SIT / UAT test management, and Day-1 cutover orchestration.',
          'Hypercare, post-cutover financial stabilisation, and 30/60/90-day General Ledger close audit.',
          'ERP-enabled operating model, controls, and reporting redesign.',
        ],
      },
      {
        type: 'related',
        heading: 'Diagnostics & leadership',
        items: [
          { tag: 'Diagnostic', h: 'Implementation Bandwidth & Readiness Check', href: '/diagnostics/value-at-risk' },
          { tag: 'Leadership', h: 'Interim CIO/CTO & ERP Programme Director bench', href: '/about/team' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Execution capacity',
      title: 'Check delivery-team availability.',
      copy: 'Candidates identified within 48 hours on embedded programme and functional leadership.',
      primary: { label: 'Check Delivery Team Availability', href: '/contact' },
      secondary: { label: 'Speak with an Interim CIO', href: book },
    },
  },

  // ── Services hub ──────────────────────────────────────────────────────────
  // Ported from the WordPress site at rck-pm.com, which the consolidation spec
  // names as the content source for this page. Copy, figures and the R/C/K
  // framing are carried across rather than rewritten.
  servicesHub: {
    eyebrow: 'Services',
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services' }],
    title: 'Right-sized technology and transformation, pre-deal to verified value.',
    dek: 'One senior team, one findings register, from diligence through SPA, TSA and integration. We remove the handover gap that destroys synergy capture, and price our fee against the outcome.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'points',
        eyebrow: 'The method',
        heading: 'The RCK framework',
        lede: 'Our name is our method. Hypothesis-led and evidence-based, built to convert findings into commercial leverage.',
        items: [
          { n: 'R', h: 'Risk', p: 'What threatens the thesis or the integration. Hypothesis-led, a pre-mortem before fieldwork begins.' },
          { n: 'C', h: 'Controls', p: 'What mature looks like for this target. A calibrated baseline, independently sourced.' },
          { n: 'K', h: 'Key findings', p: 'Material gaps, quantified and triangulated, each routed to a negotiation lever.' },
        ],
      },
      {
        type: 'callout',
        label: 'From finding to action:',
        body: 'Every key finding has one of four homes — closed before signing, written into the SPA, designed into the TSA, or placed on the Day-1 backlog. Nothing is filed and forgotten.',
      },
      {
        type: 'points',
        eyebrow: 'Six playbooks, one methodology',
        heading: 'Calibrated by sector and deal type',
        lede: 'Each playbook scores controls one to five and quantifies the key findings, so the output maps straight to price, terms and the Day-1 plan.',
        items: [
          { n: '01', h: 'Commercial & strategic', p: 'Market thesis, customer concentration, pricing power, plan credibility and synergy realism. Price defence · walk-away triggers.' },
          { n: '02', h: 'Operations', p: 'Operating-model design, process re-engineering, service delivery, performance and governance. Operating model · service uplift.' },
          { n: '03', h: 'People & cultural', p: 'Workforce profile, key-person dependency, leadership depth, cultural fit and retention design. Retention · Day-1 readiness.' },
          { n: '04', h: 'Technology & cybersecurity', p: 'Architecture, application disposition, identity, NIST CSF controls and ransomware resilience. Migration cost · cyber exposure.' },
          { n: '05', h: 'Procurement & supply chain', p: 'Strategic sourcing, supplier concentration, resilience, S&OP and third-party risk. Savings · concentration risk.' },
          { n: '06', h: 'TSA design & carve-out', p: 'Day-1 readiness, Excluded Services, Reverse TSA, stranded cost and exit milestones. Day-1 risk · stranded cost.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Across the deal lifecycle',
        heading: 'The same team, from diligence to value',
        lede: 'RCK applies the methodology and the six playbooks at every stage. The same associates carry findings from diligence through SPA, TSA and integration.',
        items: [
          { k: 'Pre-LOI to signing', h: 'Due diligence', p: 'Hypothesis-led fieldwork and red-team challenge inform price, terms and walk-away. 3–15% price chip, deal-breakers surfaced.' },
          { k: 'Signing to Day-1', h: 'Pre & post-deal', p: 'SPA and disclosure inputs, conditions precedent, and Service Manager cover across every TSA schedule. 100% consent, Day-1 in 12 weeks.' },
          { k: 'Day-1 to TSA exit', h: 'Carve-out & TSA', p: 'Excluded Services discipline, Reverse TSA scoping, stranded-cost detection and milestone exit. 10–20% TSA saving, ~18-month exit.' },
          { k: 'Day-100 to full state', h: 'Value creation', p: 'Integration, synergy capture and operating-model migration, tracked against the original thesis. 20–40% synergy, EBITDA uplift.' },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Why one team wins',
        heading: 'The handover gap, closed',
        columns: ['', 'The standard model', 'The RCK model'],
        hi: 2,
        rows: [
          ['Team', 'Four advisors, four reports, four handovers', 'One team, one findings register, no handover gap'],
          ['Findings', 'Reinterpreted at each stage, or lost', 'Carried into SPA warranties and indemnities'],
          ['TSA', 'Day-1 plan rebuilt from scratch post-close', 'TSA design flows from the same register'],
          ['Integration', 'Synergy capture lags the deal plan', 'Same associates lead Day-1 and integration'],
        ],
      },
      {
        type: 'related',
        heading: 'Service areas',
        items: [
          { tag: 'Service', h: 'Deal advisory & carve-outs', href: '/services/deal-advisory-carve-outs' },
          { tag: 'Service', h: 'ERP & enterprise applications', href: '/services/erp-enterprise-applications' },
          { tag: 'Service', h: 'Value creation & cost transformation', href: '/services/value-creation-cost-transformation' },
          { tag: 'Service', h: 'Restructuring & turnaround', href: '/services/restructuring-turnaround' },
          { tag: 'Service', h: 'Transformation outcomes', href: '/services/transformation-outcomes' },
          { tag: 'Service', h: 'Interim management', href: '/services/interim-management' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Scope an engagement',
      title: 'Put 60% of our fee against your outcome.',
      copy: 'One senior team from diligence to verified value, with the majority of our fee released only against results you can audit.',
      primary: { label: 'Scope an Engagement', href: '/contact' },
      secondary: { label: 'See the fee model', href: '/approach/40-60-fee-model' },
    },
  },

  // ── Carve-out, Day-1 & TSA ────────────────────────────────────────────────
  // Ported from rck-pm.com/carve-out-day-1-tsa. Figures carried across intact.
  carveOutDay1: {
    eyebrow: 'Advisory & Transformation',
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Carve-out, Day-1 & TSA' }],
    title: 'Carve-out, Day-1 and TSA services.',
    dek: 'Separation planning, Day-1 operating-model design, and TSA scope, economics and exit. Excluded Services scoped in diligence, stranded cost detected early, and an exit run on milestones rather than dates.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'points',
        eyebrow: 'What we do',
        heading: 'Separation without the standing start',
        lede: 'A carve-out fails in the gap between the SPA and the operating reality of Day-1. We design the TSA to be exited, not extended.',
        items: [
          { n: '01', h: 'Day-1 operating model', p: 'Designed from the same findings register that priced the deal, not rebuilt from scratch post-close.' },
          { n: '02', h: 'TSA design', p: 'Scope, economics, service levels and exit milestones, with Service Manager cover across every schedule.' },
          { n: '03', h: 'Excluded Services', p: 'The discipline that keeps the TSA from silently absorbing the target operating model.' },
          { n: '04', h: 'Stranded cost', p: 'Detected and routed to the value plan, not discovered in year two.' },
        ],
      },
      {
        type: 'checklist',
        eyebrow: 'What you get',
        heading: 'Deliverables',
        items: [
          'A Day-1 plan that stands up in 12 weeks.',
          '100% consents secured before close.',
          'TSA economics with a 10–20% saving against first draft.',
          'A milestone-based exit, typically around 18 months.',
          'One team from diligence through separation.',
        ],
      },
      {
        type: 'quote',
        tint: true,
        text: '€4.6m of stranded TSA cost surfaced in one five-week diligence on a €500m target. The price was renegotiated before signing.',
        cite: 'RCK engagement records, anonymised at client request',
      },
      {
        type: 'steps',
        eyebrow: 'Our approach',
        heading: 'Signing to Day-1, on one register',
        lede: 'The findings that priced the deal become the separation plan. No handover, no reinterpretation.',
        items: [
          { k: '01', h: 'Scope', p: 'Excluded Services and Reverse TSA scoped during diligence, so the SPA and TSA are drafted from evidence rather than templates.' },
          { k: '02', h: 'Stand up', p: 'Day-1 operating model, consents, and cutover cadence, run by the same associates who carried the diligence register.' },
          { k: '03', h: 'Exit', p: 'TSA detachment run against milestones rather than calendar dates, with stranded cost routed into the value plan.' },
        ],
      },
      {
        type: 'related',
        heading: 'Related',
        items: [
          { tag: 'M&A', h: 'Technology & cyber diligence', href: '/services/technology-cyber-diligence' },
          { tag: 'Integration', h: 'Post-merger integration', href: '/services/post-merger-integration' },
          { tag: 'Model', h: 'Deal Value Modeller — TSA delay leakage', href: '/diagnostics/deal-value-modeller' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Scope an engagement',
      title: 'Design the TSA to be exited.',
      copy: 'Tell us the deal and we will size a partner-led team to it, mobilised within 48 to 72 hours.',
      primary: { label: 'Scope an Engagement', href: '/contact' },
      secondary: { label: 'See the fee model', href: '/approach/40-60-fee-model' },
    },
  },

  // ── Technology & cyber diligence ──────────────────────────────────────────
  // Ported from rck-pm.com/technology-cyber-diligence.
  techCyberDiligence: {
    eyebrow: 'Advisory & Transformation',
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Technology & cyber diligence' }],
    title: 'Technology and cyber due diligence for M&A.',
    dek: 'Six-workstream diligence that surfaces the risks driving price, indemnity and conditions to closing, each finding routed to a negotiation lever. Partner-led fieldwork, mobilised in 48 to 72 hours, reported in time to move the deal.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'points',
        eyebrow: 'What we do',
        heading: 'Diligence that moves price and terms',
        lede: 'Most technology diligence describes the estate. Ours prices it. Every key finding lands in one of four homes — closed before signing, written into the SPA, designed into the TSA, or placed on the Day-1 backlog. Nothing is left as an observation.',
        items: [
          { n: '01', h: 'Six workstreams', p: 'Architecture, applications, infrastructure and cloud, cybersecurity, data, and technology organisation.' },
          { n: '02', h: 'Hypothesis-led', p: 'A pre-mortem before fieldwork, so the team tests what threatens the thesis rather than auditing everything.' },
          { n: '03', h: 'Calibrated controls', p: 'Maturity scored one to five against an independently sourced baseline for the sector and deal type.' },
          { n: '04', h: 'Cyber depth', p: 'NIST CSF controls, identity, and ransomware resilience, quantified as exposure rather than listed as findings.' },
        ],
      },
      {
        type: 'checklist',
        eyebrow: 'What you get',
        heading: 'Deliverables',
        items: [
          'A findings register that maps to price, terms and the Day-1 plan.',
          'A red-team challenge on the deal thesis before you sign.',
          'Quantified migration cost and cyber exposure.',
          'Walk-away triggers, named and evidenced.',
          'The same team available to fix what it found.',
        ],
      },
      {
        type: 'quote',
        tint: true,
        text: '3–15% — the price adjustment range our diligence findings have supported in negotiation, with deal-breakers surfaced before signing rather than after.',
        cite: 'RCK engagement records, 2026',
      },
      {
        type: 'steps',
        eyebrow: 'Our approach',
        heading: 'From thesis to negotiation lever',
        lede: 'The RCK framework, applied to technology and cyber: Risk, Controls, Key findings.',
        items: [
          { k: 'R', h: 'Risk', p: 'A hypothesis-led pre-mortem before fieldwork. What threatens this thesis or this integration, specifically, for this target.' },
          { k: 'C', h: 'Controls', p: 'What mature looks like for this target, calibrated by sector and deal type, scored one to five against an independent baseline.' },
          { k: 'K', h: 'Key findings', p: 'Material gaps, quantified and triangulated, each routed to a negotiation lever: price, warranty, indemnity or condition to closing.' },
        ],
      },
      {
        type: 'quote',
        text: 'RCK supported the delivery of complex programmes. The RCK Partner showed real leadership, got results, demonstrated an ability to build relationships, and was skilled in building innovative solutions.',
        cite: 'Group Commercial Director, Target Group / Tech Mahindra',
      },
      {
        type: 'related',
        heading: 'Related',
        items: [
          { tag: 'Separation', h: 'Carve-out, Day-1 & TSA', href: '/services/carve-out-day-1-tsa' },
          { tag: 'Integration', h: 'Post-merger integration', href: '/services/post-merger-integration' },
          { tag: 'Diagnostic', h: 'Value-at-Risk Assessment', href: '/diagnostics/value-at-risk' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Scope an engagement',
      title: 'Price the estate, not just describe it.',
      copy: 'Partner-led fieldwork mobilised in 48 to 72 hours, reported in time to move the deal.',
      primary: { label: 'Scope an Engagement', href: '/contact' },
      secondary: { label: 'Take the readiness scorecard', href: '/diagnostics/readiness-score' },
    },
  },

  // ── Post-merger integration ───────────────────────────────────────────────
  // The WordPress page for this is dead (it 301s to a parked domain), so this
  // is built from RCK's own framing used across the other service pages and
  // the lifecycle stages on the services hub, not ported copy.
  postMergerIntegration: {
    eyebrow: 'Advisory & Transformation',
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Post-merger integration' }],
    title: 'Post-merger integration, led by the team that ran the diligence.',
    dek: 'Operating-model migration, synergy capture and governance, tracked against the thesis that priced the deal. The same associates carry the findings register from Day-1 through to full state.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'points',
        eyebrow: 'What we do',
        heading: 'Integration that closes the handover gap',
        lede: 'Synergy capture lags the deal plan when the integration team is meeting the findings for the first time. We do not hand over.',
        items: [
          { n: '01', h: 'Operating-model migration', p: 'Target-state design carried from the diligence register, sequenced against Day-1 commitments rather than drawn fresh.' },
          { n: '02', h: 'Synergy capture', p: 'Tracked against the original thesis, with each item owned, baselined and evidenced before it is called banked.' },
          { n: '03', h: 'Governance', p: 'One register, one cadence, and a reporting line that survives the transition from deal team to run organisation.' },
          { n: '04', h: 'Day-100 and beyond', p: 'The backlog placed at Day-1 worked down on milestones, with stranded cost routed into the value plan.' },
        ],
      },
      {
        type: 'callout',
        label: 'Why it holds:',
        body: 'Every finding has one of four homes — closed before signing, written into the SPA, designed into the TSA, or placed on the Day-1 backlog. Integration is where the fourth is paid off, which is why the same team carries it.',
      },
      {
        type: 'checklist',
        eyebrow: 'What you get',
        heading: 'Deliverables',
        items: [
          'A synergy plan traced line by line to the diligence findings register.',
          'Operating-model migration sequenced against Day-1 and TSA exit.',
          'Evidence standards agreed up front for what counts as banked.',
          'The same associates who ran diligence and separation.',
        ],
      },
      {
        type: 'related',
        heading: 'Related',
        items: [
          { tag: 'M&A', h: 'Technology & cyber diligence', href: '/services/technology-cyber-diligence' },
          { tag: 'Separation', h: 'Carve-out, Day-1 & TSA', href: '/services/carve-out-day-1-tsa' },
          { tag: 'Value', h: 'Value creation & cost transformation', href: '/services/value-creation-cost-transformation' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Scope an engagement',
      title: 'Prove the synergy, do not just report it.',
      copy: 'Put 60% of our fee against the value you can audit at the end of integration.',
      primary: { label: 'Scope an Engagement', href: '/contact' },
      secondary: { label: 'See the fee model', href: '/approach/40-60-fee-model' },
    },
  },

  // ── Sectors ───────────────────────────────────────────────────────────────
  // Ported from rck-pm.com/sectors. The source names individual sector leads;
  // most of those people are not on this site's team roster, so the names are
  // deliberately omitted rather than published unverified. The proof points and
  // sector definitions are carried across as written.
  sectorsHub: {
    eyebrow: 'Sectors',
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Sectors' }],
    title: 'Six core sectors, named senior leads.',
    dek: 'Carve-outs and transformations delivered across the UK, Spain, Germany, France, Italy, Ireland, Sweden, Poland and the UAE, with a sector-matched senior lead on every mandate.',
    blocks: [
      {
        type: 'points',
        eyebrow: 'Where we work',
        heading: 'Sector coverage',
        items: [
          { n: '01', h: 'Technology, Media & Telecoms', p: 'Software, telecoms, media, cloud and digital. PE carve-outs, FTSE 100 IT estates and SAP S/4HANA consolidations. €28m IT transformations · 5,000-seat carve-outs.' },
          { n: '02', h: 'Consumer, Retail & Leisure', p: 'Multi-site retail, FMCG, hospitality, franchising and direct-to-consumer, from FTSE 100 brands to PE-backed platforms. 60,000-staff transformations · 750-store programmes.' },
          { n: '03', h: 'Financial Services', p: 'Banking, fintech, asset management, payments and corporate venture, from tier-1 banks to PE-backed platforms. Core platform recovery · €1.4bn venture fund.' },
          { n: '04', h: 'Industrials & Manufacturing', p: 'Industrial software, defence, aerospace, automotive and heavy machinery. Cross-border integration and turnaround. £3bn industrial integration recovered.' },
          { n: '05', h: 'Healthcare & Life Sciences', p: 'Biotech, medical devices, pharma services and health-data platforms. Procurement transformation and M&A integration.' },
          { n: '06', h: 'B2B Services & Procurement', p: 'Professional services, real estate, BPO and HR services. Global category and supplier management. $200m+ real estate savings · multi-billion sourcing.' },
        ],
      },
      {
        type: 'checklist',
        eyebrow: 'How we calibrate',
        heading: 'Independent calibration, not the seller’s narrative',
        items: [
          'Sector-matched senior lead on every mandate.',
          'Six-playbook control framework, scored one to five.',
          'Red-team challenge on the seller’s numbers.',
          'Findings mapped to price, indemnity and exit triggers.',
        ],
      },
      {
        type: 'related',
        heading: 'Related',
        items: [
          { tag: 'Services', h: 'All service areas', href: '/services' },
          { tag: 'Team', h: 'Our partners', href: '/about/team' },
          { tag: 'Proof', h: 'Case studies', href: '/case-studies' },
        ],
      },
    ],
    cta: {
      eyebrow: 'Talk to a sector lead',
      title: 'Tell us your sector and deal type.',
      copy: 'We will match a named senior lead and mobilise within 48 to 72 hours.',
      primary: { label: 'Talk to a Sector Lead', href: '/contact' },
      secondary: { label: 'See the fee model', href: '/approach/40-60-fee-model' },
    },
  },
}

export const CarveOutDay1Tsa = () => <ContentPage {...PAGES.carveOutDay1} />
export const TechnologyCyberDiligence = () => <ContentPage {...PAGES.techCyberDiligence} />
export const PostMergerIntegration = () => <ContentPage {...PAGES.postMergerIntegration} />
export const SectorsHub = () => <ContentPage {...PAGES.sectorsHub} />
export const ServicesHub = () => <ContentPage {...PAGES.servicesHub} />
export const DealAdvisoryCarveOuts = () => <ContentPage {...PAGES.dealAdvisory} />
export const ValueCreationCostTransformation = () => <ContentPage {...PAGES.valueCreation} />
export const RestructuringTurnaround = () => <ContentPage {...PAGES.restructuring} />
export const ErpEnterpriseApplications = () => <ContentPage {...PAGES.erpHub} />
export const ErpApplicationSiSelection = () => <ContentPage {...PAGES.erpSelection} />
export const ErpProgrammeAssurance = () => <ContentPage {...PAGES.erpAssurance} />
export const ErpImplementation = () => <ContentPage {...PAGES.erpImplementation} />
