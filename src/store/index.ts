import { createStore, useStore as originUseStore, Store } from 'vuex'
import { IRootState, IStoreType } from './types'
import { login } from './login/login'
import { system } from './system/system'
export const store = createStore<IRootState>({
  state: {
    counter: 0
  },
  mutations: {},
  actions: {},
  modules: { login, system }
})
export const restoreLocalStorage = () => {
  store.dispatch('login/loadLocalStorage')
}

export const useStore = (): Store<IStoreType> => {
  return originUseStore()
}
