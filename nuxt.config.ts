// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=500, initial-scale=1',
      title: 'Nuxt 3',
      meta: [
        { name: 'description', content: 'Nuxt 3' } // ~ <meta name="description" content="Nuxt 3">
      ]
    }
  },
  css: ['@/assets/scss/main.scss']
});
