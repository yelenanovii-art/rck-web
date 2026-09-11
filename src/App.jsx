import { useEffect } from 'react'
import { useRoute } from './hooks/useRoute'
import { useReveal } from './hooks/useReveal'
import { useSeo } from './hooks/useSeo'
import { postFromPath } from './lib/posts'
import Post from './pages/Post'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import Advisory from './pages/Advisory'
import Platform from './pages/Platform'
import Assessment from './pages/Assessment'
import ReadinessScore from './pages/ReadinessScore'
import Calculator from './pages/Calculator'
import Contact from './pages/Contact'
import PartnerLedModel from './pages/PartnerLedModel'
import OutcomesVsAdvisory from './pages/OutcomesVsAdvisory'
import IntegratedInterim from './pages/IntegratedInterim'
import FounderBuiltPlaybooks from './pages/FounderBuiltPlaybooks'
import Team from './pages/Team'
import TransformationOutcomes from './pages/TransformationOutcomes'
import InterimManagement from './pages/InterimManagement'
import Playbook from './pages/Playbook'
import CaseStudies from './pages/CaseStudies'
import OutcomeCircle from './pages/OutcomeCircle'
import Insights from './pages/Insights'
import OurFirm from './pages/OurFirm'
import Privacy from './pages/Privacy'
import LegalNotice from './pages/LegalNotice'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import NotFound from './pages/NotFound'
import {
  DealAdvisoryCarveOuts,
  ValueCreationCostTransformation,
  RestructuringTurnaround,
  ErpEnterpriseApplications,
  ErpApplicationSiSelection,
  ErpProgrammeAssurance,
  ErpImplementation,
} from './pages/servicePages'

const ROUTES = {
  '/': Home,
  '/advisory': Advisory,
  '/contact': Contact,
  '/about/team': Team,
  '/about/our-firm': OurFirm,
  '/insights': Insights,
  '/case-studies': CaseStudies,
  '/privacy': Privacy,
  '/legal': LegalNotice,
  '/terms': Terms,
  '/cookies': CookiePolicy,
  // "Why RCK" content pages (consolidated from 6 → 4)
  '/about/partner-led-model': PartnerLedModel,
  '/about/outcomes-vs-advisory': OutcomesVsAdvisory,
  '/services/integrated-interim': IntegratedInterim,
  '/about/founder-built-playbooks': FounderBuiltPlaybooks,
  // Services
  '/services/transformation-outcomes': TransformationOutcomes,
  '/services/interim-management': InterimManagement,
  '/the-outcome-circle': OutcomeCircle,
  // Advisory & Transformation service pages
  '/services/deal-advisory-carve-outs': DealAdvisoryCarveOuts,
  '/services/value-creation-cost-transformation': ValueCreationCostTransformation,
  '/services/restructuring-turnaround': RestructuringTurnaround,
  '/services/erp-enterprise-applications': ErpEnterpriseApplications,
  '/services/erp/application-si-selection': ErpApplicationSiSelection,
  '/services/erp/programme-assurance': ErpProgrammeAssurance,
  '/services/erp/implementation': ErpImplementation,
  // Products & Diagnostics (relocated)
  '/products/transform-plus': Platform,
  '/diagnostics/deal-value-modeller': Calculator,
  '/diagnostics/value-at-risk': Assessment,
  '/diagnostics/readiness-score': ReadinessScore,
  '/resources/playbooks': Playbook,
}

// Old URLs redirected to their canonical page so nothing 404s.
const REDIRECTS = {
  '/about/why-smaller-beats-bigger': '/about/partner-led-model',
  '/services/outcomes-verification': '/about/outcomes-vs-advisory',
  '/outcome-circle': '/the-outcome-circle',
  // Phase 2/3 relocations
  '/transform-plus': '/products/transform-plus',
  '/calculator': '/diagnostics/deal-value-modeller',
  '/assessment': '/diagnostics/value-at-risk',
  '/resources/playbook': '/resources/playbooks',
  '/resources/case-studies': '/case-studies',
  '/about/partners': '/about/team',
  '/about/40-60-outcome-model': '/about/outcomes-vs-advisory',
  // Legal aliases → canonical legal pages
  '/legal-notice': '/legal',
  '/aviso-legal': '/legal',
  '/terms-of-use': '/terms',
  '/terms-and-conditions': '/terms',
  '/cookie-policy': '/cookies',
  '/privacy-policy': '/privacy',
}

export default function App() {
  const path = useRoute()
  const redirect = REDIRECTS[path]

  useEffect(() => {
    if (redirect) window.history.replaceState({}, '', redirect)
  }, [redirect])

  const activePath = redirect || path
  // Blog posts are the one dynamic route: /post/<slug> resolves against the
  // Markdown in src/content/posts/ rather than the static ROUTES table.
  const post = postFromPath(activePath)
  const known = Boolean(ROUTES[activePath]) || Boolean(post)
  useReveal(activePath)
  useSeo(activePath, known, post)

  const Page = ROUTES[activePath] || NotFound
  // The TRANSFORM+ page runs a darker, cooler theme.
  const theme = activePath === '/products/transform-plus' ? 'platform' : 'default'

  return (
    <div className={`app app--${theme}`}>
      <ScrollProgress />
      <Nav path={activePath} />
      <main id="top">
        {post ? <Post post={post} /> : <Page />}
      </main>
      <Footer path={activePath} />
      <CookieConsent />
    </div>
  )
}
