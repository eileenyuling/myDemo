import { isPlainObject } from "./util";

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name.toLowerCase() === normalizedName.toLowerCase() && name !== normalizedName) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

function processHeaders(headers: any, data: any): any {
  // 因为headers中的属性名是大小写不敏感的，所以我们需要对headers中的属性规范化
  normalizeHeaderName(headers, 'Content-Type')
  // 如果data为空，那么设置'Content-Type'是没有意义的，这里删除它
  if (!data) {
    if (headers && headers['Content-Type']) {
      delete headers['Content-Type']
    }
    return headers
  }
  if (isPlainObject(data)) {
    if (!headers) {
      headers = {
        'Content-Type': 'application/json;charset=utf-8'
      }
      return headers
    }
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

function parseHeaders(headers: string): any {
  // 这里不能使用{} 和 new Object() l来创建一个空对象
  // 因为这2种创建对象的方式会继承Object.prototype, 其类型不是any
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    parsed[key] = val ? val.trim() : val
  })
  return parsed
}

export {
  processHeaders,
  parseHeaders
}