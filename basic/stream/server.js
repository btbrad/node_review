const fs = require('fs')

const rs = fs.createReadStream('./1.txt')
const ws = fs.createWriteStream('./2.txt')

rs.pipe(ws)

rs.on('error', (err) => {
  console.log(err)
})

ws.on('finish', (done) => {
  console.log('完成')
})
