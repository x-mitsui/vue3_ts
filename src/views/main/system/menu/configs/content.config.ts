import { contentType, TreeTable } from '../../types/content.type'
export const contentConfig: contentType & TreeTable = {
  storeActionKey: 'menu',
  showIndexColumn: false,
  showSelectionColumn: false,
  tableTitle: '菜单列表',
  isKeepFooter: false,
  treeTableConfig: {
    'tree-props': {
      children: 'children'
    },
    'row-key': 'id'
  },
  propsList: [
    { prop: 'name', label: '菜单名称', minWidth: '160' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '180' },
    { prop: 'icon', label: '菜单icon', minWidth: '150' },
    { prop: 'permission', label: '按钮权限', minWidth: '160' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'operate' }
  ]
}
