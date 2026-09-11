import { useEffect } from 'react'
import { SITE_URL } from '../config'

// Per-route <title>, meta description, canonical URL and Open Graph URL.
// Each route is a real crawlable path with prerendered static HTML, so these
// tags are baked in for both crawlers and social/AI link-preview bots.
const META = {
  '/': {
    t: 'Strategic Transformation, M&A Advisory & Interim Leadership',
    d: '40% fixed + 60% outcome-at-risk fee model. Partner-led execution where results drive revenue. 85%+ hit target outcomes.',
  },
  '/advisory': {
    t: 'Deal Advisory & Interim Execution',
    d: 'The 40/60 risk-share model: senior partners in direct operational control, with 60% of our fee tied to independently verified milestones.',
  },
  '/products/transform-plus': {
    t: 'TRANSFORM+ — Strategy-to-Value Execution Platform',
    d: 'An independently verifiable trail from deal thesis to realised EBITDA — stage-gate controls and a cryptographically sealed audit trail at every decision point.',
  },
  '/diagnostics/value-at-risk': {
    t: 'Value-at-Risk Assessment',
    d: 'Answer six quick questions and get a tailored Value-at-Risk report — your recommended path, where to focus first, and a mobilisation plan.',
  },
  '/diagnostics/readiness-score': {
    t: 'RCK Readiness Score',
    d: 'A free Value-at-Risk diagnostic: six questions read your organisation against the Adizes corporate lifecycle across four mandate tracks to show where value creation is under pressure.',
  },
  '/diagnostics/deal-value-modeller': {
    t: 'Deal Value Modeller',
    d: 'Model the value at stake, how much of our fee is actually at risk, and what waiting is costing you — built around the 40/60 risk-share model.',
  },
  '/contact': {
    t: 'Contact',
    d: 'Tell us where value is leaking. A partner will respond within one business day to arrange a strategy call.',
  },
  '/about/team': {
    t: 'The Partners',
    d: 'Meet the named partners who lead every RCK engagement: senior operators with M&A, carve-out and PMI track records, personally accountable for your outcomes.',
  },
  '/services/transformation-outcomes': {
    t: 'Transformation Outcomes: PMI & Value Creation',
    d: 'PMI, cost transformation, carve-outs and revenue synergy on the 40/60 model, verified as realised value in your GL. 85%+ hit target.',
    k: 'transformation outcomes, PMI, cost transformation, value creation',
  },
  '/services/interim-management': {
    t: 'Board-Ready Interim CxO Leadership',
    d: 'Battle-tested interim CFO, COO, CIO/CTO and CTrO deployed in operational control within 72 hours, on milestone-based compensation. Published £8K–£25K/month all-in.',
    k: 'interim management, interim CFO, interim COO, interim CIO, CTrO, CxO bench',
  },
  '/resources/playbooks': {
    t: 'The Outcomes-Based PMI Playbook (Free PDF)',
    d: 'The operating playbook behind our 40/60 engagements: baseline outcomes, verify them in the GL, and structure fee against realised value.',
    k: 'PMI playbook, post-merger integration, outcomes-based',
  },
  '/case-studies': {
    t: 'Case Studies: Verified M&A Outcomes',
    d: 'Representative, anonymised engagements, each measured in the client’s ledger and independently verified. Detail available under NDA.',
    k: 'case studies, M&A results, verified outcomes',
  },
  '/the-outcome-circle': {
    t: 'The Outcome Circle™',
    d: 'An invitation-only collective of 200+ battle-tested Interim CxOs and PE deal operators executing under shared 40/60 outcome-contingent terms.',
    k: 'interim CxO, fractional, transformation director, PE operators, invitation-only',
  },
  '/services/deal-advisory-carve-outs': {
    t: 'Deal Advisory & Carve-Outs',
    d: 'Pre-deal operational diligence to flawless Day-1 separation and TSA exit, on the 40/60 model with 60% of fees at risk against milestone-locked cutover.',
    k: 'deal advisory, carve-outs, TSA, Day-1 separation, operational diligence',
  },
  '/services/value-creation-cost-transformation': {
    t: 'Value Creation & Cost Transformation',
    d: 'Operational restructuring and OPEX optimization verified in your General Ledger. 60% of fees contingent on EBITDA, SG&A and synergy baselines.',
    k: 'value creation, cost transformation, OPEX, PMI, synergy, EBITDA',
  },
  '/services/restructuring-turnaround': {
    t: 'Restructuring & Operational Turnaround',
    d: 'Rapid liquidity stabilization, cash governance and operational recovery. Managing Partners and in-seat COOs deployed within 72 hours.',
    k: 'restructuring, turnaround, working capital, distressed, interim COO',
  },
  '/services/erp-enterprise-applications': {
    t: 'ERP & Enterprise Applications: Selection to Delivery',
    d: 'Independent, vendor-neutral enterprise application delivery from SI selection to Day-1 cutover, under the 40/60 model with fees at risk against milestones.',
    k: 'ERP, system integrator, SI selection, programme assurance, implementation',
  },
  '/services/erp/application-si-selection': {
    t: 'Application & System Integrator Selection',
    d: 'Vendor-neutral platform and integrator selection before capital is committed. No reseller or SI partnerships, so advice is driven by fit and total cost.',
    k: 'ERP selection, system integrator, SAP, Oracle, NetSuite, Dynamics',
  },
  '/services/erp/programme-assurance': {
    t: 'Client-Side ERP Programme Assurance',
    d: 'Independent client-side assurance of scope, cost, timeline and cutover readiness, with the seniority to escalate to the board before a milestone slips.',
    k: 'ERP assurance, programme governance, SI governance, cutover readiness',
  },
  '/services/erp/implementation': {
    t: 'ERP Implementation & Delivery Services',
    d: 'In-seat delivery leadership through cutover and stabilisation: interim programme directors, functional and data leads on milestone-linked terms.',
    k: 'ERP implementation, cutover, hypercare, data migration, interim delivery',
  },
  // Section 2 — "Why RCK" content pages (titles/descriptions per spec)
  '/about/partner-led-model': {
    t: 'Why Partner-Led Beats the Matrix Model',
    d: 'Partner-led vs matrix structure: how 7 named partners outperform 350-person firms on accountability, speed and outcomes.',
    k: 'partner-led, matrix, accountability, boutique vs big firm',
  },
  '/about/outcomes-vs-advisory': {
    t: 'The 40/60 Fee Model & How Outcomes Are Verified',
    d: "RCK's 40% fixed + 60% outcome-at-risk model, verified in your GL with CFO or auditor sign-off. Why fee alignment changes outcomes.",
    k: 'outcome-at-risk, fee model, GL verification, CFO sign-off',
  },
  '/services/integrated-interim': {
    t: 'Why Interim Should Be Integrated',
    d: 'One firm for PMI + interim leadership. Eliminate coordination gaps. Hit 85%+ of targets.',
    k: 'interim, PMI, integration',
  },
  '/about/founder-built-playbooks': {
    t: 'Founder-Built vs Consultant Playbooks',
    d: 'Our playbooks are written by operators who executed them 20+ times. Not templates, not theory.',
    k: 'playbooks, founder',
  },
  '/insights': {
    t: 'Insights & Thought Leadership',
    d: 'M&A diligence, carve-outs & TSAs, the 40/60 model, ERP governance and interim management, written by operators who executed it.',
    k: 'M&A insights, carve-outs, TSA, 40/60 model, ERP governance',
  },
  '/about/our-firm': {
    t: 'Our Firm & Story',
    d: 'RCK was founded on one principle: eliminate junior consulting pyramids in favour of in-seat partner execution. Operating across London, Barcelona and EMEA.',
    k: 'about RCK, our firm, London, Barcelona, EMEA, partner-led',
  },
  '/privacy': {
    t: 'Privacy Policy',
    d: 'How RCK Outcome Partners collects, uses and protects your personal data, and your rights under the GDPR and Spanish data-protection law (LOPDGDD).',
  },
  '/legal': {
    t: 'Legal Notice',
    d: 'Company identification and website terms for RCK Programme Methods S.L., trading as RCK Outcome Partners, published under Spanish Law 34/2002 (LSSI-CE).',
  },
  '/terms': {
    t: 'Terms of Use',
    d: 'The terms on which you may use the RCK Outcome Partners website, including permitted use, intellectual property and limitation of liability.',
  },
  '/cookies': {
    t: 'Cookie Policy',
    d: 'What RCK Outcome Partners stores on your device, why, and how to change or withdraw your cookie choice at any time.',
  },
}

// One title template for the whole site (TASK-28): META holds the bare page
// name; the hook appends this suffix so every tab, bookmark and SERP entry ends
// in the identical brand string, and any new page inherits it automatically.
const BRAND_SUFFIX = ' | RCK Outcome Partners'

const OG_IMAGE = SITE_URL + '/og.png'
const ORG_ID = SITE_URL + '/#organization'
const SITE_ID = SITE_URL + '/#website'
const SITE_PUBLISHED = '2026-01-15'
const SITE_MODIFIED = '2026-08-01' // bump on major content changes

// Page-scoped JSON-LD injected by individual pages (FAQPage on home, the Person
// list on the team page). Each is owned by exactly one route. Because the SPA
// shell (and any host 404 fallback) is served for unmatched/not-yet-prerendered
// URLs, a stale copy of one of these can ride along on the wrong page — a
// structured-data/visible-content mismatch. useSeo strips any whose owner isn't
// the current route. Child effects run before this parent effect, so the owner
// page keeps the copy its own component just injected.
const PAGE_SCHEMA_OWNERS = {
  'home-faq-schema': '/',
  'rck-team-schema': '/about/team',
}

// Editorial / thought-leadership pages get og:type=article.
const ARTICLE_PATHS = new Set([
  '/about/partner-led-model',
  '/about/outcomes-vs-advisory',
  '/about/founder-built-playbooks',
  '/services/integrated-interim',
])

// Readable names for the final breadcrumb crumb.
const SEG_NAME = {
  advisory: 'Deal Advisory', team: 'The Partners', 'our-firm': 'Our Firm',
  'partner-led-model': 'Partner-Led Model', 'outcomes-vs-advisory': 'The 40/60 Model',
  'integrated-interim': 'Integrated Interim', 'founder-built-playbooks': 'Founder-Built Playbooks',
  'transformation-outcomes': 'Transformation Outcomes', 'interim-management': 'Interim Leadership',
  'transform-plus': 'TRANSFORM+', 'deal-value-modeller': 'Deal Value Modeller',
  'value-at-risk': 'Value-at-Risk Assessment', playbooks: 'Founder-Built Playbooks',
  'deal-advisory-carve-outs': 'Deal Advisory & Carve-Outs',
  'value-creation-cost-transformation': 'Value Creation & Cost Transformation',
  'restructuring-turnaround': 'Restructuring & Turnaround',
  'erp-enterprise-applications': 'ERP & Enterprise Applications',
  'application-si-selection': 'Application & SI Selection',
  'programme-assurance': 'Programme Assurance', implementation: 'Implementation',
  'the-outcome-circle': 'The Outcome Circle™', 'case-studies': 'Case Studies',
  insights: 'Insights', contact: 'Contact', privacy: 'Privacy Policy',
  legal: 'Legal Notice', terms: 'Terms of Use', cookies: 'Cookie Policy',
}

function setMeta(key, value, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector(sel)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function crumbName(path) {
  const seg = path.split('/').filter(Boolean).pop()
  return SEG_NAME[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function webpageType(path) {
  if (path === '/contact') return 'ContactPage'
  if (path === '/about/our-firm' || path === '/about/team') return 'AboutPage'
  if (path === '/insights' || path === '/case-studies') return 'CollectionPage'
  return 'WebPage'
}

function buildGraph(path, m, url) {
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': url + '#breadcrumb',
    itemListElement:
      path === '/'
        ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }]
        : [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: crumbName(path), item: url },
          ],
  }
  const webpage = {
    '@type': webpageType(path),
    '@id': url + '#webpage',
    url,
    name: m.t,
    description: m.d,
    inLanguage: 'en-GB',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    breadcrumb: { '@id': url + '#breadcrumb' },
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
  }
  const graph = [breadcrumb, webpage]
  if (path.startsWith('/services/')) {
    graph.push({
      '@type': 'Service',
      '@id': url + '#service',
      name: crumbName(path),
      serviceType: crumbName(path),
      description: m.d,
      provider: { '@id': ORG_ID },
      areaServed: ['GB', 'ES', 'EU'],
      url,
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function useSeo(path, known = true) {
  useEffect(() => {
    const m = META[path] || META['/']
    const url = SITE_URL + (path === '/' ? '/' : path)
    const isArticle = ARTICLE_PATHS.has(path)

    document.title = (known ? m.t : 'Page Not Found') + BRAND_SUFFIX
    setMeta('description', known ? m.d : 'The page you are looking for could not be found.')
    setMeta('keywords', (known && m.k) || '')
    setMeta('robots', known ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow')

    setLink('canonical', url)
    setLink('alternate', url, 'en-GB')
    setLink('alternate', url, 'x-default')

    setMeta('og:url', url, 'property')
    setMeta('og:type', isArticle ? 'article' : 'website', 'property')
    setMeta('og:title', document.title, 'property')
    setMeta('og:description', known ? m.d : '', 'property')
    setMeta('twitter:title', document.title)
    setMeta('twitter:description', known ? m.d : '')
    if (isArticle) {
      setMeta('article:published_time', SITE_PUBLISHED, 'property')
      setMeta('article:modified_time', SITE_MODIFIED, 'property')
    }

    setJsonLd('rck-page-schema', buildGraph(path, m, url))

    // Strip page-scoped schema that belongs to a different route.
    for (const [id, owner] of Object.entries(PAGE_SCHEMA_OWNERS)) {
      if (path !== owner) document.getElementById(id)?.remove()
    }
  }, [path, known])
}
