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

router.get('/login', async (ctx) => {
  let { username, password } = ctx.query
  // if (!username || !password) {
  //   ctx.throw(400, 'neither username nor password can be empty!')
  // } else {
  //   ctx.body = '登录成功!'
  // }
  ctx.assert(username, 400, 'username can not be empty')
  ctx.assert(password, 400, 'password can not be empty')
  ctx.body = '成功'
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
