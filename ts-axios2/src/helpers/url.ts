import { isDate, isPlainObject } from "./util"

function encode(val: string): string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/g, ']')
}

function buildUrl(url: string, params?: any) {
  // 去掉哈希符号
  const hashIndex = url.indexOf('#')
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex)
  }
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || val === 'undefined') {
      return
    }

    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)){
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  const serializedParams = parts.join('&')
  url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}
export {
  buildUrl
}