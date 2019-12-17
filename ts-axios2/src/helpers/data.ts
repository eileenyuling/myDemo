import { isPlainObject } from "./util";

function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

function transformResponse(data: any): any {
  console.log('typeof data', typeof data)
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch(e) {
      // do nothing
    }
  }
  return data
}
export {
  transformRequest,
  transformResponse
}