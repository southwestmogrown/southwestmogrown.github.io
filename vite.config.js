import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// Copies index.html → 404.html so GitHub Pages can serve the SPA for any path
const spaFallback = {
  name: 'spa-github-pages-fallback',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html')
  },
}

export default defineConfig({
  plugins: [react(), spaFallback],
  base: '/',
})
