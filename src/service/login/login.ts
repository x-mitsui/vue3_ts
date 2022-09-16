import { request } from '../index'
import type { IAccount, IDataType, ILoginResult } from './types'

const accountLoginAction = (account: IAccount) => {
  return request.post<IDataType<ILoginResult>>({ url: '/login', data: account })
}
export { accountLoginAction }
