const webpack = require('webpack')
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()
const page = require('./page')
const api = require('./api')
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/template', page)
app.use('/api', api)
router.get('/', (req, res) => {
  const dir = path.resolve(__dirname, '../examples')
  res.render(`${dir}/index`)
})

app.use(router)
const port = process.env.PORT || 8088
module.exports = app.listen(port, () => {
  console.log('http://localhost:8088')
})