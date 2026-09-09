// Points the Visual Editor at the local dev server.
import { api } from './sb.mjs'

const URL = process.argv[2] || 'https://localhost:5180/'

const { space } = await api('GET', '/')
console.log('before:', space.domain || '(none)')

await api('PUT', '/', { space: { domain: URL } })

const { space: after } = await api('GET', '/')
console.log('after :', after.domain)
