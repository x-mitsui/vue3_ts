import type { IRootState } from '../types'
import type { ISystemState } from './types'
import type { Module } from 'vuex'

import { get_list, delete_item } from '@/service/system/system'
import { ICategory, IGood, IList, IMenu, IRole, IUser } from '@/service/types'
import { systemMap } from './sys-map-conf'

export const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      categoryList: [],
      categoryCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    getDataList(state) {
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
      state.roleList = payload.list as IRole[]
      state.roleCount = payload.totalCount
    },
    setGoods(state, payload: IList) {
      state.goodsList = payload.list as IGood[]
      state.goodsCount = payload.totalCount
    },
    setCategory(state, payload: IList) {
      state.categoryList = payload.list as ICategory[]
      state.categoryCount = payload.totalCount
    },
    setMenu(state, payload: IList) {
      state.menuList = payload.list as IMenu[]
      state.menuCount = payload.totalCount
    }
  },
  actions: {
    async getListAction({ commit }, payload) {
      const result = await get_list(
        systemMap[payload.storeActionKey].url,
        payload.queryInfo
      )

      commit(systemMap[payload.storeActionKey].mutationName, result.data)
    },
    async deleteItemAction({ dispatch }, { storeActionKey, id }) {
      await delete_item(`/${storeActionKey}/${id}`)
      // 再次拉取列表新数据
      dispatch('getListAction', {
        storeActionKey,
        queryInfo: { size: 10, offset: 0 }
      })
    }
  }
}
