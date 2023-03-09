<script lang="ts" setup>
const drawer = ref(false)
const navItems = [
  {
    text: 'ユーザー情報',
    icon: 'mdi-account',
    link: '/users'
  }
]

const { user, signOut } = useAuth()

const onSignOut = async () => {
  await signOut()
}
</script>

<template>
  <div>
    <v-app-bar elevation="1">
      <v-app-bar-nav-icon v-if="navItems.length" @click="drawer = !drawer" />
      <v-toolbar-title
        style="cursor:pointer"
        @click="$router.push('/')"
      >
        タイトル
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="user" depressed @click="onSignOut">
        ログアウト
      </v-btn>
      <v-btn v-else depressed to="/auth/sign-in">
        ログイン
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-if="navItems.length" v-model="drawer" location="left" permanent>
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.text"
          :to="item.link"
          :prepend-icon="item.icon"
          :title="item.text"
          link
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>