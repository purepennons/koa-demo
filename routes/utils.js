const R = require('ramda');
const Router = require('koa-router');
const moment = require('moment-timezone');

const router = Router();

router.get('/now', async (ctx, next) => {
  let { region, city } = ctx.query;
  if (region) region = region.toString().toLowerCase();
  if (city) city = city.toString().toLowerCase();

  // set time zone
  let zone = 'Asia/Taipei';
  if (region && city) {
    const isValidZone = moment.tz.zone(`${region}/${city}`);
    if (!isValidZone) ctx.throw(400);
    zone = `${region}/${city}`;
  }
  
  now = moment().tz(zone);
  
  return (ctx.body = {
    timeZone: now.tz(),
    now: now.format()
  });
});

module.exports = router;
