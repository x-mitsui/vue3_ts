import axios from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'
import { AxiosRequestConfig_ext } from './types'

class XRequest {
  private _instance: AxiosInstance
  constructor(config: AxiosRequestConfig_ext) {
    this._instance = axios.create(config)
    this.interceptorUtil(config) // 可为某一实例添加拦截器配置

    // 为所有实例添加拦截器
    this.interceptorUtil({
      requestInterceptor(config) {
        console.log('共有requestInterceptor')
        return config
      },
      responseInterceptor(config) {
        console.log('共有responseInterceptor')
        return config
      }
    })
  }
  request(config: AxiosRequestConfig_ext): Promise<AxiosResponse> {
    config = this.interceptorUtil(config)
    return this._instance.request(config)
  }
  interceptorUtil(config: AxiosRequestConfig_ext): AxiosRequestConfig_ext {
    if (config.requestInterceptor) {
      this._instance.interceptors.request.use(
        config.requestInterceptor,
        config.requestInterceptorCatch
      )
    }
    if (config.responseInterceptor) {
      this._instance.interceptors.response.use(
        config.responseInterceptor,
        config.responseInterceptorCatch
      )
    }
    return config
  }
}

export { XRequest }
