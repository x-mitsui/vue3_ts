// service统一出口
import { LocalCache } from '@/utils/LocalCache'
import { XRequest } from './request'
import { BASE_URL, TIME_OUT } from './request/config'

export const request = new XRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      const token = LocalCache.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err: any) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res: any) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err: any) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})
