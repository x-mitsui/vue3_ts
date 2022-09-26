import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  FormData: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      placeholder: '请输入密码',
      isShow: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    }
    // {
    //   field: 'departmentId',
    //   type: 'select',
    //   label: '选择部门',
    //   placeholder: '请选择部门',
    //   options: []
    // },
    // {
    //   field: 'roleId',
    //   type: 'select',
    //   label: '选择角色',
    //   placeholder: '请选择角色',
    //   options: []
    // }
  ],
  colSpans: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xm: 24
  },
  itemStyle: {}
}
