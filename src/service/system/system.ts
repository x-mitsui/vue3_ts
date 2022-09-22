import { request } from '../index'
import { IDataType } from '../types'
import { IQuery, IList } from '../types'

const get_list = (url: string, queryInfo: IQuery) => {
  return request.post<IDataType<IList>>({
    url,
    data: queryInfo
  })
}
export { get_list }
