import axios, {AxiosError, AxiosTransformer} from '../../src/index'
import CancelToken from '../../src/cancel/cancelToken'
import qs from 'qs'
interface ResponseData<T=any> {
  code: number,
  result: T,
  message: string
}
interface User {
  name: string,
  age: number
}

const instance = axios.create({
  transformRequest: [function(data) {
    return qs.stringify(data)
  }, ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    console.log(data)
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})
const instance2 = axios.create({})
instance.defaults.headers.common['test2'] = 123
instance.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
instance.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
instance.interceptors.request.use(config => {
  config.headers.test = '63'
  return config
})

function getUser<T>() {
  return instance<ResponseData<T>>({
    url: '/api/simple/res',
    method: 'post',
    headers: {
      test: ''
    },
    data: {a: 1}
  })
  .then(res => console.log(res.data))
  .catch((err) => console.error(err))
}
function getUser2<T>() {
  return instance2<ResponseData<T>>({
    url: '/api/simple/res',
    method: 'post',
    headers: {
      test: ''
    },
    data: {a: 1}
  })
  .then(res => console.log(res.data))
  .catch((err) => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  const user2 = await getUser2<User>()
}

test()

const NODE_ENV = process.env.NODE_ENV || 'development'
if(NODE_ENV === 'development' && module.hot){
  module.hot.accept();
}