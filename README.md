# unplugin-import-component

[![NPM version](https://img.shields.io/npm/v/@populatus/unplugin-import-component?color=a1b858&label=)](https://www.npmjs.com/package/@populatus/unplugin-import-component)

 unplugin that allows you to import vue components

## Install

```bash
npm i -D unplugin-import-component
```

### vite

Add plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import ImportSFC from '@populatus/unplugin-import-component'

export default {
  plugins: [
    ImportComponent.vite({
      imports: [{ path: 'src/components/HelloWorld.vue' }, { path: 'src/components/a.vue' }],
    }),
  ],
}
```

The sfc automatically insert to your vue modules.

## License

[MIT](./LICENSE) License © 2023 [Populatus](https://github.com/populatus)
