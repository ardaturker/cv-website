export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/sitemap', 'nuxt-icon'],
  // TresJS renders <Tres*> and <primitive> through its own three.js renderer, not Vue's
  // DOM renderer, so the template compiler must not try to resolve them as components.
  // The @tresjs/nuxt module would normally set this up, but it pulls in @nuxt/ui v4
  // (and with it Tailwind v4), which conflicts with @nuxtjs/tailwindcss here.
  // TresCanvas is excluded: it is a real Vue component imported from @tresjs/core.
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        (tag.startsWith('Tres') && tag !== 'TresCanvas') || tag === 'primitive',
    },
  },
  components: [
    { path: '~/components', pathPrefix: false },
  ],
  googleFonts: {
    families: {
      'Plus+Jakarta+Sans': [400, 500, 600, 700, 800],
      'JetBrains+Mono': [400, 500],
      'Archivo+Narrow': [600, 700],
    },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://ardaturker.me',
    name: 'Arda Türker — CV',
  },
  sitemap: {
    strictNuxtContentPaths: false,
  },
  app: {
    head: {
      title: 'Arda Türker — CV',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark light' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logomark.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      htmlAttrs: { lang: 'en' },
    },
  },
})
