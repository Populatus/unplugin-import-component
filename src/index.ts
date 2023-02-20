import { join } from 'path'
import { createFilter } from 'vite'
import type { FilterPattern, Plugin, ResolvedConfig } from 'vite'
import MagicString from 'magic-string'
import fse from 'fs-extra'

const NAME = 'vite-plugin-import-component'
const scriptRegex = /(<script[\s]+[^>]+=[\s]*[^>]+>)([\s\S]*?)(<\/script>)/ig
const templateRegex = /(<template>)([\s\S]*?)<\/template>/ig
export interface Options {
  /**
   * Directory for import component
   */
  path: string
  /**
   * Name for import component
   */
  name: string
  /**
   * Filter for modules to be imported
   */
  include?: FilterPattern
  /**
   * Filter for modules to be imported
   */
  exclude?: FilterPattern
}
export default function ImportComponent(options: Options): Plugin {
  const { path, include, exclude } = options
  if (!path) {
    return {
      name: NAME,
    }
  }
  let config: ResolvedConfig
  const filter = createFilter(include, exclude)
  return {
    name: NAME,
    enforce: 'pre',
    configResolved(_config) {
      config = _config
      const target = join(config.root, path)
      const file = fse.statSync(target)
      if (!file || !path.endsWith('.vue'))
        throw new Error('Not found the SFC in the path')
    },
    transform(code, id) {
      if (!filter(id)) return code
      if (id.endsWith('.vue')) {
        const s = new MagicString(code)
        const matches = Array.from(code.matchAll(scriptRegex))
        for (const match of matches) {
          const importMaps = `import ${options.name} from '${join(config.root, path)}';`
          s.appendRight(match[1].length, importMaps)
        }
        const templateMatches = Array.from(s.original.matchAll(templateRegex))
        for (const match of templateMatches) {
          const importMaps = `${match[2]}<${options.name}/>`
          const start = match.index! + match[1].length
          const end = start + match[2].length
          s.overwrite(start, end, importMaps)
        }
        return s.toString()
      }
      return code
    },
  }
}
