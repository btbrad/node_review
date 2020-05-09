const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response)=>{

  const { method, url } = request

  if (method === 'GET' && url === '/') {
    fs.readFile('./index.html', (err, data)=>{
      if (err) return
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if(method === 'GET' && url === '/user') {
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    // res.setHeader('Access-Control-Allow-Origin', '*')
    response.end(JSON.stringify({name: 'test'}))
  } else if (method === "OPTIONS" && url === "/user") {
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        // "Access-Control-Allow-Methods": "PUT"
      });
      response.end();
    }
})

server.listen(3000)
console.log('server is running at port 3000 !!!')