exports.formatResponse = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    throw err;
  }

  if (ctx.body && !ctx.disableFormat) {
    ctx.body = {
      code: 200,
      message: 'success',
      data: ctx.body
    };
  }
};
