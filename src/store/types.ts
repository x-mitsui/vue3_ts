import { ILoginState } from './login/types'

export interface IRootState {
  counter: number // 主模块state类型
}

export interface IRootStateWithModule {
  LoginModule: ILoginState // 子模块state的类型
}

// 收集所有类型集合起来，为useStore使用
export type IStoreType = IRootState & IRootStateWithModule
