// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify from 'vite-plugin-vuetify';

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
  css: ['@/assets/scss/main.scss', 'vuetify/styles'],
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        config.plugins?.push(vuetify())
      );
    }
  ],
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
