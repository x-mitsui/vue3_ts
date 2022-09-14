import axios, { AxiosError } from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'
import { AxiosRequestConfig_ext, AxiosResponseData } from './types'
import 'element-plus/es/components/loading/style/css'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { ElLoading } from 'element-plus'

class XRequest {
  private _instance: AxiosInstance
  private _isShowLoading = true
  private _loadingInstance?: LoadingInstance
  constructor(config: AxiosRequestConfig_ext) {
    this._instance = axios.create(config)
    this.interceptorUtil(config) // 可为某一实例添加拦截器配置

    // 为所有实例添加拦截器
    this.interceptorUtil({
      requestInterceptor: (config) => {
        console.log('共有requestInterceptor')
        if (this._isShowLoading) {
          this._loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      responseInterceptor: (res) => {
        console.log('共有responseInterceptor')
        this._loadingInstance?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('err')
        }
        return data
      },
      responseInterceptorCatch: (err: AxiosError) => {
        this._loadingInstance?.close()
        if (err.response?.status === 404) {
          console.log('err')
        }
        return err
      }
    })
  }

  request(config: AxiosRequestConfig_ext): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      if (config.requestInterceptor) {
        config = config.requestInterceptor(config)
      }
      this._instance
        .request<any, AxiosResponse<AxiosResponseData>>(config)
        .then(
          (res) => {
            if (config.responseInterceptor) {
              res = config.responseInterceptor(res)
            }
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
    })
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
