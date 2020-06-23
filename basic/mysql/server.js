const http = require('http')
const fs = require('fs')
const url = require('url')
const mysql = require('mysql')

const PORT = 3000

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node-test20200623',
})

let server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true)
  if (pathname === '/reg') {
    let { username, password } = query
    if (!username || !password) {
      res.write('用户名或密码为空')
      res.end()
    } else if (username.length > 32) {
      res.write(`用户名不能大于32位`)
      res.end()
    } else if (password.length > 32) {
      res.write(`密码不能大于32位`)
      res.end()
    } else {
      // 1. 校验用户名是否存在
      db.query(
        `select id from users where username='${username}'`,
        (err, data) => {
          if (err) {
            console.log(err)
          } else if (data.length > 0) {
            res.write(`用户名已存在`)
            res.end()
          } else {
            // 2. 若不存在,存入数据库
            db.query(
              `insert into users(username, password) values('${username}', '${password}') `,
              (err, data) => {
                if (err) {
                  console.log(err)
                } else {
                  res.write(`注册成功`)
                  res.end()
                }
              }
            )
          }
        }
      )
    }
  } else if (pathname === '/login') {
  } else {
    fs.readFile(`www${pathname}`, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        res.write(data)
        res.end()
      }
    })
  }
})

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
