const http = require('http')
const fs = require('fs')
const path = require('path')

http
  .createServer((req, res) => {
    console.log(req.url)
    const filePath = path.resolve(__dirname, `./www${req.url}`)
    console.log(`www${req.url}`)
    console.log(filePath)
    fs.readFile(filePath, (err, buffer) => {
      if (err) {
        res.writeHead(400)
        res.write('Not Found')
        res.end()
      } else {
        res.write(buffer)
        res.end()
      }
    })
  })
  .listen(8080, () => {
    console.log('server is running at http://localhost:8080')
  })
