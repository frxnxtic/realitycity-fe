import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  root: './setup',
  build: {
    outDir: "C:\\Users\\denys\\cardRealicity\\build"
  },
  devServer: {
    Proxy: {
      '/api': {
        target: 'http://localhost:3000',
      }
    }},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./setup/src', import.meta.url))
    }
  }
})
