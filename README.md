# RCK — Outcome Partners (marketing site)

Standalone marketing site for **RCK**, a partner-led deal advisory & interim execution firm,
and its **TRANSFORM+** strategy-to-value execution platform.

> Completely independent project. Its own dependencies, build and git —
> it shares nothing with any other site in this workspace.

## Brand

Navy (`#152140`) + gold (`#b08d57`) on warm paper, with the **Direction C**
"verified-outcome" mark (an open ring completed by a checkmark — the mark is only
whole once the outcome is independently verified). Type: **Fraunces** (display) /
**Inter** (text).

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- Plain CSS with design tokens (`src/index.css`) + components/sections (`src/styles/site.css`)
- No UI framework, no router dependency — a tiny hash router (`src/hooks/useRoute.js`)
- Mobile-first and fully responsive; scroll-reveal + count-up, `prefers-reduced-motion` aware

## Develop

```bash
npm install      # first time only
npm run dev      # dev server → http://localhost:5180
npm run build    # production build → dist/
npm run preview  # preview the production build → http://localhost:4180
```

> Ports are pinned in `vite.config.js` (dev `5180`, preview `4180`) so this site
> never collides with the Aspire app, which uses Vite's default `5173`.

## Customer journey / structure

```
Home  (#/)                positioning → proof → problem → 40/60 model → two paths → results → CTA
 ├─▶ Deal Advisory        (#/advisory)        full service page — problem, model, comparison,
 │                                             practice areas, results, mobilisation timeline
 ├─▶ TRANSFORM+           (#/transform-plus)   platform — principles, module stack, intelligence,
 │                                             packages, benchmarking, Seal, CTA
 └─▶ Contact              (#/contact)          strategy-call form + offices + what to expect
```

```
src/
├── main.jsx                entry
├── App.jsx                 route table + shell (Nav / Footer / ScrollProgress)
├── index.css               design tokens, base type, buttons, utilities
├── styles/site.css         all component + section styles + responsive breakpoints
├── hooks/
│   ├── useRoute.js         dependency-free hash router
│   ├── useReveal.js        IntersectionObserver scroll reveal
│   └── useCountUp.js       count-up for stats
├── components/
│   ├── Logo.jsx            RCK wordmark + Mark (ring + check)
│   ├── TransformMark.jsx   TRANSFORM+ hexagon sibling mark
│   ├── Nav.jsx             sticky nav + animated mobile drawer
│   ├── Footer.jsx
│   ├── ScrollProgress.jsx  gold reading-progress bar
│   ├── SectionHead.jsx     eyebrow + title + lede
│   ├── FeeBar.jsx          the 40/60 fee visual
│   ├── Stat.jsx            animated statistic
│   ├── CTABand.jsx         closing call-to-action band
│   └── Icons.jsx
└── pages/
    ├── Home.jsx
    ├── Advisory.jsx
    ├── Platform.jsx
    └── Contact.jsx
```

## Wiring the forms (activate lead capture)

Every form — the home "Get in touch", the Contact page, the assessment gate, and the
Deal Value Modeller — submits through one place: `src/lib/submitForm.js`, which POSTs to
the endpoint in **`src/config.js`**. Until you set that endpoint, forms show the success
state without sending (safe for preview). To turn on real delivery:

1. Create a free form at **[formspree.io](https://formspree.io)** (New form → copy its
   endpoint, e.g. `https://formspree.io/f/abcdwxyz`).
2. Paste it into `src/config.js`:
   ```js
   export const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz'
   ```
   (or create a `.env` with `VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz`).
3. `npm run build` and redeploy. Submissions now email you, tagged with a `source`
   field (`contact-page`, `deal-readiness-quiz`, `deal-value-modeller`, …) plus each
   form's hidden context (deal size, readiness score, recommended path, etc.).

Prefer no account? Set `FORM_ENDPOINT` to `https://api.web3forms.com/submit` and put your
Web3Forms access key in `FORM_EXTRA` in `src/config.js`.

## Before launch — replace placeholders

- **Contact details** — office addresses, phone numbers and `info@rck-op.com` are placeholders.
- **Figures** are representative of anonymised engagements ("detail available under NDA"),
  carried over from the approved copy. Confirm before publishing.
- **Photos** — four `<Photo>` slots await real images (see `public/photos/README.md`).
- **Share preview** — after you have a final domain, set `og:image`/`og:url` in `index.html`
  to absolute URLs.

## Deploy

Static output. `npm run build`, then deploy `dist/` to any static host
(Vercel, Netlify, Cloudflare Pages, S3). `base: './'` in `vite.config.js` keeps
the build portable, so it works from any path.
