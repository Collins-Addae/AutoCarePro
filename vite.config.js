import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg', 'hero.png', '*.jpg', '*.jpeg', '*.png', '*.avif', '*.jfif'],
      manifest: {
        name: 'AutoCare Pro',
        short_name: 'AutoCare',
        description: 'Professional on-demand vehicle care in Ghana. Book verified technicians to your location.',
        theme_color: '#1A56DB',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  preview: {
    allowedHosts: ['autocarepro-p0nd.onrender.com']
  }
})
