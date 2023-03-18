import { basename, join } from 'node:path'
import { ImportMap, Imports, Options } from '../types'
import { Context } from './context'

export function resolveOptions(ctx: Context, options: Options) {
  const { imports } = options
  ctx.importMaps = resolveImports(ctx, imports)
}
function resolveImports(ctx: Context, imports: Imports) {
  const importMaps: ImportMap = []
  for (const i of imports) {
    const { path } = i
    const name = basename(path, '.vue').toLocaleUpperCase()
    importMaps.push({
      script: `import ${name} from '${join(ctx.root, path)}';`,
      template: `<${name}/>`,
    })
  }
  return importMaps
}
