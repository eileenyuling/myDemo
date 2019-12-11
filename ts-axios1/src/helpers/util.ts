import { Method } from "../types"

const toString = Object.prototype.toString
function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 判断是否普通对象，而不是formdata之类的特殊对象
function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

function normalizeHeaderName(headers: any, normalizeHeaderName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeHeaderName && name.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      headers[normalizeHeaderName] = headers[name]
      delete headers[name]
    }
  })
}

function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (!headers) {
      headers = {}
    }
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charsetset=utf-8'
    }
  }
  if (data === null) {
    delete headers['Content-Type']
  }
  return headers
}

function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })
  return parsed
}

function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch(e) {
      // do nothing
    }
  }
  return data
}

function encode(val: string): string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/ig, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/ig, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/ig, '[')
  .replace(/%5D/ig, ']')
}
function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode[value]}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex > -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

function extend<T, U>(to: T, from: U): T & U {
  for(const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}

export {
  isDate,
  isObject,
  isPlainObject,
  transformRequest,
  processHeaders,
  parseHeaders,
  transformResponse,
  buildUrl,
  extend,
  deepMerge,
  flattenHeaders
}