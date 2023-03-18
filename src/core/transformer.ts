import { TransformResult } from 'unplugin'
import MagicString from 'magic-string'
import { Transform } from '../types'
import type { Context } from './context'
export const scriptRegex = /(<script[^>]*>)([\s\S]*)(<\/script>)/ig
export const templateRegex = /(<template>)([\s\S]*?)<\/template>/ig
export default function transformer(ctx: Context): Transform {
  return async (code: string) => {
    const s = new MagicString(code)
    const matches = Array.from(code.matchAll(scriptRegex))
    for (const match of matches) {
      const importMaps = ctx.importMaps.map(i => i.script).join('\n')
      s.appendRight(match[1].length, importMaps)
    }
    const templateMatches = Array.from(s.original.matchAll(templateRegex))
    for (const match of templateMatches) {
      const importMaps = `${match[2]}${ctx.importMaps.map(i => i.template).join('\n')}\n`
      const start = match.index! + match[1].length
      const end = start + match[2].length
      s.overwrite(start, end, importMaps)
    }
    const result: TransformResult = { code: s.toString() }
    return result
  }
}
