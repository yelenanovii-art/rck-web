// Every Storyblok block, mapped to the React component that renders it.
// Adding a block: create the component, add it here, add it to the page
// whitelist in scripts/storyblok/schema.mjs.
import HeroHome from './HeroHome'
import DiffSection from './DiffSection'
import DualTrack from './DualTrack'
import ProofMetrics from './ProofMetrics'
import ProblemSection from './ProblemSection'
import ModelTeaser from './ModelTeaser'
import ImageBand from './ImageBand'
import TwoPaths from './TwoPaths'
import AssessInvite from './AssessInvite'
import FaqSection from './FaqSection'
import ContactSection from './ContactSection'
import Page from './Page'

export const storyblokComponents = {
  page: Page,
  hero_home: HeroHome,
  diff_section: DiffSection,
  dual_track: DualTrack,
  proof_metrics: ProofMetrics,
  problem_section: ProblemSection,
  model_teaser: ModelTeaser,
  image_band: ImageBand,
  two_paths: TwoPaths,
  assess_invite: AssessInvite,
  faq_section: FaqSection,
  contact_section: ContactSection,
}
