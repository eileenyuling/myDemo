import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/api/extend/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/api/extend/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)
let cancel: Canceler

axios.get('/api/extend/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  console.log('Request canceled')
})

setTimeout(() => {
  cancel()
}, 200)
// axios.defaults.headers.common['test2'] = 123

// axios.interceptors.request.use(config => {
//   config.headers.test += '1'
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += '2'
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += '3'
//   return config
// })

// axios.interceptors.response.use(res => {
//   res.data += '1'
//   return res
// })
// let interceptor = axios.interceptors.response.use(res => {
//   res.data += '2'
//   return res
// })
// axios.interceptors.response.use(res => {
//   res.data += '3'
//   return res
// })

// axios.interceptors.response.eject(interceptor)

// axios({
//   url: '/api/extend/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })
// interface ResponseData<T = any> {
//   result: T,
//   code: string,
//   message: string
// }
// axios('/api/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hi1'
//   }
// })

// axios.request({
//   url: '/api/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// interface User {
//   name: string,
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/api/extend/get')
// }
// getUser<User>().then(res => {
//   console.log('res', res)
// })

// axios.get('/api/extend/get')

// axios.options('/api/extend/options')

// axios.delete('/api/extend/delete')

// axios.head('/api/extend/head')

// axios.post('/api/extend/post', { msg: 'post' })

// axios.put('/api/extend/put', { msg: 'put' })

// axios.patch('/api/extend/patch', { msg: 'patch' })
// axios({
//   method: 'post',
//   url: '/api/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// axios({
//   method: 'post',
//   url: '/api/base/post',
//   headers: {
//     'content-type': 'application/json;charset=UTF-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })
// axios({
//   method: 'post',
//   url: '/api/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/api/base/post',
//   data: searchParams
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/api/base/buffer',
//   data: arr
// })

const NODE_ENV = process.env.NODE_ENV || 'development'
if(NODE_ENV === 'development' && module.hot){
  module.hot.accept();
}