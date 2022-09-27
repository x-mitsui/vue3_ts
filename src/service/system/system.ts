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

const updateItemInfo = (url: string, queryInfo: any) => {
  return request.patch<IDataType<any>>({
    url,
    data: queryInfo,
    showLoading: true
  })
}

const createNewItem = (url: string, queryInfo: any) => {
  return request.post<IDataType<any>>({
    url,
    data: queryInfo,
    showLoading: true
  })
}

export { get_list, delete_item, updateItemInfo, createNewItem }
