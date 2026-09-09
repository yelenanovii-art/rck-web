# Storyblok setup

The site's content lives in the Storyblok space **RCK PM** (EU region).
Section markup stays in React; Storyblok holds the words.

## Running it

```bash
npm run dev
```

The dev server runs on **https://localhost:5180** (HTTPS is required, the
Visual Editor will not load an http:// page in its iframe). The first run
asks for your macOS password once so `mkcert` can trust a local certificate.
After that it never asks again.

With the dev server running, open the Home story in Storyblok. The page
appears in the editor and every section is click-to-edit.

## How it fits together

| Piece | Where |
|---|---|
| Block components | `src/blocks/` |
| Block to component map | `src/blocks/index.js` |
| SDK setup, draft vs published | `src/storyblok.js` |
| Content model definition | `scripts/storyblok/schema.mjs` |
| Push the model to Storyblok | `node scripts/storyblok/push-components.mjs` |
| Seed the Home copy | `node scripts/storyblok/seed-home.mjs` |
| Preview URL | `node scripts/storyblok/set-preview-url.mjs <url>` |

Credentials live in `.env.local`, which is gitignored.

## Adding a section

1. Add the block to `scripts/storyblok/schema.mjs` and to the `page`
   whitelist at the bottom of that file.
2. Run `node scripts/storyblok/push-components.mjs`.
3. Create the matching component in `src/blocks/` and register it in
   `src/blocks/index.js`.

## Verifying a migrated page

`scripts/verify/` renders the old hardcoded page and the new Storyblok one
to static HTML and diffs them. The homepage currently comes out byte for
byte identical, apart from one deliberate typo fix (a stray space before a
comma in the Deal Advisory card).

## Before deploying

Netlify does not see `.env.local`. Set an environment variable in the
Netlify UI:

```
VITE_STORYBLOK_TOKEN = <the PUBLIC token from Space Settings > Access Tokens>
```

Use the **public** token in production, not the preview one. The preview
token exposes unpublished drafts.

The build prerenders each route in headless Chrome, so the build now needs
the Storyblok API to be reachable at build time.
