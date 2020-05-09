const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

  console.log('a user connected')
  
  socket.on('chat message', (msg) => {

    console.log('chat message:' + msg)
    // 广播给所有人
    io.emit('chat message', msg)
    // 广播给除了发送者所有外人
    // socket.broadcast.emit('chat message', msg)
  });

  socket.on('disconnect', function() {
    console.log('user disconnected')
  })

});

http.listen(3000, ()=>{
  console.log('listening on localhost:3000')
})