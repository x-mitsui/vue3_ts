export const recollectData = (
  // 数据原始集合
  originDataList: any[],
  // 待重新组织的数据集合
  newDataList: any[],
  // 类型，用于判定是否在白名单中
  operateType: string
) => {
  originDataList.forEach((item: any, index: number) => {
    if (item.whitelist) {
      if (item.whitelist.includes(operateType)) {
        if (!newDataList[index].whitelist) {
          // 如果此集合没有白名单的对应项，将白名单对应项插入指定位置
          newDataList.splice(index, 0, originDataList[index])
        }
      } else {
        if (newDataList[index].whitelist) {
          // 如果此集合有白名单的对应项，删除
          newDataList.splice(index, 1)
        }
      }
    }
  })
}
