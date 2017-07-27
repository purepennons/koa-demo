const Router = require('koa-router')

const auth = require('./auth')
const users = require('./users')

const router = Router()

router
    .use('/auth', auth.routes(), auth.allowedMethods())
    .use('/users', users.routes(), users.allowedMethods())

module.exports = router