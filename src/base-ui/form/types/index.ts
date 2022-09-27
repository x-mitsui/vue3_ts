// export interface ISelect {
//   selectLabel: string
//   option: {
//     label: string
//     value: any
//   }
// }
// export interface ITimePicker {
//   start: number
// }
type FormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  label: string
  rules?: any[]
  placeholder?: string
  type: FormType
  // select
  options?: any[]
  // 其它
  otherOptions?: any
  whitelist?: ('create' | 'update')[]
}

export interface IForm {
  FormData: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colSpans?: any
}
