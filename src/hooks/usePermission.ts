import { useStore } from 'vuex'

export const usePermission = (pageName: string, action: string) => {
  const store = useStore()
  console.log(
    'store.state.login.permissions:',
    Array.isArray(store.state.login.permissions)
  )
  return store.state.login.permissions?.includes(`system:${pageName}:${action}`)
}
