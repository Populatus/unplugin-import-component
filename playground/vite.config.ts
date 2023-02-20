import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ImportSFC from '@populatus/vite-plugin-import-sfc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ImportSFC({
      name: 'Helloword',
      path: 'src/components/HelloWorld.vue',
      exclude: ['src/components/*.vue'],
    }),
  ],
})
