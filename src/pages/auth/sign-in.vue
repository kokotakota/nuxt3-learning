<script lang="ts" setup>
import { VForm } from 'vuetify/lib/components/index'
// 自動インポートされる
// import { useAuth } from '@/composables/useAuth'

definePageMeta({
  layout: 'unauth'
})

const form = ref<InstanceType<typeof VForm>>()
const valid = ref<boolean>(true)
const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')

const requiredRule = (v: string) => !!v || '必須入力です。'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || '正しいメールアドレスを入力してください。'
const passwordRule = (v: string) => /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/.test(v) || '半角英数字と記号のみを入力してください。'

const { signIn } = useAuth()
const onSignIn = async () => {
  errorMessage.value = ''
  if ((await form.value?.validate())?.valid) {
    try {
      await signIn(email.value, password.value)
    } catch (e: any) {
      if (e.message === 'PermissionDenied') {
        errorMessage.value = 'アクセス権限がありません'
      } else if (
        e.name === 'UserNotFoundException' ||
        e.name === 'NotAuthorizedException'
      ) {
        errorMessage.value = 'メールアドレスまたはパスワードが正しくありません'
      } else {
        errorMessage.value = 'ログインに失敗しました'
      }
    }
  }
}
</script>

<template>
  <v-container>
    <v-card flat width="400px" class="mx-auto">
      <v-card-title>ログイン</v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container px-4>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                type="email"
                label="メールアドレス"
                hide-details="auto"
                variant="outlined"
                validate-on="blur"
                color="primary"
                :rules="[requiredRule, emailRule]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                type="password"
                label="パスワード"
                hide-details="auto"
                variant="outlined"
                validate-on="blur"
                color="primary"
                :rules="[requiredRule, passwordRule]"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                size="large"
                color="primary"
                @click="onSignIn"
              >
                ログイン
              </v-btn>
            </v-col>
            <v-col v-if="errorMessage" cols="12" class="text-red text-center text-body-2">
              {{ errorMessage }}
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>
