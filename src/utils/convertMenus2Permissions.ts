export const convertMenus2Permissions = (userMenus: any[]): string[] => {
  const permissions: string[] = []
  const getPermissions_R = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.type > 1) {
        if (menu.permission) {
          permissions.push(menu.permission)
        } else {
          if (menu.children) {
            getPermissions_R(menu.children)
          }
        }
      } else {
        getPermissions_R(menu.children)
      }
    }
  }
  getPermissions_R(userMenus)

  return permissions
}
