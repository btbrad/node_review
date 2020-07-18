const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app.use(router.routes())

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

router.get('/a', async (ctx) => {
  ctx.body = 'aaa'
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
