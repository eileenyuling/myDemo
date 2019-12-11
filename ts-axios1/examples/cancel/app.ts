import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/api/cancel/get1', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/api/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler


axios.get('/api/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)

const NODE_ENV = process.env.NODE_ENV || 'development'
if(NODE_ENV === 'development' && module.hot){
  module.hot.accept();
}