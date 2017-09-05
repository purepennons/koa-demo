const R = require('ramda')
const Router = require("koa-router")

const auth_mids = require("../middlewares/auth")

const router = Router()

router
  .use(auth_mids.verifyToken)
  .get("/me", async (ctx, next) => {
    const { db, username } = ctx
    console.log("username", username)
    const Users = db.collection("users")
    const user = await Users.findOne({ username }, { password: 0 })
    if (user) return (ctx.body = user)
  })
  .get("/:userName", async (ctx, next) => {
    const { db, username } = ctx
    const { userName } = ctx.params
    const Users = db.collection("users")
    const user = await Users.findOne({ username }, { password: 0 })
    if (user) return (ctx.body = user)
  })
  .put("/:userName", async (ctx, next) => {
    const { db, username } = ctx
    const { userName } = ctx.params
    if (userName !== username) ctx.throw(403)
    const update_data = R.pick(['password', 'email', 'phone', 'birthday'], ctx.request.body)
    const Users = db.collection("users")
    const update_result = await Users.update({ username }, {
      $set: update_data,
    }, { upsert: true })
    const user = await Users.findOne({ username }, { password: 0 })
    if (user) return (ctx.body = user)
  })

module.exports = router
