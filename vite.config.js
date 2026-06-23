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
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ],
        categories: ['utilities', 'lifestyle'],
        shortcuts: [
          {
            name: 'Book Service',
            short_name: 'Book',
            description: 'Book a vehicle service',
            url: '/book',
            icons: [{ src: 'favicon.svg', sizes: 'any' }]
          },
          {
            name: 'My Bookings',
            short_name: 'Bookings',
            description: 'View your booking history',
            url: '/history',
            icons: [{ src: 'favicon.svg', sizes: 'any' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  preview: {
    allowedHosts: ['autocarepro-p0nd.onrender.com']
  }
})
