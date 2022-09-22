export interface IQuery {
  offset: number
  size: number
  name?: string
  cellphone?: number
}

export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: Date
  updateAt: Date
}

export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}

export interface IGoodQuery {
  offset: number
  size: number
  name?: string
  cellphone?: number
}

export interface IGood {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: Date
  updateAt: Date
}

export interface ICategory {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}

export interface IList {
  list: (IUser | IRole | IGood | ICategory)[]
  totalCount: number
}

export interface IDataType<T = any> {
  code: number
  data: T
}
