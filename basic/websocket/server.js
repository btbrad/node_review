const http = require('http')
const socket = require('socket.io')
const chalk = require('chalk')

const PORT = 8080

const server = http.createServer((req, res) => {})

server.listen(PORT, () => {
  console.log(chalk.blue(`server is running at http://localhost:${PORT}`))
})

let wsServer = socket.listen(server)
wsServer.on('connection', (sock) => {
  sock.on('add', (a, b) => {
    console.log(chalk.yellow(a + b))
  })
  setInterval(() => {
    sock.emit('timer', new Date())
  }, 1000)
})
