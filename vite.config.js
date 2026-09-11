import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' — required for clean History-API URLs with nested paths
// (e.g. /about/team), so asset references resolve from the domain root.
//
// Dedicated ports so this site never collides with the Aspire app (5173).
//
// HTTPS is OPT-IN via `RCK_HTTPS=1` (e.g. for Storyblok's Visual Editor, which
// refuses a plain-http preview in its iframe). It's off by default because the
// build's prerender step (scripts/prerender.mjs) runs `vite preview` and
// health-checks it over http — mkcert on preview would serve https and the
// prerender would hang ("preview server did not start"). Run `RCK_HTTPS=1 npm
// run dev` when you need the trusted local cert; macOS asks for your password
// once to trust it, then never again.
//
// vite-plugin-mkcert is imported dynamically, and only when RCK_HTTPS=1: it
// pulls in undici, which requires Node >= 22 and throws on import under Node
// 20 ("webidl.util.markAsUncloneable is not a function"). A static import here
// would run that on every `vite dev`/`vite build`, breaking the default
// http path — including Netlify, which builds on Node 20 (netlify.toml).
const useHttps = process.env.RCK_HTTPS === '1'

export default defineConfig(async () => {
  const httpsPlugins = useHttps
    ? [(await import('vite-plugin-mkcert')).default()]
    : []

  return {
    base: '/',
    plugins: [react(), ...httpsPlugins],
    server: { port: 5180, strictPort: true, https: useHttps },
    preview: { port: 4180, strictPort: true },
  }
})
