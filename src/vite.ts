import type { Plugin } from 'vite'
import { Options } from './types'
import unplugin from '.'
export default unplugin.vite as (options?: Options | undefined) => Plugin
