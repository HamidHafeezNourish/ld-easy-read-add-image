import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  base: '/ld-easy-read-add-image/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['vue'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
