const Koa = require('koa')
const Bluebird = require('bluebird')
const mongo = require('mongodb').MongoClient
const cors = require('koa-cors')
const bodyParser = require('koa-body')
const static = require('koa-static')
const jsonPretty = require('koa-json')
const logger = require('koa-logger')

const router = require('./routes/')

const app = new Koa()


const secret = 'Facebook is the future [By Roth Peng]'
app.context.secret = secret
app.keys = [secret]

app.use(logger())

// db init
app.use(async (ctx, next) => {
    try {
        ctx.db = await mongo.connect('mongodb://localhost:27017/demo')
        await next()
    } catch (err) {
        throw err
    }
})

app.use(bodyParser({ multipart: true }))
app.use(jsonPretty({ pretty: false, param: 'pretty' }))
app.use(cors())
app.use(static('./public'))

app.use(router.routes())

app.on('error', (err, ctx) => {
    console.error('err')
})

app.listen(3333)