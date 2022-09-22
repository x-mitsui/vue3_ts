import { contentType } from '../../types/content.type'
export const contentConfig: contentType = {
  storeActionKey: 'goods',
  showIndexColumn: true,
  showSelectionColumn: true,
  tableTitle: '商品列表',

  propsList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'price' },
    { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'price' },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'showImage'
    },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
