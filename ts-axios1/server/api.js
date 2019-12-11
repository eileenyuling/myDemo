const express = require('express')
const router = express.Router()
router.get('/simple/get', (req, res) => {
  res.json(req.body)
})
router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/simple/res', (req, res) => {
  res.json({
    name: 'jack',
    age: 20
  })
})

router.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.json({
      name: 'jack get',
      age: 20
    })
  }, 2000)
})

router.get('/cancel/get1', (req, res) => {
  setTimeout(() => {
    res.json({
      name: 'jack get',
      age: 20
    })
  }, 2000)
})

router.post('/cancel/post', (req, res) => {
  res.json({
    name: 'jack post',
    age: 20
  })
})


router.post('/base/timeout', (req, res) => {
  setTimeout(() => {
    res.json(req.body)
  }, 5000)
})
module.exports = router