// Thin Storyblok Management API client used by the setup scripts.
// Reads credentials from .env.local so no token is ever committed.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())
const envPath = path.join(root, '.env.local')

if (!fs.existsSync(envPath)) {
  throw new Error('.env.local not found. It holds STORYBLOK_OAUTH_TOKEN and the space id.')
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    })
)

export const SPACE = env.STORYBLOK_SPACE_ID
const TOKEN = env.STORYBLOK_OAUTH_TOKEN
const BASE = 'https://mapi.storyblok.com/v1'

if (!SPACE || !TOKEN) throw new Error('STORYBLOK_SPACE_ID or STORYBLOK_OAUTH_TOKEN missing from .env.local')

export async function api(method, endpoint, body) {
  const res = await fetch(`${BASE}/spaces/${SPACE}${endpoint}`, {
    method,
    headers: { Authorization: TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    throw new Error(`${method} ${endpoint} -> ${res.status}\n${typeof data === 'string' ? data : JSON.stringify(data, null, 2)}`)
  }
  return data
}

// Storyblok rate-limits the Management API; a small pause keeps bulk runs safe.
export const pause = (ms = 350) => new Promise((r) => setTimeout(r, ms))
