import { createStore } from 'vuex'
import { IRootState } from './types'
import { LoginModule } from './login/login'
export const store = createStore<IRootState>({
  state: {
    counter: 0
  },
  mutations: {},
  actions: {},
  modules: { LoginModule }
})
store.dispatch('LoginModule/loadLocalStorage')
