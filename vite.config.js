import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import manifest from "./manifest.json"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const rapidapiKey = env.RAPIDAPI_KEY || ''
  const rapidapiHost = env.RAPIDAPI_HOST || 'weatherapi-com.p.rapidapi.com'

  const proxyTarget = 'https://weatherapi-com.p.rapidapi.com'

  const forecastProxy = {
    '/api/forecast': {
      target: proxyTarget,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/forecast/, '/forecast.json'),
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          proxyReq.setHeader('x-rapidapi-key', rapidapiKey)
          proxyReq.setHeader('x-rapidapi-host', rapidapiHost)
        })
      },
    },
  }

  const forecastValidator = {
    name: 'forecast-validator',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/forecast')) {
          if (req.method !== 'GET') {
            res.writeHead(405, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Método no permitido' }))
          }
          const url = new URL(req.url, 'http://localhost')
          const q = (url.searchParams.get('q') || '').trim()
          const daysRaw = url.searchParams.get('days')
          if (!q || q.length > 100 || !/^[\p{L}\p{N}\s,.'()-]+$/u.test(q)) {
            res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Parámetro q no válido' }))
          }
          const days = daysRaw === null ? 3 : Number(daysRaw)
          if (!Number.isInteger(days) || days < 1 || days > 3) {
            res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Parámetro days no válido' }))
          }
          url.search = `q=${encodeURIComponent(q)}&days=${days}&aqi=yes&alerts=yes`
          req.url = url.pathname + url.search
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/forecast')) {
          if (req.method !== 'GET') {
            res.writeHead(405, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Método no permitido' }))
          }
          const url = new URL(req.url, 'http://localhost')
          const q = (url.searchParams.get('q') || '').trim()
          const daysRaw = url.searchParams.get('days')
          if (!q || q.length > 100 || !/^[\p{L}\p{N}\s,.'()-]+$/u.test(q)) {
            res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Parámetro q no válido' }))
          }
          const days = daysRaw === null ? 3 : Number(daysRaw)
          if (!Number.isInteger(days) || days < 1 || days > 3) {
            res.writeHead(400, { 'content-type': 'application/json; charset=utf-8' })
            return res.end(JSON.stringify({ error: 'Parámetro days no válido' }))
          }
          url.search = `q=${encodeURIComponent(q)}&days=${days}&aqi=yes&alerts=yes`
          req.url = url.pathname + url.search
        }
        next()
      })
    },
  }

  return {
    plugins: [
      forecastValidator,
      react(),
      VitePWA({
        manifest,
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        devOptions: {
          enabled: false,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,webmanifest}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'open-meteo-runtime',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 7 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /^https:\/\/geocoding-api\.open-meteo\.com\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'geocoding-runtime',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 7 * 24 * 60 * 60,
                },
              },
            },
          ],
        },
      }),
    ],
    server: { proxy: forecastProxy },
    preview: { proxy: forecastProxy },
  }
})
