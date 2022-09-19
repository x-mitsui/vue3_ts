export const findDefaultValue = (menus: any, path: string): any => {
  let defaultValue = null
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.type === 1) {
      defaultValue = findDefaultValue(menu.children ?? [], path)
      if (defaultValue !== null) break
    } else if (menu.type === 2) {
      if (menu.url === path) {
        console.log('menu.url:', menu.url)
        defaultValue = menu.id
        break
      }
    }
  }

  return defaultValue
}
