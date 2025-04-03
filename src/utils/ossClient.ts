import OSS from 'ali-oss'
import axios from 'axios'
import CryptoJS from 'crypto-js'

// 生成唯一文件名
const generateFileName = (file: File) => {
  const timestamp = new Date().getTime()
  const randomString = CryptoJS.lib.WordArray.random(8).toString()
  return `${timestamp}_${randomString}.${file.name.split('.').pop()}`
}

const sanitizePath = (path: string): string => {
  // 移除路径中的特殊字符
  return path
    .replace(/\.\./g, '') // 移除..
    .replace(/\/\//g, '/') // 将//替换为/
    .replace(/^\//, '') // 移除开头的/
}

const getOSSToken = async () => {
  const res = await axios.get('http://localhost:3001/cms/file/sts')
  const data = res.data
  console.log(
    '距离过期还有：',
    new Date(data.expiration).getTime() - Date.now() - 1000 * 60,
    'ms'
  )
  return data
}
let ossClient: OSS | null = null
// 在初始化时替换为动态获取的临时凭证
export const getAliOssClient = async () => {
  if (ossClient) return ossClient
  const data = await getOSSToken()
  console.log(data)
  ossClient = new OSS({
    region: data.region,
    bucket: data.bucket,
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    refreshSTSToken: async () => {
      // 刷新临时访问凭证的回调，在上传大文件的时候会用到
      const info = await getOSSToken()
      return {
        accessKeyId: info.accessKeyId,
        accessKeySecret: info.accessKeySecret,
        stsToken: info.securityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒，在过期前一分钟刷新
    // 过期时间是后端配的，这里配合后端把时间写死也可以，例如 15 分钟过期，10 分钟就可以刷新一次
    refreshSTSTokenInterval:
      new Date(data.expiration).getTime() - Date.now() - 1000 * 60,
    secure: true
  })
  return ossClient
}

// const x = await getAliOssClient()
// x.multipartUpload
// x.abortMultipartUpload()

export const uploadFile = async (file: File, path: string) => {
  const client = await getAliOssClient()
  const sanitizedPath = sanitizePath(path)
  const fileName = generateFileName(file)
  return client.put(sanitizedPath, file)
}

// 下载文件
export async function downloadFromAliOss(fileName: string) {
  const client = await getAliOssClient()
  const response = {
    'content-disposition': `attachment; filename=${encodeURIComponent(
      fileName
    )}`
  }
  const url = client.signatureUrl(fileName, { response })
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
