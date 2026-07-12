import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward any request starting with /api to the Flask backend (dev only).
    // Lets the frontend call fetch('/api/...') with no CORS or hardcoded host.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
