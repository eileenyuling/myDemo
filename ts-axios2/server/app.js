const webpack = require('webpack')
const bodyParser = require('body-parser')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()
const page = require('./page')
const api = require('./api')
const compiler = webpack(webpackConfig)
// const multipart = require('connect-multiparty')
app.use(webpackDevMiddleware(compiler, {
  publicPath: path.resolve(__dirname, '../dist'),
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(webpackHotMiddleware(compiler))
app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// app.use(multipart({
//   uploadDir: path.resolve(__dirname, '../../upload-file')
// }))
app.use('/template', page)
app.use('/api', api)
router.get('/', (req, res) => {
  const dir = path.resolve(__dirname, '../examples')
  res.render(`${dir}/index`)
})

app.use(router, (req, res, next) => {
  res.cookie('XSRF-TOKEN-D', '1234567')
  next()
})
const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log('http://localhost:8080')
})