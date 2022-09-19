import { RouteRecordRaw } from 'vue-router'
export let firstMenuInfo: any
export const convertMenus2Routes = (userMenus: any[]): RouteRecordRaw[] => {
  const allRoutes: RouteRecordRaw[] = []
  // 1.先加载所有的allRoutes.  // 利用webpack工具，将所有模块加载
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    allRoutes.push(require('../router/main' + key.substring(1)).default)
  })
  // console.log('allRoutes:', allRoutes)

  // 2.比对收集
  const routes: RouteRecordRaw[] = []
  const getRoutes_R = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) {
          routes.push(route)
          firstMenuInfo ?? (firstMenuInfo = menu)
        }
      } else {
        getRoutes_R(menu.children)
      }
    }
  }
  getRoutes_R(userMenus)
  return routes
}
