import InterceptorManager from "../core/interceptorManager"

type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

interface AxiosRequestConfig {
  url?: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
  transformRequest?: AxiosTransformer | AxiosTransformer[],
  transformResponse?: AxiosTransformer | AxiosTransformer[],
  CancelToken?: CancelToken
  [propName: string]: any
}

interface AxiosResponse<T=any> {
  data: T,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  request: any
}

interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

interface AxiosError extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}

interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>,
    response: InterceptorManager<AxiosResponse>
  },
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>,
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>,
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>,
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>,
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>,
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>,
  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>,
  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>,
}

interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>,
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInterceptorManager {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number,
  eject(id: number): void
}

interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

interface RejectedFn {
  (error: any): any
}

interface AxiosTransformer {
  (data: any, headers?: any): any
}

interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}

interface Canceler {
  (message?: string): void
}

interface CancelExecutor {
  (cancel: Canceler): void
}

interface CancelTokenSource {
  token: CancelToken,
  cancel: Canceler
}

interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

interface Cancel {
  message?: string
}

interface CancelStatic {
  new(message?: string): Cancel
}
export {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
  Axios,
  AxiosInstance,
  Method,
  AxiosInterceptorManager,
  ResolvedFn,
  RejectedFn,
  AxiosTransformer,
  AxiosStatic,
  CancelToken,
  Canceler,
  CancelExecutor,
  CancelTokenStatic,
  CancelTokenSource,
  CancelStatic,
  Cancel
}

