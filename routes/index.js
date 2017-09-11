const Router = require('koa-router');

const utils = require('./utils')
const auth = require('./auth');
const users = require('./users');

const router = Router();

router
  .use('/utils', utils.routes(), utils.allowedMethods())
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/users', users.routes(), users.allowedMethods());

module.exports = router;
