export default defineNuxtConfig ({
  ssr: false,
  srcDir: 'src/',
  css: [
    'vuetify/lib/styles/main.sass',
    'mdi/css/materialdesignicons.min.css', // Vuetifyアイコン用
    '@mdi/font/css/materialdesignicons.css' // Vuetifyアイコン用
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
      'window.global': {} // amplify使用時はこれがないとrun devが失敗する
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser' // amplify使用時はこれがないとbuildが失敗する
      }
    }
  }
})
