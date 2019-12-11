import { AxiosRequestConfig, AxiosResponse } from "../types"

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  // request?: XMLHttpRequest
  reponse?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    // request?: XMLHttpRequest,
    reponse?: AxiosResponse
  ) {
    super(message) // 调用父类Error的constructor(message)
    this.config = config
    this.code = code
    this.request = request
    this.reponse = reponse
    this.isAxiosError = true
    // 为了解决ts继承一些内置对象时候的坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  // request?: XMLHttpRequest,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}