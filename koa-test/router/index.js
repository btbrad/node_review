const Router = require('koa-router')

const router = new Router()

router.use('/user', require('./user'))

module.exports = router
