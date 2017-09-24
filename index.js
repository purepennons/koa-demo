const Koa = require('koa');
const fs = require('fs');
const http = require('http');
const https = require('https');
const Bluebird = require('bluebird');
const mongo = require('mongodb').MongoClient;
const cors = require('kcors');
const bodyParser = require('koa-body');
const static = require('koa-static');
const jsonPretty = require('koa-json');
const logger = require('koa-logger');

const formatter = require('./middlewares/formatter');
const router = require('./routes/');

const app = new Koa();

// const https_ops = {
//   key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/example.com/cert.pem'),
//   ca: fs.readFileSync('/etc/letsencrypt/live/example.com/chain.pem')
// }

const secret = 'Facebook is the future [By Roth Peng]';
app.context.secret = secret;
app.keys = [secret];

app.use(logger());

// db init
app.use(async (ctx, next) => {
  try {
    ctx.db = await mongo.connect('mongodb://localhost:27017/demo');
    await next();
  } catch (err) {
    throw err;
  }
});

app.use(bodyParser({ multipart: true }));
app.use(jsonPretty({ pretty: false, param: 'pretty' }));
app.use(cors());
app.use(static('./public'));

app.use(formatter.formatResponse);
app.use(router.routes());

app.on('error', (err, ctx) => {
  console.error('err', err);
});

http.createServer(app.callback()).listen(process.env.PORT || 4000);
// https.createServer(https_ops, app.callback()).listen(process.env.SECURE_PORT || 4001);

