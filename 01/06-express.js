const express = require('express')

const app = express()

app.get('/', (req, res)=>{
  res.end('Hello World')
})

app.get('/user', (req, res)=>{
  res.end(JSON.stringify({
    name: 'test',
    age: 20
  }))
})

app.listen(3000, () => {
  console.log('server running at 3000')
})