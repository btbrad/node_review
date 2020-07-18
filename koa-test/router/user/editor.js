const Router = require('koa-router')

const router = new Router()

router.get('/a', async (ctx) => {
  ctx.body = 'editor中的a'
})

module.exports = router.routes()
