// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
      }
    ],
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: [300, 500, 600],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
      }
    }],
    "@nuxt/icon"
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui',
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})