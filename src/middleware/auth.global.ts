import { useAuth } from '@/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, setCurrentUser } = useAuth()
  await setCurrentUser()
  
  // ログインしていなければリダイレクト
  if (!user.value && !to.path.startsWith('/auth')) {
    return '/auth/sign-in'
  }
})