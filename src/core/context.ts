import { ImportMap, Options } from '../types'
import transformer from './transformer'
import { resolveOptions } from './resolve'
export class Context {
  options: Options
  root = process.cwd()
  importMaps: ImportMap
  constructor(options: Options) {
    this.options = options
    this.importMaps = []
    resolveOptions(this, options)
  }

  setRoot(root: string) {
    this.root = root
  }

  transform(code: string) {
    return transformer(this)(code)
  }
}
