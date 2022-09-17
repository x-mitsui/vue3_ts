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
  label: string
  rules?: any[]
  placeholder?: string
  type: FormType
  // select
  options?: any[]
  // 其它
  otherOptions?: any
}
