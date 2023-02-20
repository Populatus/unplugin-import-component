# vite-plugin-import-sfc

[![NPM version](https://img.shields.io/npm/v/@populatus/vite-plugin-import-sfc?color=a1b858&label=)](https://www.npmjs.com/package/@populatus/vite-plugin-import-sfc)

Vite plugin that allows you to automatically import sfc component

## Install

```bash
npm i -D vite-plugin-import-sfc
```

Add plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import ImportSFC from '@populatus/vite-plugin-import-sfc'

export default {
  plugins: [
    ImportSFC({
      path: '',
      name: '',
      include: [],
      exclude: [],
    }),
  ],
}
```

The sfc automatically insert to your vue modules.

## License

[MIT](./LICENSE) License © 2023 [Populatus](https://github.com/populatus)
