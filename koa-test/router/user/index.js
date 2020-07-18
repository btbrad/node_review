const Router = require('koa-router')

const router = new Router()

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const { name } = ctx.query
  ctx.body = `user---${id}---${name}`
})

router.use('/admin', require('./admin'))
router.use('/editor', require('./editor'))

module.exports = router.routes()
