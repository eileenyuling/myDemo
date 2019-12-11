const express = require('express')
const router = express.Router()
router.get('/demo1/get', (req, res) => {
  res.json({a: 1})
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf)
  })
})

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.post('/extend/post', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`,
      b: 222
    })
  }, 3000)
})
router.get('/extend/get', function(req, res) {
  setTimeout(() => {
    res.json({
      name: 'Lily',
      gender: true
    })
  }, 3000)
})
router.head('/extend/head', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.options('/extend/options', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.delete('/extend/delete', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.put('/extend/put', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.patch('/extend/patch', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
module.exports = router