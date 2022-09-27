export const recollectData = (
  originDataList: any[],
  newDataList: any[],
  operateType: string
) => {
  newDataList.length = 0 //清空数组，注意不能使用newDataList=[]，这种是切换了对象
  originDataList.forEach((item: any) => {
    if (item.whitelist) {
      if (item.whitelist.includes(operateType)) {
        newDataList.push(item)
      }
    } else {
      newDataList.push(item)
    }
  })
}
