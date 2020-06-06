const os = require('os')
const getStat = require('./newFile')
const mem = os.freemem() / os.totalmem()
console.log(`内存占用率${mem.toFixed(2)}`)

setInterval(() => {
  getStat()
}, 1000);
