import type { IRootState } from '../types'
import type { ILoginState } from './types'
import type { Module } from 'vuex'
import type { IAccount } from '../../service/login/types'
import {
  accountLoginAction,
  requestRoleMenu,
  requestUserinfo
} from '@/service/login/login'
import { LocalCache } from '@/utils/LocalCache'
import router from '@/router'

export const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: {
    token: '',
    userinfo: '',
    userMenus: ''
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserinfo(state, payload) {
      state.userinfo = payload
    },
    setUserMenus(state, payload) {
      state.userMenus = payload
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 登录获取token
      const result = await accountLoginAction(payload)
      console.log(result.code, result.data.token)
      const { id, token } = result.data
      commit('setToken', token)
      LocalCache.set('token', token)

      // 获取用户信息
      const { data } = await requestUserinfo(id)
      commit('setUserinfo', data)
      LocalCache.set('userinfo', data)

      // 获取用户的角色对应的菜单
      const MenuResult = await requestRoleMenu(data.role.id)
      console.log('MenuResult:', MenuResult.data)
      commit('setUserMenus', MenuResult.data)
      LocalCache.set('userMenus', MenuResult.data)

      router.push('/main')
    },
    loadLocalStorage({ commit }) {
      const token = LocalCache.get('token')
      const userinfo = LocalCache.get('userinfo')
      const userMenus = LocalCache.get('userMenus')
      token && commit('setToken', token)
      userinfo && commit('setUserinfo', userinfo)
      userMenus && commit('setUserMenus', userMenus)
    }
  }
}