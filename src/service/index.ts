import { XRequest } from './request/index'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
const service = new XRequest({
  baseURL: 'http://123.207.32.32:8000',
  requestInterceptor(config: AxiosRequestConfig) {
    console.log('单个实例请求拦截')
    const token = ''
    if (token) {
      if (config.headers) {
        config.headers.Authorization = token
      }
    }
    return config
  },
  responseInterceptor(res) {
    console.log('单个实例响应拦截', res)
    return res
  }
})

export { service }
