import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import { parseHeaders, transformResponse } from '../helpers/util'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  const {
    data = null, url,
    method = 'get',
    headers,
    responseType,
    timeout,
    cancelToken
  } = config
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) { // 因为网络错误的时候，status === 0
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout1 of ${timeout}ms exceded`, config, 'ECONNABRTED', request))
    }
    headers && Object.keys(headers).forEach(name => {
      request.setRequestHeader(name, headers[name])
    })
    if (cancelToken) {
      cancelToken.promise.then((reason: string) => {
        request.abort()
        reject(reason)
      })
    }
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}

