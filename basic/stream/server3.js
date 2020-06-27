const http = require('http')
const fs = require('fs')
const url = require('url')
const zlib = require('zlib')

const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true)
  let filename = 'www' + pathname
  fs.stat(filename, (err, stat) => {
    if (err) {
      res.writeHead(404)
      res.write('NOT FOUND!!!!')
      res.end()
    } else {
      let rs = fs.createReadStream(filename)
      res.on('error', () => {})
      res.setHeader('content-encoding', 'gzip')
      const gzip = zlib.createGzip()
      rs.pipe(gzip).pipe(res)
    }
  })
})

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
