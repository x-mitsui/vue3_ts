import { request } from '../index'
import { IDataType } from '../types'
import { IQuery, IList, IDeleteResult } from '../types'

const get_list = (url: string, queryInfo: IQuery) => {
  return request.post<IDataType<IList>>({
    url,
    data: queryInfo
  })
}

const delete_item = (url: string) => {
  return request.delete<IDataType<IDeleteResult>>({
    url,
    showLoading: true
  })
}
export { get_list, delete_item }
