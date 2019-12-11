import axios, { AxiosError }from '../../src/index'

axios({
  method: 'get',
  url: '/api/error/get1'
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
console.log(e)
})

axios({
  method: 'get',
  url: '/api/error/get'
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/api/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log(e)
  })
}, 5000)

axios.get('/api/error/timeout', {
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e)
})

const NODE_ENV = process.env.NODE_ENV || 'development'
if(NODE_ENV === 'development' && module.hot){
  module.hot.accept();
}