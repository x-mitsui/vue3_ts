import { createStore, useStore as originUseStore, Store } from 'vuex'
import { IRootState, IStoreType } from './types'
import { login } from './login/login'
import { system } from './system/system'
import { get_list } from '@/service/system/system'

export const store = createStore<IRootState>({
  state: {
    allDepartmentList: [],
    allRoleList: []
  },
  mutations: {
    changeAllDepartmentList(state, payload) {
      state.allDepartmentList = payload
    },
    changeAllRoleList(state, payload) {
      state.allRoleList = payload
    }
  },
  actions: {
    async getAllDepartmentList({ commit }) {
      const result = await get_list('/department/list', {
        size: 1000,
        offset: 0
      })
      commit('changeAllDepartmentList', result.data.list)
    },
    async getAllRoleList({ commit }) {
      const result = await get_list('/role/list', {
        size: 1000,
        offset: 0
      })
      commit('changeAllRoleList', result.data.list)
    },
    getListInfo({ dispatch }) {
      dispatch('getAllDepartmentList')
      dispatch('getAllRoleList')
    }
  },
  modules: { login, system }
})
export const restoreLocalStorage = () => {
  store.dispatch('login/loadLocalStorage')
}

export const useStore = (): Store<IStoreType> => {
  return originUseStore()
}
