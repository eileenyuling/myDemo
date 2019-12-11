import InterceptorManager from "../core/interceptorManager"

type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'put' | 'PUT'
| 'options' | 'OPTIONS'
| 'head' | 'HEAD'
| 'post' | 'POST'
| 'patch' | 'PATCH'

interface AxiosTransformer {
  (data: any, headers?: any): any
}

interface AxiosRequestConfig {
  url?: string,
  method?: Method,
  headers?: any,
  data?: any,
  params?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number,
  transformRequest?: AxiosTransformer | AxiosTransformer[],
  transformResponse?: AxiosTransformer | AxiosTransformer[],
  [propName: string]: any
}

interface AxiosResponse<T = any> {
  status: number,
  statusText: string,
  config: AxiosRequestConfig,
  headers: any,
  // 本来想说要定义成XMLHttpRequest，但是官方的axios是node端也适用的，
  // 那么在node端，就不是XMLHttpRequest类型了，所以在此纠正过来
  request: any,
  // request: XMLHttpRequest,
  data: T
}

// 当axios请求返回一个AxiosPromise,
// 那么resolve中返回的就是AxiosResponse类型的响应数据
interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}


interface AxiosError extends Error {
  config: AxiosRequestConfig,
  code?: string | null,
  request: any,
  // request?: XMLHttpRequest,
  reponse: AxiosResponse,
  isAxiosError: boolean
}

interface Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

interface AxiosInterceptorManager<T> {
  // 这里返回一个数字，作为interceptor的ID，后面做删除的时候会用到
  use(resolved: ResolveFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

interface RejectedFn {
  (error: any): any
}

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export {
  Method,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
  Axios,
  AxiosInstance,
  AxiosInterceptorManager,
  ResolveFn,
  RejectedFn,
  Interceptors,
  AxiosTransformer,
  AxiosStatic
}