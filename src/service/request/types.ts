import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
export interface InterceptorConfig {
  requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig
  //
  responseInterceptor?(res: AxiosResponse): AxiosResponse
  //
  requestInterceptorCatch?(error: AxiosError): AxiosError
  responseInterceptorCatch?(error: AxiosError): AxiosError
}

export interface AxiosRequestConfig_ext
  extends AxiosRequestConfig,
    InterceptorConfig {
  loading?: boolean
}

export interface AxiosResponseData {
  data: any
  returnCode: string
  success: boolean
}
