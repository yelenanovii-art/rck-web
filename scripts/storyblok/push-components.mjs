// Creates or updates every block in the RCK content model.
// Safe to re-run: existing blocks are updated in place, never duplicated.
import { api, pause } from './sb.mjs'
import { components, pageComponent } from './schema.mjs'

const { components: existing } = await api('GET', '/components/')
const byName = new Map(existing.map((c) => [c.name, c]))

const all = [...components, pageComponent]
let created = 0
let updated = 0

for (const def of all) {
  const current = byName.get(def.name)
  const payload = {
    component: {
      name: def.name,
      display_name: def.display_name,
      is_root: Boolean(def.is_root),
      is_nestable: def.is_nestable !== false,
      schema: def.schema,
    },
  }

  if (current) {
    await api('PUT', `/components/${current.id}`, payload)
    updated++
    console.log(`  updated  ${def.name}`)
  } else {
    await api('POST', '/components/', payload)
    created++
    console.log(`  created  ${def.name}`)
  }
  await pause()
}

console.log(`\nDone. ${created} created, ${updated} updated.`)
