export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  googleFonts: {
    families: {
      'Plus+Jakarta+Sans': [400, 500, 600, 700, 800],
      'JetBrains+Mono': [400, 500],
    },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Arda Türker — CV',
      meta: [
        { name: 'description', content: 'Supply Chain Digitalisation Student & Developer' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark light' },
      ],
      htmlAttrs: { lang: 'en' },
    },
  },
})
