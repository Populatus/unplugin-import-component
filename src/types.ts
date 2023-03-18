import { TransformResult } from 'unplugin'
import type { FilterPattern } from '@rollup/pluginutils'

type Awaitable<T> = T | PromiseLike<T>

export type Imports = {
  path: string
}[]

export interface Options {
  imports: Imports
  include?: FilterPattern
  exclude?: FilterPattern
}

export type Transform = (code: string) => Awaitable<TransformResult>

export type ImportMap = {
  script: string
  template: string
}[]
