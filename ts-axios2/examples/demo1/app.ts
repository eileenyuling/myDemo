import axios from '../../src/index'
axios({
  url: '/api/demo1/get',
  params: {
    a: 1,
    b: 2
  }
})
axios({
  url: '/api/demo1/get#test',
  params: {
    a: 1,
    b: 2
  }
})
axios({
  url: '/api/demo1/get#test'
})
axios({
  url: '/api/demo1/get',
  params: {
    foo: ['bar', 'baz']
  }
})
axios({
  method: 'get',
  url: '/api/demo1/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})
axios({
  method: 'get',
  url: '/api/demo1/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/api/demo1/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/api/demo1/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/api/demo1/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/api/demo1/get',
  params: {
    date
  }
})