import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
// v-data-tableなど開発段階のコンポーネントを使う場合（2023/03現在）
import * as labs from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs
    },
    theme: {
      defaultTheme: 'myCustomTheme',
      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            primary: '#2196f3',
            secondary: '#607d8b',
            accent: '#ffc107',
            error: '#f44336',
            warning: '#ff9800',
            info: '#cddc39',
            success: '#4caf50'
            }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})