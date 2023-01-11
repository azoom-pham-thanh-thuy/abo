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
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap'
        }
      ]
    }
  },
  css: ['@/assets/scss/main.scss'],
  modules: ['@vuestic/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/utils/_mixins.scss";
          `
        }
      }
    }
  }
});
