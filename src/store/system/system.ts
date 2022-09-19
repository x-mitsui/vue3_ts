import type { IRootState } from '../types'
import type { ISystemState } from './types'
import type { Module } from 'vuex'

import router from '@/router'

import { get_users } from '@/service/system/system'
import { IUserResult } from '@/service/system/types'

export const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: undefined,
    usersCount: 0
  },
  getters: {},
  mutations: {
    setUsers(state, payload: IUserResult) {
      state.usersList = payload.list
      state.usersCount = payload.totalCount
    }
  },
  actions: {
    async getUsersAction({ commit }, payload) {
      const result = await get_users(payload)
      console.log('result:', result.data)
      commit('setUsers', result.data)
    }
  }
}
