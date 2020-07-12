const express = require('express')
const app = express()
const PORT = 3000

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

app.post('/b', (req, res, next) => {
  res.send('bbb')
})

// 设置静态资源目录 一定要写在接口的后面 static自带中间件
app.use(express.static('./static/'))

app.listen(PORT, () => {
  console.log(`express is running at http://localhost:${PORT}`)
})
