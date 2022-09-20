import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss'

const formatUTCString = (utcStr: string, formatStr: string = FORMAT_STRING) => {
  return dayjs.utc(utcStr).local().format(formatStr)
}
const formatTimeStamp = (
  timeStamp: number, //10位数字
  formatStr: string = FORMAT_STRING
) => {
  return dayjs.unix(timeStamp).local().format(formatStr)
}

export { formatUTCString, formatTimeStamp }
