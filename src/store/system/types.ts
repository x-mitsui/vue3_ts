import { IUser } from '@/service/system/types'

export interface ISystemState {
  usersList: IUser[] | undefined
  usersCount: number
}
