// Fills the Home story with the copy that is currently hardcoded in
// src/pages/Home.jsx, so nothing on the page changes when it starts
// rendering from Storyblok. Safe to re-run.
import { api } from './sb.mjs'

const b = (component, fields) => ({ component, ...fields })

const POSITIONING = 'Strategic Transformation · M&A Advisory · Interim & Fractional Leadership'

const hero = b('hero_home', {
  positioning: POSITIONING,
  sub_bold: 'We deliver measurable outcomes, not theories in slideware.',
  sub_rest:
    'Under our 40/60 model, 60% of our fee is at risk and unlocked only when your integration, carve-out, or transformation milestones are fully verified.',
  cta_primary_label: 'Calculate your Value-at-Risk',
  cta_primary_url: '/diagnostics/value-at-risk',
  cta_secondary_label: 'Download: Outcomes-Based PMI Playbook (Free)',
  cta_secondary_url: '/resources/playbooks',
  meta: '7 named partners · 200+ engagements · London & Barcelona',
  panel_model: 'Value‑Anchored Contingent Fee',
  panel_figure: '60%',
  panel_caption: 'of our fee is paid **only** once milestones are independently verified.',
  bar_base: '40%',
  bar_out: '60%',
  legend_base: 'Retained baseline',
  legend_out: 'Performance-tied',
})

const diff = b('diff_section', {
  eyebrow: 'Why Commercial Alignment Matters',
  title:
    'Most advisory firms bill for advice regardless of value realization. RCK ties fee recovery directly to P&L outcomes.',
  lede:
    'Traditional firms hand over strategy decks and exit before the operational friction begins. We built RCK to unify M&A advisory, complex transformation, and hands-on interim execution under a single, shared-risk commercial model.',
  disclose_label: 'See the side-by-side comparison',
  old_tag: 'Traditional Advisory & Interim Partners',
  old_items: [
    b('diff_item', { lead: 'Junior Matrix Pyramid:', text: 'Leveraged staffing models where senior partners sell and junior generalists execute.' }),
    b('diff_item', { lead: 'Diluted Attention:', text: 'Managing 8–10 concurrent client accounts per workstream lead.' }),
    b('diff_item', { lead: 'Deliverable-Centric:', text: 'Paid 100% on the delivery of slides and roadmaps, regardless of financial impact.' }),
    b('diff_item', { lead: 'Separation of Strategy & Execution:', text: 'Strategy teams leave before integration, carve-outs, or turnaround challenges hit the ground.' }),
    b('diff_item', { lead: 'Zero Skin in the Game:', text: 'Fee realization is completely decoupled from your Value Creation Plan (VCP).' }),
  ],
  rck_tag: 'The RCK Outcome Model',
  rck_items: [
    b('diff_item', { lead: 'Partner-Led Execution:', text: 'Named, seasoned operators and interim CxOs embedded directly into your leadership team.' }),
    b('diff_item', { lead: 'High Focus & Bandwidth:', text: 'Capped at 3–4 concurrent mandates per partner.' }),
    b('diff_item', { lead: 'Integrated Strategy & Leadership:', text: 'We don’t just design the playbook, our fractional/interim leaders execute it alongside you.' }),
    b('diff_item', { lead: 'The 40/60 Fee-at-Risk Structure:', text: '40% fixed baseline; 60% unlocked only when milestones are verified in your General Ledger.' }),
    b('diff_item', { lead: 'Shared Downside:', text: 'If your target EBITDA, carve-out separation, or synergy outcomes are missed, we forfeit our fee.' }),
  ],
  close_lead: 'Shared Risk from Strategy to In-Seat Execution.',
  close_text:
    'Most firms fragment accountability: advisors hand over decks without risk, while recruiters place interims who bill daily regardless of performance. RCK operates on **dual alignment**.',
  foot_link_label: 'Total partner ownership, explained',
  foot_link_url: '/about/partner-led-model',
  stats: [
    b('diff_stat', { number: '200+', text: 'engagements delivered' }),
    b('diff_stat', { number: '85%+', text: 'of programmes delivered on or above synergy targets' }),
  ],
  stat_note: 'No One Sits on the Sidelines. No One Gets Paid for Effort Alone.',
})

const dualTrack = b('dual_track', {
  eyebrow: 'How to work with us',
  title: 'Two Core Ways to Drive Transformation Outcomes',
  tab_labels: 'Track 1, Track 2',
  tracks: [
    b('track_card', {
      tag: 'Track 1',
      title: 'Outcomes-Based Transformation Advisory',
      meta_for: 'PMI, cost reduction, revenue synergy, capability uplift',
      meta_model: '40% fixed time-billed + 60% outcome-at-risk',
      meta_timeline: '12–18 months',
      body: 'We execute alongside you, measure outcomes in your GL, and release fees proportional to achievement.',
      link_label: 'Learn More',
      link_url: '/services/transformation-outcomes',
    }),
    b('track_card', {
      tag: 'Track 2',
      title: 'Interim Leadership & CxO Bench',
      meta_for: 'Interim CFO, COO, CIO when you need leadership now',
      meta_model: '£8K–£25K / month + 40% placement fee (one-time)',
      meta_timeline: '48-hour identification, Week 1 deployment',
      body: 'We deploy pre-vetted interim leaders from our bench, pre-aligned to your transformation strategy.',
      link_label: 'Learn More',
      link_url: '/services/interim-management',
    }),
  ],
})

const proof = b('proof_metrics', {
  eyebrow: 'The proof',
  title: 'Value delivered, confidence priced in',
  lede: 'Representative anonymised engagements: two tracks, one accountability structure. Detail available under NDA.',
  stats: [
    b('stat_card', { value: '$128M', label: 'Opex unlocked vs a US$120M target (107%), independently verified by the client’s external auditor — operating-model redesign across 31 markets, span of control 5.1 → 5.8' }),
    b('stat_card', { value: '42→91%', label: 'Synergy recovery on a stalled €15M programme, clearing 27 late milestones under new governance' }),
    b('stat_card', { value: '<72 hrs', label: 'Deployment of pre-vetted senior partners across 12+ workstreams on a $250M carve-out' }),
  ],
  columns: [
    b('metrics_col', {
      tag: 'Track 1',
      title: 'Transformation Outcomes',
      items: [
        b('metrics_item', { number: '40/60', heading: 'Model', text: '40% fixed base + 60% earned on GL-verified outcomes.' }),
        b('metrics_item', { number: '85%+', heading: 'Achievement rate', text: '85% of engagements hit 90%+ of target. 10% hit 75–89%. 5% under 75%, where we write off the fee.' }),
        b('metrics_item', { number: '$200–600M', heading: 'Culture-friction risk', text: 'Post-merger culture friction exposure addressed (Gelfand / Gallup research).' }),
        b('metrics_item', { number: 'Week 1–3', heading: 'Baseline lockdown', text: 'Outcome definition and lockdown, on a signed Baseline Schedule.' }),
        b('metrics_item', { number: '175+', heading: 'Combined partner years', text: '7 named partners, 25+ years average in deal advisory.' }),
      ],
    }),
    b('metrics_col', {
      tag: 'Track 2',
      title: 'Interim Management',
      items: [
        b('metrics_item', { number: '48 hrs', heading: 'Deployment', text: 'Team on-site, intake complete; the first day of interim starts Week 1.' }),
        b('metrics_item', { number: '12+', heading: 'Active placements', text: 'Full-time and fractional interim roles currently managed across PE portfolio.' }),
        b('metrics_item', { number: '£8K–£25K', heading: 'Per month', text: 'Published pricing for interim CFO / COO / CIO, all-in, including benefits and taxes.' }),
        b('metrics_item', { number: '90%+', heading: 'Retention rate', text: 'Placements stay for the full agreed duration; replacement guaranteed on departure.' }),
        b('metrics_item', { number: '9', heading: 'Jurisdictions active', text: 'Execution across the UK, Europe and the UAE.' }),
      ],
    }),
  ],
})

const problem = b('problem_section', {
  eyebrow: 'The problem',
  title: 'Deal advisory and transformation are sold broken',
  lede: 'Value leaks at every hand-off, and the standard commercial models make sponsors and C-suite leaders carry all the delivery risk while paying by the hour.',
  cards: [
    b('numbered_card', { number: '1', title: 'Hand-off leakage', text: 'Diligence, integration and exit prep typically sit with three different firms. The deal thesis gets diluted in translation between them.' }),
    b('numbered_card', { number: '2', title: 'The pyramid model', text: 'Partners sell the engagement; delivery is handed to a team of juniors logging hours against it.' }),
    b('numbered_card', { number: '3', title: 'Advice without accountability', text: "Large retainers buy reports and recommendations, then your team executes alone, with no one else's fee riding on the result." }),
  ],
  note_lead: 'Our view:',
  note_text: 'diligence and delivery should sit in the same room, under the same commercial incentive.',
})

const modelTeaser = b('model_teaser', {
  eyebrow: 'The model',
  title: 'The 40/60 risk-share fee model',
  lede: 'We replace time-and-materials billing with a structured model that puts our own fee at risk against the outcomes we agree with you.',
  link_label: 'See how the model works',
  link_url: '/advisory',
})

const imageBand = b('image_band', {
  eyebrow: 'London · Barcelona',
  title: 'Senior operators, on the ground where the value is.',
  image: { fieldtype: 'asset', id: null, filename: null, alt: null, name: '', title: '', focus: '' },
  tone: 'dark',
  suggest:
    'Wide, understated hero shot, the London or Barcelona financial district at dusk, or a quiet, well-lit boardroom. Muted and desaturated, navy-toned; no stock-photo handshakes.',
})

const twoPaths = b('two_paths', {
  eyebrow: 'Two ways to work with us',
  title: 'Hands-on when it matters. Instrumented for the long run.',
  lede: 'Bring us in to run the deal or the turnaround directly, or run your whole execution spine on the platform that grew out of it.',
  tab_labels: 'Deal Advisory, TRANSFORM+',
  cards: [
    b('path_card', {
      mark: 'rck',
      variant: 'default',
      tag: 'RCK · Deal Advisory',
      title: 'Deal Advisory & Interim Execution',
      body: 'One partner-led team from diligence to value realisation, on the 40/60 model, senior operators in direct control, never sub-contracted.',
      bullets: [
        b('bullet', { text: 'Due diligence, PMI, carve-outs & TSA execution' }),
        b('bullet', { text: 'Value creation & AI transformation' }),
        b('bullet', { text: 'Interim CFO / COO / CIO / CTrO, deployed in 72 hours' }),
      ],
      cta_label: 'Explore Deal Advisory',
      cta_url: '/advisory',
      cta_style: 'btn-navy',
    }),
    b('path_card', {
      mark: 'transform',
      variant: 'platform',
      tag: 'TRANSFORM+ · Platform',
      title: 'The Strategy-to-Value Platform',
      body: 'An independently verifiable trail from deal thesis to realised EBITDA, built on your existing Strategy → OKR → Sprint spine, with a cryptographically sealed audit trail.',
      bullets: [
        b('bullet', { text: 'Seven modules on one execution spine' }),
        b('bullet', { text: 'Dual-mode delivery & behavioural intelligence' }),
        b('bullet', { text: 'Gated M&A mode with sealed, verifiable decisions' }),
      ],
      cta_label: 'Explore TRANSFORM+',
      cta_url: '/products/transform-plus',
      cta_style: 'btn-gold',
    }),
  ],
})

const assess = b('assess_invite', {
  eyebrow: 'Value-at-Risk Assessment',
  title: 'Not sure where you stand? Find out in two minutes.',
  body: 'Answer six quick questions and get a tailored Value-at-Risk report, your recommended path, where to focus first, and a mobilisation plan.',
  cta_label: 'Take the Value-at-Risk Assessment',
  cta_url: '/diagnostics/value-at-risk',
})

const faq = b('faq_section', {
  anchor: 'home-faq',
  eyebrow: 'Common questions',
  title: 'The 40/60 model, answered',
  items: [
    b('faq_item', {
      question: 'What is the 40/60 fee model?',
      answer: 'RCK charges 40% of the fee as a fixed, time-billed baseline and puts the remaining 60% at risk against agreed outcomes. That 60% is unlocked only when the integration, carve-out, cost or synergy milestones are met and independently verified in your General Ledger. If the outcomes are missed, we forfeit that portion of our fee.',
    }),
    b('faq_item', {
      question: 'How are outcomes verified?',
      answer: 'Before work begins we lock a signed Baseline Schedule that defines each target and its measurement source. Achievement is then confirmed against source data in your own General Ledger and finance systems, and signed off by the deal sponsor — not self-reported by us. This removes ambiguity about whether value was actually realised.',
    }),
    b('faq_item', {
      question: 'What happens if the targets are not met?',
      answer: 'We forfeit the at-risk portion of our fee. Across representative engagements, roughly 85% hit 90%+ of target, about 10% land between 75–89%, and the remaining 5% fall below 75% — the band where we write off the outcome-linked fee entirely. Our downside is tied directly to yours.',
    }),
    b('faq_item', {
      question: 'How quickly can you deploy an interim CFO, COO or CIO?',
      answer: 'We identify a pre-vetted interim leader from our bench within 48 hours and typically deploy in Week 1. Pricing is published and all-in — roughly £8K–£25K per month depending on the role — with a replacement guarantee if a placement departs early.',
    }),
    b('faq_item', {
      question: 'What kinds of deals and situations do you work on?',
      answer: 'Post-merger integration, carve-outs and TSA execution, cost and value-creation programmes, restructuring and turnaround, and ERP / enterprise application transformation — most often for private-equity-backed portfolio companies. Detail on specific engagements is available under NDA.',
    }),
    b('faq_item', {
      question: 'Where is RCK based and where do you operate?',
      answer: 'RCK is headquartered in London with an office in Barcelona, and delivers execution across the UK, Europe and the UAE.',
    }),
  ],
})

const contact = b('contact_section', {
  anchor: 'contact-home',
  eyebrow: 'Get in touch',
  title: 'Ready to de-risk your next deal or transformation?',
  lede: 'Partner-led execution on a commercial model built around your outcomes, not our billable hours. Tell us where value is leaking; we’ll reply within one business day.',
  facts: [
    b('contact_fact', { label: 'London', text: '117 Piccadilly, Mayfair', link_label: '+44 7812 162288', link_url: 'tel:+447812162288' }),
    b('contact_fact', { label: 'Barcelona', text: 'Avenida Diagonal 317', link_label: '+34 671 77 9991', link_url: 'tel:+34671779991' }),
    b('contact_fact', { label: '', text: '', link_label: 'info@rckpm.es', link_url: 'mailto:info@rckpm.es' }),
  ],
  alt_text: 'Prefer to start with a quick read of your exposure?',
  alt_link_label: 'Take the Value-at-Risk Assessment',
  alt_link_url: '/diagnostics/value-at-risk',
  submit_label: 'Book an executive strategy call',
  success_title: 'Thank you, your request is in.',
  success_body: 'A partner will be in touch within one business day.',
})

// ---------------------------------------------------------------- write it up

const body = [hero, diff, dualTrack, proof, problem, modelTeaser, imageBand, twoPaths, assess, faq, contact]

const { stories } = await api('GET', '/stories?with_slug=home')
if (!stories.length) throw new Error('No story with slug "home" found in the space.')
const story = stories[0]

await api('PUT', `/stories/${story.id}`, {
  story: {
    name: 'Home',
    slug: 'home',
    content: {
      component: 'page',
      body,
      seo_title: '',
      seo_description: '',
    },
  },
  publish: 1,
})

console.log(`Home story seeded with ${body.length} sections and published.`)
