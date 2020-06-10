const http = require('http')

http
  .createServer((req, res) => {
    res.setHeader('access-control-allow-origin', '*')
    res.write(JSON.stringify({ a: 10, b: 20 }))
    res.end()
  })
  .listen(8080, () => {
    console.log('server is running at http://localhost:8080')
  })
