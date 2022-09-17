import { createStore, useStore as originUseStore, Store } from 'vuex'
import { IRootState, IStoreType } from './types'
import { LoginModule } from './login/login'
export const store = createStore<IRootState>({
  state: {
    counter: 0
  },
  mutations: {},
  actions: {},
  modules: { LoginModule }
})
export const restoreLocalStorage = () => {
  store.dispatch('LoginModule/loadLocalStorage')
}

export const useStore = (): Store<IStoreType> => {
  return originUseStore()
}
