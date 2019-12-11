const express = require('express')
const router = express.Router()
const path = require('path')
const dir = path.resolve(__dirname, '../examples')
router.get('/simple', (req, res) => {
  res.render(`${dir}/cancel/index`)
})
router.get('/demo1', (req, res) => {
  res.render(`${dir}/demo1/index`)
})
router.get('/demo2', (req, res) => {
  res.render(`${dir}/demo2/index`)
})
router.get('/demo-error', (req, res) => {
  res.render(`${dir}/demo-error/index`)
})
module.exports = router