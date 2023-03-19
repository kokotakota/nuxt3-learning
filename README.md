# 構築
## Nuxtプロジェクト、TypeScript
```
npx nuxi init ${プロジェクト名}
yarn add -D typescript @types/node @nuxtjs/eslint-config eslint
```

nuxt.config.ts
```
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  }
})
```

VS Code 拡張
エディタでの型サポートを有効にするため、Volarをインストールする

## ESLint
```
touch .eslintrc
```
```
{
  "extends": [
    "@nuxtjs/eslint-config-typescript"
  ]
}
```
```
touch .prettierignore
```
```
# プロジェクト内のすべてのファイルをPrettierの対象外にする
**
```

package.json
```
{
  "scripts": {
      "dev": "nuxi dev",
      "build": "nuxi build",
      "generate": "nuxi generate",
      "preview": "nuxi preview",
      "postinstall": "nuxi prepare",
      "typecheck": "nuxi typecheck",
      "lint": "eslint --ext .ts,.js,.vue ."
  }
}
```

## SPAの設定
nuxt.config.ts
```
export default defineNuxtConfig({
  ssr: false
})
```

## ソースディレクトリ設定
nuxt.config.ts
```
export default defineNuxtConfig({
  srcDir: 'src/'
})
```
以下をsrcディレクトリに移動する
```
app.vue
assets
components
composables
layouts
middleware
pages
plugins
utils
```

## Vuetify導入
```
yarn add vuetify@next mdi
yarn add -D @mdi/font
yarn add -D sass
```
※mdiはアイコンを使用する場合に必要

/plugins/vuetify.ts
```
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components
  })
  nuxtApp.vueApp.use(vuetify)
})
```

nuxt.config.ts
```
export default defineNuxtConfig ({
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
    }
  }
})
```

## dayjs導入
```
yarn add dayjs
```

plugins/dayjs.ts
```
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { defineNuxtPlugin } from '#app'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dayjs', dayjs)
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs
 }
}
```

## Amplifyを使用する場合
amplify.yml
```
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - yarn install
    build:
      commands:
        - yarn generate
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

nuxt.config.ts
```
export default defineNuxtConfig ({
  vite: {
    define: {
      'window.global': {} // amplify使用時はこれがないとrun devが失敗する
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser' // amplify使用時はこれがないとbuildが失敗する
      }
    }
  }
})
```