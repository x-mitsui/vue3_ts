import { LocalCache } from '@/utils/LocalCache'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'
import { firstMenuInfo } from '@/utils/convertMenus2Routes'
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/404/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (LocalCache.get('token')) {
      if (to.path === '/main') {
        router.push(firstMenuInfo.url)
      }
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
