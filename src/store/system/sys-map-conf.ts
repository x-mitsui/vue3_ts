const systemMap: Record<string, { url: string; mutationName: string }> = {
  users: { url: '/users/list', mutationName: 'setUsers' },
  role: { url: '/role/list', mutationName: 'setRoles' }
}
export { systemMap }
