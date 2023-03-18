import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { ResolvedConfig } from 'vite'
import { Options } from '../types'
import { Context } from './context'

export default createUnplugin<Options>((options: Options) => {
  const filter = createFilter(
    options.include || ['src/**/*.vue'],
    options.exclude || ['src/components/*.vue'],
  )
  const ctx: Context = new Context(options)
  return {
    name: 'unplugin-import-component',
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    async transform(code) {
      try {
        const result = await ctx.transform(code)
        return result
      }
      catch (e) {
        this.error(e)
      }
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        ctx.setRoot(config.root)
      },
    },
  }
})

