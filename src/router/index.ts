import { LocalCache } from '@/utils/LocalCache'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (LocalCache.get('token')) {
      return true
    } else {
      router.replace('/login')
      return false
    }
  } else {
    return true
  }
})
export default router
