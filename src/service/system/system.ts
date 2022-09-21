import { request } from '../index'
import { IDataType } from '../types'
import { IUserQuery, IList } from './types'

const get_list = (url: string, queryInfo: IUserQuery) => {
  return request.post<IDataType<IList>>({
    url,
    data: queryInfo
  })
}
export { get_list }
