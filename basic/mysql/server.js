const http = require('http')
const fs = require('fs')
const url = require('url')
const mysql = require('mysql')
const co = require('co-mysql')

const PORT = 3000

let conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node-test20200623',
})

let db = co(conn)

let server = http.createServer(async (req, res) => {
  let { pathname, query } = url.parse(req.url, true)
  console.log(`-------------------------------------------`, pathname, query)
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
      try {
        // 1. 校验用户名是否存在
        let data = await db.query(
          `select id from users where username='${username}'`
        )
        if (data.length > 0) {
          res.write(`用户名已存在`)
          res.end()
        } else {
          // 2. 若不存在,存入数据库
          let data = await db.query(
            `insert into users(username, password) values('${username}', '${password}') `
          )
          console.log(1111, data)
          res.write(`注册成功`)
          res.end()
        }
      } catch (e) {
        console.log(e)
        res.write('数据库错误')
        res.end()
      }
    }
  } else if (pathname === '/login') {
    let { username, password } = query
    console.log(1111, pathname, username, password)
    try {
      let data = await db.query(
        `select password from users where username='${username}'`
      )
      console.log(`login`, data)
      if (data.length < 1) {
        res.write(`用户名不存在`)
        res.end()
      } else {
        let pass = JSON.parse(JSON.stringify(data[0])).password
        if (password === pass) {
          res.write(`登录成功`)
          res.end()
        } else {
          res.write(`密码错误`)
          res.end()
        }
      }
    } catch (e) {
      console.log(e)
      res.write('数据库错误')
      res.end()
    }
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
