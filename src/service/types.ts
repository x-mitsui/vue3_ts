import { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface InterceptorConfig {
  requestInterceptor?(
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig>
  //
  responseInterceptor?(
    config: AxiosResponse
  ): AxiosResponse | Promise<AxiosResponse>
  //
  requestInterceptorCatch?(error: unknown): unknown
  responseInterceptorCatch?(error: unknown): unknown
}

export interface AxiosRequestConfig_ext
  extends AxiosRequestConfig,
    InterceptorConfig {
  loading?: boolean
}
