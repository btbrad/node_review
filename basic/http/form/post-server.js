const http = require('http')
const qs = require('querystring')

http
  .createServer((req, res) => {
    let arr = []
    req.on('data', (buffer) => {
      arr.push(buffer)
    })
    req.on('end', () => {
      let buf = Buffer.concat(arr)
      let query = qs.parse(buf.toString())
      console.log(query)
    })
  })
  .listen(8080, () => {
    console.log('server is running at http://localhost:8080')
  })
