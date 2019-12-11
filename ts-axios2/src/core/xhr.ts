import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { parseHeaders } from "../helpers/headers";
import { transformResponse } from "../helpers/data";
import { createError } from "../helpers/error";
import transform from './transform'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // method和data可能没有， 所以给出默认值
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout
    } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!)
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name])
    })
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    request.onreadystatechange = function handleLoad() {
      // request.readyState不是4，说明请求还未返回
      if (request.readyState !== 4) {
        return
      }
      // 在请求未返回的时候，status为0,
      // 当XMLHttpRequest出错的时候，status也为0
      // 所以status为0的时候，不做处理
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transform(responseData, responseHeaders, config.transformResponse),
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }
      handleResponse(response)
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }
    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed width status code ${response.status}`, config, null, request, response))
      }
    }
  })
}