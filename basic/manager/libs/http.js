const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const { Form } = require('multiparty')
const { HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD } = require('../config')
const router = require('./router')

function handle(method, url, query, post, files) {
  let fn = router.findRouter(method, url)
  if (!fn) {
    // 文件
  } else {
    // 接口
  }
}

http
  .createServer((req, res) => {
    // 1.解析数据
    let { pathname, query } = url.parse(req.url, true)

    if (req.method === 'POST') {
      if (
        req.headers['content-type'].startsWith(
          'application/x-www-form-urlencoded'
        )
      ) {
        // 普通POST
        let arr = []
        res.on('data', (buffer) => {
          arr.push(buffer)
        })
        res.on(end, () => {
          let post = querystring.parse(Buffer.concat(arr).toString())
          // 找路由
          handle(method, url, query, post, {})
        })
      } else {
        // 文件POST
        let form = new Form({
          uploadDir: HTTP_UPLOAD,
        })
        form.parse(req)

        let post = {}
        let files = {}

        form.on('field', (name, value) => {
          post[name] = value
        })

        form.on('file', (name, file) => {
          files[name] = file
        })

        form.on('error', (err) => {
          console.log(err)
        })

        form.on('close', () => {
          // 找路由
          handle(method, url, query, post, files)
        })
      }
    } else {
      // GET
      // 找路由
      handle(method, url, query, {}, {})
    }
  })
  .listen(HTTP_PORT, () => {
    console.log(`server is running at http:localhost${HTTP_PORT}`)
  })
