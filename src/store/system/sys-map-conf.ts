const systemMap: Record<string, { url: string; mutationName: string }> = {
  users: { url: '/users/list', mutationName: 'setUsers' },
  role: { url: '/role/list', mutationName: 'setRoles' },
  goods: { url: '/goods/list', mutationName: 'setGoods' },
  category: { url: '/category/list', mutationName: 'setCategory' }
}
export { systemMap }
