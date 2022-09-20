import { contentType } from '../types/content.type'
export const contentConfig: contentType = {
  showIndexColumn: true,
  showSelectionColumn: true,
  tableTitle: '用户数据',

  propsList: [
    { label: '用户名', prop: 'name', minWidth: '80' },
    { label: '真实姓名', prop: 'realname', minWidth: '80' },
    { label: '手机号', prop: 'cellphone', minWidth: '100' },
    { label: '状态', prop: 'enable', minWidth: '70', slotName: 'status' },
    {
      label: '创建时间',
      prop: 'createAt',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      minWidth: '180',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      prop: 'operate',
      minWidth: '120',
      slotName: 'operate'
    }
  ]
}
