const config = require('./config')
const db = require('./libs/database')
const http = require('./libs/http')
const { addRouter } = require('./libs/router')

addRouter('get', '/aaa', async (res, get, post, files) => {
  res.write('aaaaaaaaaaaaaaaa')
  res.end()
})
