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
    title: 'Operational Restructuring and OPEX Optimization, Verified in Your General Ledger.',
    dek: 'Positioned against theoretical consulting decks. 60% of fees are contingent upon EBITDA targets, SG&A reduction, and synergy baselines verified through hard accounting data.',
    meta: '40% fixed · 60% outcome-at-risk',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          'Zero-based organizational redesign and direct/indirect OPEX rationalization.',
          'Post-merger integration (PMI) and multi-entity synergy capture.',
          'Dual-metric variance governance: in-year cash impact plus run-rate EBITDA exit rate.',
        ],
      },
      {
        type: 'quote',
        tint: true,
        text: 'PE Portfolio Integration: a £200M revenue group realized £18M of verified EBITDA improvement across 14 European operating entities.',
        cite: 'Verified engagement',
      },
      {
        type: 'related',
        heading: 'Diagnostics & tools',
        items: [
          { tag: 'Diagnostic', h: 'Value-at-Risk Assessment (value creation)', href: '/diagnostics/value-at-risk' },
          { tag: 'Playbook', h: 'SG&A & Footprint Optimization Playbook', href: '/resources/playbooks' },
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
    title: 'Rapid Liquidity Stabilization, Cash Governance, and Operational Recovery.',
    dek: 'Immediate deployment of Managing Partners and in-seat COOs within 72 hours to stabilize distressed assets, protect covenants, and recover working capital.',
    meta: '72-hour deployment · in-seat COO bench',
    blocks: [
      {
        type: 'checklist',
        eyebrow: 'Capabilities',
        heading: 'Core modules',
        items: [
          '13-week cash-flow forecasting and tactical working capital release (AP / AR / inventory).',
          'Unprofitable product-line and facility rationalization and footprint closure.',
          'Critical creditor, supplier, and customer relationship stabilization.',
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
      title: 'Request a 72-hour rapid intervention.',
      copy: 'A direct partner line for distressed and time-critical situations.',
      primary: { label: 'Request 72-Hour Rapid Intervention', href: '/contact' },
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
      copy: '72-hour response on embedded programme and functional leadership.',
      primary: { label: 'Check Delivery Team Availability', href: '/contact' },
      secondary: { label: 'Speak with an Interim CIO', href: book },
    },
  },
}

export const DealAdvisoryCarveOuts = () => <ContentPage {...PAGES.dealAdvisory} />
export const ValueCreationCostTransformation = () => <ContentPage {...PAGES.valueCreation} />
export const RestructuringTurnaround = () => <ContentPage {...PAGES.restructuring} />
export const ErpEnterpriseApplications = () => <ContentPage {...PAGES.erpHub} />
export const ErpApplicationSiSelection = () => <ContentPage {...PAGES.erpSelection} />
export const ErpProgrammeAssurance = () => <ContentPage {...PAGES.erpAssurance} />
export const ErpImplementation = () => <ContentPage {...PAGES.erpImplementation} />
