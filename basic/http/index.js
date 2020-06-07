const http = require('http')

const server = http.createServer((request, response) => {
  console.log('服务起来了!')
  // console.log('-----------------request----------', request)
  // console.log('-----------------response----------', response)
  response.write('abc')
  response.end()
})

server.listen(8080, () => {
  console.log('server is running at localhost:8080')
})
