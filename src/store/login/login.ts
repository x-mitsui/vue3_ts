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
import { convertMenus2Routes } from '@/utils/convertMenus2Routes'
import { convertMenus2Permissions } from '@/utils/convertMenus2Permissions'

export const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: '',
      userMenus: '',
      permissions: []
    }
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
      // 动态注册路由
      const routes = convertMenus2Routes(state.userMenus)
      state.permissions = convertMenus2Permissions(state.userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
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

      // 获取完整的role/department信息
      dispatch('getListInfo', null, { root: true })

      router.push('/main')
    },
    loadLocalStorage({ commit, dispatch }) {
      const token = LocalCache.get('token')
      const userinfo = LocalCache.get('userinfo')
      const userMenus = LocalCache.get('userMenus')
      token && commit('setToken', token)
      userinfo && commit('setUserinfo', userinfo)
      userMenus && commit('setUserMenus', userMenus)
      // 获取完整的role/department信息
      dispatch('getListInfo', null, { root: true })
    }
  }
}
