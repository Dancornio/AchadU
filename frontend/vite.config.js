import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg'], // ajuste se tiver favicon próprio
      manifest: {
        name: 'AchadU',
        short_name: 'AchadU',
        description: 'Achados e perdidos do campus',
        theme_color: '#111827',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          // Exemplo de cache para a logo remota usada no Footer
          {
            urlPattern: /^https:\/\/academico\.undf\.edu\.br\/miolo20\/cliente\/iReport\/basic\/images\/logopequeno\.png$/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'undf-logo' }
          }
        ]
      }
    })
  ],
})
