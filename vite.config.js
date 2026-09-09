import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

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
const useHttps = process.env.RCK_HTTPS === '1'

export default defineConfig({
  base: '/',
  plugins: [react(), ...(useHttps ? [mkcert()] : [])],
  server: { port: 5180, strictPort: true, https: useHttps },
  preview: { port: 4180, strictPort: true },
})
