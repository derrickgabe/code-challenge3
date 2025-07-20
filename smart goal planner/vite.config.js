import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/code-challenge3/',
  build: {
    outDir: 'dist'
  }
})