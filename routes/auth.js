const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const router = Router()

router
    .post('/register', async (ctx, next) => {
        const { db } = ctx
        const { username, password } = ctx.request.body
        console.log(ctx.request.body)
        if (username && password) {
            const Users = db.collection('users')
            const user = await Users.findOne({ username })
            console.log('user', user)
            if (user) return ctx.body = 'user exists'
            
            const result = await Users.insertOne({ username, password })
            console.log('result', result)
            return ctx.body = 'a user has been created'
        } else {
            ctx.throw(400)
        }
    })
    .post('/login', async (ctx, next) => {
        const { db } = ctx
        const { username, password } = ctx.request.body
        if (username && password) {
            const Users = db.collection('users')
            const user = await Users.findOne({ username })
            console.log('user', user)

            if (!user || user.password !== password) return ctx.throw(401)
            const token = jwt.sign({ username }, ctx.secret)
            ctx.cookies.set('token', token, { signed: true, httpOnly: true })
            ctx.body = token
        } else {
            ctx.throw(400)
        }
    })
    .post('/logout', async (ctx, next) => {
        ctx.cookies.set('token', null)
        ctx.body = 'logout'
    })

module.exports = router