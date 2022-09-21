import { IUser, IRole } from '@/service/system/types'

export interface ISystemState {
  usersList: IUser[] | undefined
  usersCount: number
  roleList: IRole[] | undefined
  roleCount: number
}
