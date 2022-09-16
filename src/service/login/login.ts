import { request } from '../index'
import type { IAccount, IDataType, ILoginResult } from './types'

const accountLoginAction = (account: IAccount) => {
  return request.post<IDataType<ILoginResult>>({ url: '/login', data: account })
}
const requestUserinfo = (id: number, isShowLoading = false) => {
  return request.get<IDataType>({
    url: `/users/${id}`,
    showLoading: isShowLoading
  })
}
const requestRoleMenu = (roleId: number, isShowLoading = false) => {
  return request.get<IDataType>({
    url: `/role/${roleId}/menu`,
    showLoading: isShowLoading //避免频繁触发loading，只在第一次请求触发，也可以参数配置是否启用，这里先这样用
  })
}
export { accountLoginAction, requestUserinfo, requestRoleMenu }
