import { IForm } from '@/base-ui/form'

export const formInfo: IForm = {
  FormData: [
    {
      label: 'id',
      placeholder: '请输入id',
      type: 'input'
    },
    {
      label: '用户名',
      placeholder: '请输入用户名',
      type: 'input'
    },
    {
      label: '密码',
      placeholder: '请输入密码',
      type: 'password'
    },
    {
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      type: 'select',
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' },
        { label: '乒乓球', value: 'pingpong' }
      ]
    },
    {
      label: '创建时间',
      placeholder: '请选择创建时间的范围',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 20px;'
  }
}