// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': { swr: true },
    },
    // prerender: {
    //   routes: ['/**'],
    // },
  },
})
