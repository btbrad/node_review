const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const app = express()
const PORT = 3000

let obj = multer({ dest: './static/upload' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(obj.any())
app.use(cookieParser())
app.use(
  cookieSession({
    keys: ['sdafsdfsdfsdfsfsfs', 'asfdasdadadadadad', 'asdqdgvbfdhEFWEFWE'],
    maxAge: 60 * 60 * 24,
  })
)

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

// 处理cookie
app.get('/c', (req, res, next) => {
  console.log(req.cookies)
  res.cookie('b', '123456', {
    maxAge: 14 * 60 * 60 * 60 * 1000,
  })
  res.send('ok')
})

//处理session
app.get('/d', (req, res, next) => {
  req.session.views = (req.session.views || 0) + 1
  res.send(`你到访了${req.session.views}次`)
})

// 设置静态资源目录 一定要写在接口的后面 static自带中间件
app.use(express.static('./static/'))

app.listen(PORT, () => {
  console.log(`express is running at http://localhost:${PORT}`)
})
