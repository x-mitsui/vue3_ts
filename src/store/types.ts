import { ILoginState } from './login/types'
import { ISystemState } from './system/types'

export interface IRootState {
  counter: number // 主模块state类型
}

export interface IRootStateWithModule {
  login: ILoginState // 子模块state的类型
  system: ISystemState
}

// 收集所有类型集合起来，为useStore使用
export type IStoreType = IRootState & IRootStateWithModule
