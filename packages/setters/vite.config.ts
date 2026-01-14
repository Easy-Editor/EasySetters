import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'dev',
  plugins: [react()],
  server: {
    port: 5002,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      generateScopedName: 'es-[local]-[hash:base64:5]',
    },
  },
})
