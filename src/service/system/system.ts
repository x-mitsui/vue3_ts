import { request } from '../index'
import { IDataType } from '../types'
import { IUserQuery, IUserResult } from './types'

const get_users = (queryInfo: IUserQuery) => {
  return request.post<IDataType<IUserResult>>({
    url: '/users/list',
    data: queryInfo
  })
}
export { get_users }
