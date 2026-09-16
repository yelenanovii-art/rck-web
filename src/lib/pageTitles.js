// Canonical short display titles for internal pages, keyed by path. The "See
// also" module (and any related-content component) derives its label from here,
// so an internal link only needs an `href` — there's no separate lowercase
// label to drift out of sync with the nav/H1 (P3-4 / TASK-26).
const TITLES = {
  '/': 'Home',
  '/advisory': 'Deal Advisory & Interim Execution',
  '/about/partner-led-model': 'Why Partner-Led Beats Matrix',
  '/approach/40-60-fee-model': 'The RCK Outcome Fee Model',
  '/about/team': 'Meet the Partners',
  '/about/our-firm': 'Our Firm',
  '/about/founder-built-playbooks': 'Founder-Built Playbooks',
  '/services/integrated-interim': 'Why Interim Should Be Integrated',
  '/services/interim-management': 'Interim Leadership',
  '/services/transformation-outcomes': 'Transformation Outcomes',
  '/services/deal-advisory-carve-outs': 'Deal Advisory & Carve-Outs',
  '/services/value-creation-cost-transformation': 'Value Creation & Cost Transformation',
  '/services/restructuring-turnaround': 'Restructuring & Turnaround',
  '/services/erp-enterprise-applications': 'ERP & Enterprise Applications',
  '/products/transform-plus': 'TRANSFORM+',
  '/diagnostics/value-at-risk': 'Value-at-Risk Assessment',
  '/diagnostics/readiness-score': 'RCK Readiness Score',
  '/diagnostics/deal-value-modeller': 'Deal Value Modeller',
  '/resources/playbooks': 'Outcomes-Based PMI Playbook',
  '/case-studies': 'Case Studies',
  '/insights': 'Insights',
  '/the-outcome-circle': 'The Outcome Circle™',
  '/contact': 'Contact',
}

export function pageTitle(href) {
  return TITLES[href] || null
}
