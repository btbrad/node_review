const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const PORT = 3000

let obj = multer({ dest: './static/upload' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(obj.any())

// 处理get请求
app.get('/a', (req, res, next) => {
  console.log(req.query) // 直接获取query
  res.send('aaa')
  console.log('a')
  next()
})

app.get('/a', (req, res, next) => {
  console.log('bbb')
})

// 处理post请求 使用body-parser
app.post('/b', (req, res, next) => {
  console.log(req.body) // 获取post的body数据
  res.send('bbb')
})

// 处理上传文件
app.post('/upload', (req, res, next) => {
  console.log('上传文件', req.files)
  res.send('上传完成')
})

// 设置静态资源目录 一定要写在接口的后面 static自带中间件
app.use(express.static('./static/'))

app.listen(PORT, () => {
  console.log(`express is running at http://localhost:${PORT}`)
})
