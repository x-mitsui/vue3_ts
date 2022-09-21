import type { IRootState } from '../types'
import type { ISystemState } from './types'
import type { Module } from 'vuex'

import { get_list } from '@/service/system/system'
import { IList, IRole, IUser } from '@/service/system/types'
import { systemMap } from './sys-map-conf'

export const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersList: undefined,
    usersCount: 0,
    roleList: undefined,
    roleCount: 0
  },
  getters: {
    getDataList(state) {
      console.log('state.roleList:', state.roleList)
      return (key: string) => (state as any)[`${key}List`]
    },
    getDataCount(state) {
      return (key: string) => (state as any)[`${key}Count`]
    }
  },
  mutations: {
    setUsers(state, payload: IList) {
      state.usersList = payload.list as IUser[]
      state.usersCount = payload.totalCount
    },
    setRoles(state, payload: IList) {
      console.log('payload:', payload)
      state.roleList = payload.list as IRole[]
      state.roleCount = payload.totalCount
    }
  },
  actions: {
    async getListAction({ commit }, payload) {
      const result = await get_list(
        systemMap[payload.storeActionKey].url,
        payload.queryInfo
      )

      commit(systemMap[payload.storeActionKey].mutationName, result.data)
    }
  }
}
