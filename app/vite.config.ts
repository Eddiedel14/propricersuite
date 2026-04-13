import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Harmony uses `@media (max-width: var(--breakpoint-md))`; LightningCSS minify rejects var() in media queries.
    cssMinify: false,
  },
})
