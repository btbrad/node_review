const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000

http.createServer((req, res) => {
  let {method, url} = req
  if (method === 'GET' && url === '/index.html') {
    fs.readFile(path.resolve(__dirname, `./www${url}`), (err, buffer) => {
      if (err) {
        console.log(err)
        return
      }
      res.write(buffer)
      res.end()
    })
  }
}).listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
