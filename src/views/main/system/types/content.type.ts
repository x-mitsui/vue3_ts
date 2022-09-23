export interface contentType {
  storeActionKey: string
  showIndexColumn: boolean
  showSelectionColumn: boolean
  tableTitle: string
  propsList: any[]
  isKeepFooter?: boolean
}

export interface TreeTable {
  treeTableConfig?: {
    'tree-props': {
      children: string
    }
    'row-key': string
  }
}
