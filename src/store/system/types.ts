import { IUser, IRole, IGood, ICategory } from '@/service/system/types'

export interface ISystemState {
  usersList: IUser[] | undefined
  usersCount: number
  roleList: IRole[] | undefined
  roleCount: number
  goodsList: IGood[] | undefined
  goodsCount: number
  categoryList: ICategory[] | undefined
  categoryCount: number
}
