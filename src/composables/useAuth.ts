import type { Ref } from 'vue'

type User = {
  id: string
}

const signIn = (user: Ref<User|null>) => async (email: string, password: string) => {
  // ログイン処理
  const currentUser = { id: 'test' }
  if (!currentUser) {
    await signOut(user)
    throw new Error('UserNotFound')
  }

  user.value = {
    id: currentUser.id
  }
  // middleware でログインページにリダイレクトした場合は redirectFrom に元のページが入っている
  const to = useRoute().redirectedFrom?.path || '/'
  useRouter().push(to)
}

const signOut = (user: Ref<User|null>) => async () => {
  // ログアウト処理
  user.value = null
  useRouter().push('/auth/sign-in')
}

const setCurrentUser = (user: Ref<User|null>) => async () => {
  // ログイン中ユーザー取得
  const currentUser = { id: 'test' }
  if (currentUser) {
    user.value = {
      id: currentUser.id
    }
  } else {
    // 未ログイン
    await signOut(user)
  }
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  return {
    user,
    setCurrentUser: setCurrentUser(user),
    signIn: signIn(user),
    signOut: signOut(user),
  }
}