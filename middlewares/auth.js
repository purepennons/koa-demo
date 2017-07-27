const jwt = require('jsonwebtoken')

exports.verifyToken = async (ctx, next) => {
    const token = ctx.cookies.get('token')
    if (!token) ctx.throw(401)
    
    try {
        const user = jwt.verify(token, ctx.secret)
        console.log('user', user)
        ctx.username = user.username
    } catch (err) {
        ctx.throw(401)
    }
    
    await next()
}