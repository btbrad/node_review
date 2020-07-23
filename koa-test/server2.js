const Koa = require('koa')
const app = new Koa()

// logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next)=>{
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.context.test = 'xxx'

// response
app.use(async (ctx) => {
  ctx.body = 'Hello World'
  console.log(ctx.test)
  console.log(ctx.request.ip)
})

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`)
  console.log(app.env)
  console.log(app.keys)
  console.log(app.proxy)
})