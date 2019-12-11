import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolveFn, RejectedFn, Interceptors } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";
import mergeConfig from './mergeConfig'
interface PromiseChain {
  resolved: ResolveFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
    this.defaults = initConfig
  }
  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    // 这里要定义一个新的newConfig变量，是因为AxiosPromise接收的泛型类型T是any，与config的类型不一致
    let newConfig: any
    newConfig = config || {}
    if (typeof url === 'string') {
      newConfig.url = url
    } else {
      newConfig = url
    }
    newConfig = mergeConfig(this.defaults, newConfig)
    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })
    let promise = Promise.resolve(newConfig)
    while(chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
    // return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod(url, 'get', config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // const newConfig = Object.assign(config || {}, {
    //   url,
    //   method: 'delete'
    // })
    // return dispatchRequest(newConfig)
    return this._requestMethod(url, 'delete', config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod(url, 'head', config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod(url, 'options', config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig,): AxiosPromise {
    return this._requestMethod(url, 'put', config, data)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig,): AxiosPromise {
    return this._requestMethod(url, 'post', config, data)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig,): AxiosPromise {
    return this._requestMethod(url, 'patch', config, data)
  }
  _requestMethod(url: string, method: Method, config?: AxiosRequestConfig, data?: any) {
    const newConfig = Object.assign(config || {}, {
      url,
      method,
      data: data || null
    })
    return this.request(newConfig)
  }
}


