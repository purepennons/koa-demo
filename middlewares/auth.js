const jwt = require("jsonwebtoken")

exports.verifyToken = async (ctx, next) => {
  const cookieToken = ctx.cookies.get("token")
  let { authorization } = ctx.header
  if (authorization) authorization = authorization.split(" ")
  const headerToken =
    authorization && authorization.length === 2 ? authorization[1] : null
  const { token: bodyToken } = ctx.request.body
  const { access_token: queryToken } = ctx.query
  const token = cookieToken || headerToken || bodyToken || queryToken

  if (!token) ctx.throw(401)

  try {
    const user = jwt.verify(token, ctx.secret)
    console.log("user", user)
    ctx.username = user.username
  } catch (err) {
    console.error("err", err)
    ctx.throw(401)
  }

  await next()
}
