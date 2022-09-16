export const elIcon2camel = (iconName: string) => {
  const str = iconName.replace(/el-icon-/, '')
  const arr = str.split('-')
  let rltStr = ''
  for (const tem of arr) {
    rltStr += tem[0].toUpperCase() + tem.substring(1)
  }
  console.log('rltStr:', rltStr)
  return rltStr
}
