import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { parseHeaders } from "../helpers/headers";
import { transformResponse } from "../helpers/data";
import { createError } from "../helpers/error";
import transform from './transform'
import { isURLSameOrigin } from "../helpers/url";
import cookie from "../helpers/cookie";
import { isFormData } from "../helpers/util";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // method和data可能没有， 所以给出默认值
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!)
    configureRequest()
    addEvents()
    processHeaders()
    processCancel()
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
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
    }

    function processHeaders(): void {
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        headers[xsrfHeaderName!] = xsrfValue
      }
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      Object.keys(headers).forEach((name) => {
        request.setRequestHeader(name, headers[name])
      })
    }
    console.log('headers', headers)

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed width status code ${response.status}`, config, null, request, response))
      }
    }
  })
}