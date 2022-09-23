import { IUser, IRole, IGood, ICategory, IMenu } from '@/service/types'

export interface ISystemState {
  usersList: IUser[]
  usersCount: number
  roleList: IRole[]
  roleCount: number
  goodsList: IGood[]
  goodsCount: number
  categoryList: ICategory[]
  categoryCount: number
  menuList: IMenu[]
  menuCount: number
}
