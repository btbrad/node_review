const fs = require('fs')
const gzip = require('zlib')

const rs = fs.createReadStream('./1.txt')

const gz = gzip.createGzip()

const ws = fs.createWriteStream('./2.txt.gz')

rs.pipe(gz).pipe(ws)

rs.on('error', (err) => {
  console.log(err)
})

ws.on('finish', (done) => {
  console.log('完成')
})
