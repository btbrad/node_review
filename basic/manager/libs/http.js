const http = require('http')
const fs = require('fs')
const url = require('url')
const querystring = require('querystring')
const zlib = require('zlib')
const { Form } = require('multiparty')
const { HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD } = require('../config')
const router = require('./router')

http
  .createServer((req, res) => {
    res.writeJson = (json) => {
      res.setHeader('content-type', 'application/json')
      res.write(JSON.stringify(json))
    }
    // 处理请求
    async function handle(method, url, get, post, files) {
      let fn = router.findRouter(method, url)
      console.log(fn)
      if (!fn) {
        // 文件
        let filepath = HTTP_ROOT + pathname
        fs.stat(filepath, (err, stat) => {
          if (err) {
            res.writeHeader(404)
            res.write('NOT FOUND')
            res.end()
          } else {
            let rs = fs.createReadStream(filepath)
            rs.on('error', () => {
              console.log('fs read stream error')
            })
            let gz = zlib.createGzip()
            res.setHeader('content-encoding', 'gzip')
            rs.pipe(gz).pipe(res)
          }
        })
      } else {
        // 接口
        try {
          await fn(res, get, post, files)
        } catch (e) {
          console.log(e)
          res.writeHeader(500)
          res.write('Internal Server Error')
          res.end()
        }
      }
    }

    // 1.解析数据
    let { pathname, query } = url.parse(req.url, true)

    if (req.method === 'POST') {
      console.log(pathname)
      if (
        req.headers['content-type'].startsWith(
          'application/x-www-form-urlencoded'
        )
      ) {
        console.log('普通post')
        // 普通POST
        let arr = []
        req.on('data', (buffer) => {
          arr.push(buffer)
        })
        req.on('end', () => {
          let post = querystring.parse(Buffer.concat(arr).toString())
          console.log(post)
          // 找路由
          handle(req.method, req.url, query, post, {})
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
          handle(req.method, req.url, query, post, files)
        })
      }
    } else {
      // GET
      // 找路由
      handle(req.method, pathname, query, {}, {})
    }
  })
  .listen(HTTP_PORT, () => {
    console.log(`server is running at http:localhost:${HTTP_PORT}`)
  })
