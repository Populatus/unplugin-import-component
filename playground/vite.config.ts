import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ImportComponent from '@populatus/unplugin-import-component'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ImportComponent.vite({
      imports: [
        { path: 'src/components/HelloWorld.vue' },
        { path: 'src/components/a.vue' },
      ],
    }),
  ],
})
