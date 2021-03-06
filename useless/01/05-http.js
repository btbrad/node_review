const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response)=>{
  const { url, method, headers } = request

  if (url === '/' && method === 'GET') {
    // 静态页面服务
    fs.readFile('index.html', (err, data)=>{
      if (err) return
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(data)
    })
  } else if (url === '/user' && method === 'GET') {
     // ajax服务
     response.writeHead(200, {
       'Content-Type': 'application/json'
     })
     response.end(JSON.stringify({
       name: 'test'
     }))
  } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
    // 图片文件服务
    fs.createReadStream('./'+url).pipe(response)
}
})

server.listen(3000)
console.log('server is running at port 3000')