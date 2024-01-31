import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-products-app/',
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      external: ['vuex'], // Add 'vuex' to the external array
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
