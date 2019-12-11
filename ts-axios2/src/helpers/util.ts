const toString = Object.prototype.toString
function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 对于FormData、ArrayBuffer, 用isObject还是会判断为true，
// 但是我们这里只需要普通的JSON对象
function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export {
  isDate,
  isPlainObject,
  extend
}