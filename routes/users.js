const Router = require('koa-router')

const auth_mids = require('../middlewares/auth')

const router = Router()

router
    .use(auth_mids.verifyToken)    
    .get('/:user_id', async (ctx, next) => {
        const { user_id } = ctx.params
        
        if(user_id !== ctx.username) ctx.throw(403)
        return ctx.body = `Hello ${ctx.username}`
    })

module.exports = router