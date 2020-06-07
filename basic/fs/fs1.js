const fs = require('fs')

// fs.writeFile('./a.txt', 'this is node.js', (err) => {
//   if (err) {
//     console.log('失败', err)
//   } else {
//     console.log('成功')
//   }
// })

fs.readFile('./a.txt', (err, data) => {
  if (err) {
    console.log('失败', err)
  } else {
    console.log('成功', data.toString())
  }
})
