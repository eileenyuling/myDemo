const express = require('express')
const router = express.Router()
const path = require('path')
const dir = path.resolve(__dirname, '../examples')
router.get('/simple', (req, res) => {
  res.render(`${dir}/cancel/index`)
})
module.exports = router