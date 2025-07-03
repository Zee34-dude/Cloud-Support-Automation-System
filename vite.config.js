import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
       svgr({
      // recommended: only enable for explicit imports like `import Icon from './icon.svg?component'`
      svgrOptions: { icon: true }
    })
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
