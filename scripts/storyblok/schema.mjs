// Storyblok content model for the RCK site.
//
// One block per section of the site. The React markup for each section is
// unchanged. These blocks only expose the text, numbers and links inside it,
// so editors can change copy without anyone touching JSX.

let p = 0
const pos = () => p++

const t = (display_name, o = {}) => ({ type: 'text', pos: pos(), display_name, ...o })
const area = (display_name, o = {}) => ({ type: 'textarea', pos: pos(), display_name, ...o })
const rich = (display_name, o = {}) => ({ type: 'richtext', pos: pos(), display_name, ...o })
const link = (display_name, o = {}) => ({ type: 'text', pos: pos(), display_name, description: 'Path like /advisory or a full URL', ...o })
const blocks = (display_name, whitelist, o = {}) => ({
  type: 'bloks',
  pos: pos(),
  display_name,
  restrict_components: true,
  component_whitelist: whitelist,
  ...o,
})

// ---------------------------------------------------------------- leaf blocks

export const components = [
  {
    name: 'diff_item',
    display_name: 'Comparison point',
    is_nestable: true,
    schema: { lead: t('Bold lead-in'), text: area('Text') },
  },
  {
    name: 'diff_stat',
    display_name: 'Headline stat',
    is_nestable: true,
    schema: { number: t('Number'), text: area('Caption') },
  },
  {
    name: 'track_card',
    display_name: 'Track card',
    is_nestable: true,
    schema: {
      tag: t('Tag'),
      title: t('Title'),
      meta_for: area('For'),
      meta_model: area('Model'),
      meta_timeline: area('Timeline'),
      body: area('Body'),
      link_label: t('Link label'),
      link_url: link('Link URL'),
    },
  },
  {
    name: 'stat_card',
    display_name: 'Stat card',
    is_nestable: true,
    schema: { value: t('Figure'), label: area('Label') },
  },
  {
    name: 'metrics_item',
    display_name: 'Metric row',
    is_nestable: true,
    schema: { number: t('Number'), heading: t('Heading'), text: area('Text') },
  },
  {
    name: 'metrics_col',
    display_name: 'Metrics column',
    is_nestable: true,
    schema: {
      tag: t('Tag'),
      title: t('Title'),
      items: blocks('Rows', ['metrics_item']),
    },
  },
  {
    name: 'numbered_card',
    display_name: 'Numbered card',
    is_nestable: true,
    schema: { number: t('Number'), title: t('Title'), text: area('Text') },
  },
  {
    name: 'path_card',
    display_name: 'Path card',
    is_nestable: true,
    schema: {
      mark: { type: 'option', pos: pos(), display_name: 'Logo mark', options: [
        { name: 'RCK mark', value: 'rck' },
        { name: 'TRANSFORM+ mark', value: 'transform' },
      ], default_value: 'rck' },
      variant: { type: 'option', pos: pos(), display_name: 'Style', options: [
        { name: 'Default', value: 'default' },
        { name: 'Platform (dark)', value: 'platform' },
      ], default_value: 'default' },
      tag: t('Tag'),
      title: t('Title'),
      body: area('Body'),
      bullets: blocks('Bullets', ['bullet']),
      cta_label: t('Button label'),
      cta_url: link('Button URL'),
      cta_style: { type: 'option', pos: pos(), display_name: 'Button style', options: [
        { name: 'Navy', value: 'btn-navy' },
        { name: 'Gold', value: 'btn-gold' },
      ], default_value: 'btn-navy' },
    },
  },
  {
    name: 'bullet',
    display_name: 'Bullet',
    is_nestable: true,
    schema: { text: area('Text') },
  },
  {
    name: 'faq_item',
    display_name: 'FAQ item',
    is_nestable: true,
    schema: { question: t('Question'), answer: area('Answer', { rows: 6 }) },
  },
  {
    name: 'contact_fact',
    display_name: 'Contact line',
    is_nestable: true,
    schema: {
      label: t('Bold label', { description: 'e.g. London. Leave empty for a plain line.' }),
      text: t('Text'),
      link_label: t('Link label', { description: 'e.g. +44 7812 162288' }),
      link_url: t('Link URL', { description: 'e.g. tel:+447812162288 or mailto:info@rckpm.es' }),
    },
  },
]

// ------------------------------------------------------------ section blocks

components.push(
  {
    name: 'hero_home',
    display_name: 'Hero (home)',
    is_nestable: true,
    schema: {
      positioning: t('Positioning line', {
        description: 'Renders as both the eyebrow and the H1, so they can never drift apart.',
      }),
      sub_bold: area('Subhead, bold opening'),
      sub_rest: area('Subhead, rest'),
      cta_primary_label: t('Primary button label'),
      cta_primary_url: link('Primary button URL'),
      cta_secondary_label: t('Secondary button label'),
      cta_secondary_url: link('Secondary button URL'),
      meta: t('Meta line under the buttons'),
      panel_model: t('Panel: model label'),
      panel_figure: t('Panel: big figure'),
      panel_caption: area('Panel: caption'),
      bar_base: t('Bar: retained share'),
      bar_out: t('Bar: at-risk share'),
      legend_base: t('Bar legend: left'),
      legend_out: t('Bar legend: right'),
    },
  },
  {
    name: 'diff_section',
    display_name: 'Differentiator',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: area('Title'),
      lede: area('Lede'),
      disclose_label: t('Show/hide label'),
      old_tag: t('Left column tag'),
      old_items: blocks('Left column points', ['diff_item']),
      rck_tag: t('Right column tag'),
      rck_items: blocks('Right column points', ['diff_item']),
      close_lead: t('Closing, bold lead-in'),
      close_text: area('Closing text'),
      foot_link_label: t('Footer link label'),
      foot_link_url: link('Footer link URL'),
      stats: blocks('Stats', ['diff_stat']),
      stat_note: area('Stat note'),
    },
  },
  {
    name: 'dual_track',
    display_name: 'Dual track',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      tab_labels: t('Mobile tab labels', { description: 'Comma separated, e.g. Track 1, Track 2' }),
      tracks: blocks('Tracks', ['track_card']),
    },
  },
  {
    name: 'proof_metrics',
    display_name: 'Proof and metrics',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      lede: area('Lede'),
      stats: blocks('Stat cards', ['stat_card']),
      columns: blocks('Columns', ['metrics_col']),
    },
  },
  {
    name: 'problem_section',
    display_name: 'Problem grid',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      lede: area('Lede'),
      cards: blocks('Cards', ['numbered_card']),
      note_lead: t('Note, bold lead-in'),
      note_text: area('Note text'),
    },
  },
  {
    name: 'model_teaser',
    display_name: 'Fee model teaser',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      lede: area('Lede'),
      link_label: t('Link label'),
      link_url: link('Link URL'),
    },
  },
  {
    name: 'image_band',
    display_name: 'Image band',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      image: { type: 'asset', pos: pos(), display_name: 'Image', filetypes: ['images'] },
      tone: { type: 'option', pos: pos(), display_name: 'Placeholder tone', options: [
        { name: 'Dark', value: 'dark' },
        { name: 'Light', value: 'light' },
      ], default_value: 'dark' },
      suggest: area('Art direction note', {
        description: 'Shown in the placeholder until a real image is uploaded.',
      }),
    },
  },
  {
    name: 'two_paths',
    display_name: 'Two paths',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      lede: area('Lede'),
      tab_labels: t('Mobile tab labels', { description: 'Comma separated' }),
      cards: blocks('Cards', ['path_card']),
    },
  },
  {
    name: 'assess_invite',
    display_name: 'Assessment invite',
    is_nestable: true,
    schema: {
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      body: area('Body'),
      cta_label: t('Button label'),
      cta_url: link('Button URL'),
    },
  },
  {
    name: 'faq_section',
    display_name: 'FAQ',
    is_nestable: true,
    schema: {
      anchor: t('Anchor id', { description: 'e.g. home-faq' }),
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      items: blocks('Questions', ['faq_item']),
    },
  },
  {
    name: 'contact_section',
    display_name: 'Contact block',
    is_nestable: true,
    schema: {
      anchor: t('Anchor id'),
      eyebrow: t('Eyebrow'),
      title: t('Title'),
      lede: area('Lede'),
      facts: blocks('Contact lines', ['contact_fact']),
      alt_text: t('Alternative prompt'),
      alt_link_label: t('Alternative link label'),
      alt_link_url: link('Alternative link URL'),
      submit_label: t('Form button label'),
      success_title: t('Form success title'),
      success_body: area('Form success body'),
    },
  }
)

// --------------------------------------------------------- the page container

export const pageComponent = {
  name: 'page',
  display_name: 'Page',
  is_root: true,
  is_nestable: false,
  schema: {
    body: blocks('Sections', [
      'hero_home',
      'diff_section',
      'dual_track',
      'proof_metrics',
      'problem_section',
      'model_teaser',
      'image_band',
      'two_paths',
      'assess_invite',
      'faq_section',
      'contact_section',
    ]),
    seo_title: t('SEO title', { description: 'Leave empty to use the route default.' }),
    seo_description: area('SEO description'),
  },
}
