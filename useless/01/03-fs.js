const fs = require('fs')

// 同步
const data = fs.readFileSync('./test.txt')
console.log(data.toString())


// 异步
fs.readFile('./test.txt', (err, data)  => {
  if (err) return
  console.log(data.toString()) 
})