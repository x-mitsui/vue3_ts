import axios from 'axios'
import OSS from 'ali-oss'
import dayjs from 'dayjs'

const pow1024 = (n: number) => Math.pow(1024, n)

// 工具函数
export const filterSize = (size: number) => {
  if (!size) return '-'
  if (size < pow1024(1)) return size + ' B'
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB'
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB'
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB'
  return (size / pow1024(4)).toFixed(2) + ' TB'
}

// 网络速度处理
export const handleNetworkSpeed = (
  res: any,
  partSize: number,
  p: number,
  fileMap: Record<number, number>,
  mapMaxKey: number
) => {
  const spend_time = res.rt / 1000
  const end_time = new Date(res.headers.date).getTime()
  const start_time = end_time - spend_time
  const network_speed = parseInt(partSize / spend_time + '')

  if (p === 0 || !network_speed) return 0

  handleNetworkSpeedChange(
    start_time,
    end_time,
    network_speed,
    fileMap,
    mapMaxKey
  )
  return network_speed
}

const handleNetworkSpeedChange = (
  start: number,
  end: number,
  speed: number,
  fileMap: Record<number, number>,
  mapMaxKey: number
) => {
  if (start - mapMaxKey >= 10000) {
    Object.keys(fileMap).forEach((key) => delete fileMap[Number(key)])
  }

  for (let i = start; i <= end; i++) {
    fileMap[i] = (fileMap[i] || 0) + speed
  }
}

// OSS相关方法
export const ossUtils = {
  createClient(credentials: {
    AccessKeyId: string
    AccessKeySecret: string
    SecurityToken: string
  }) {
    return new OSS({
      accessKeyId: credentials.AccessKeyId,
      accessKeySecret: credentials.AccessKeySecret,
      stsToken: credentials.SecurityToken,
      bucket: 'buckle-pan',
      region: 'oss-cn-hangzhou'
    })
  },

  getUploadPath(file: File) {
    return dayjs().format('YYYYMMDDHHmmss') + file.name
  }
}
