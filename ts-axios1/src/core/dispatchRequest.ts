import { AxiosRequestConfig, AxiosPromise } from '../types/index'
import { transformRequest, processHeaders, buildUrl, flattenHeaders, transformResponse } from '../helpers/util'
import xhr from './xhr'
import transform from './transform'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // const headers = transformHeaders(config)
  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosRequestConfig): any {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested (config: AxiosRequestConfig): void {
  if (config.CancelToken) {
    config.CancelToken.throwIfRequested()
  }
}


export default dispatchRequest
