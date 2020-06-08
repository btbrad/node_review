const http = require('http')
const url = require('url')
const qs = require('querystring')
const fs = require('fs')
const Path = require('path')

let users = {
  admin: '123456',
}

http
  .createServer((req, res) => {
    console.log(req.url)
    let path = '',
      get = {},
      post = {}

    if (req.method === 'GET') {
      let { pathname, query } = url.parse(req.url, true)
      path = pathname
      get = query
      complete(path, get)
    } else if (req.method === 'POST') {
      let arr = []
      path = req.url
      req.on('data', (buffer) => {
        arr.push(buffer)
      })
      req.on('end', () => {
        let buffer = Buffer.concat(arr)
        post = qs.parse(buffer)
        complete(path, post)
      })
    }

    function complete() {
      console.log('111111', path, get, post)
      if (path === '/reg') {
        let { username, password } = get
        if (users[username]) {
          res.write(JSON.stringify({ error: 1, msg: '用户名已存在' }))
          res.end()
        } else {
          users[username] = password
          res.write(JSON.stringify({ error: 0, msg: '注册成功' }))
          res.end()
        }
      } else if (path === '/login') {
        let { username, password } = get
        if (!users[username]) {
          res.write(JSON.stringify({ error: 1, msg: '此用户不存在' }))
          res.end()
        } else if (users[username] === password) {
          res.write(JSON.stringify({ error: 0, msg: '登录成功' }))
          res.end()
        } else {
          res.write(JSON.stringify({ error: 1, msg: '密码不对' }))
          res.end()
        }
      } else {
        fs.readFile(Path.join(__dirname, path), (err, buffer) => {
          if (err) {
            res.writeHead(404)
            res.write('Not Found')
            res.end()
          } else {
            res.write(buffer)
            res.end()
          }
        })
      }
    }
  })
  .listen('8080', () => {
    console.log('server is running at http://localhost:8080')
  })
