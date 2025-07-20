// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/code-challenge3/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }
})