import type { IRootState } from '../types'
import type { ILoginState } from './types'
import type { Module } from 'vuex'

export const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    userinfo: ''
  },
  getters: {},
  mutations: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      //
      console.log(payload)
    }
  }
}
