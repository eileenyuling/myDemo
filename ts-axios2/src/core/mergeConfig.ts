import { AxiosRequestConfig, Method } from "../types";
import { isPlainObject } from "../helpers/util";

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  const strats = Object.create(null)
  const stratKeysFromVal2 = ['url', 'params', 'data']
  stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat
  })
  const stratKeysDeepMerge = ['headers']
  stratKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
  })
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  // config.headers = flattenHeaders(config.headers, config.method)
  return config
}
function deepMergeStrat(val1: any, val2: any): any {
  val1 = val1 || {}
  val2 = val2 || {}
  return deepMerge(val1, val2)
}

// 复杂合并策略，比如headers
function deepMerge(...objs: any[]) {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (!obj) {
      return
    }
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (isPlainObject(val)) {
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge({}, val)
        }
      } else {
        result[key] = val
      }
    })
  })
  return result
}

// 对于url, params, data默认配置是没有意义的，只要config2中配置过，就使用
function fromVal2Strat(val1: any, val2: any): any {
  return val2
}
// 默认合并策略，即config2中有，则以config2中的为准
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const keysToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  keysToDelete.forEach(key => {
    delete headers[key]
  })
  return headers
}

