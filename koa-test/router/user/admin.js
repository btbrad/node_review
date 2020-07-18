const Router = require('koa-router')

const router = new Router()

router.get('/a', async (ctx) => {
  ctx.body = 'admin中的a'
})

module.exports = router.routes()
