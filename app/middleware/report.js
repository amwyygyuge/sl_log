'use strict';
module.exports = () => {
  return async function(ctx, next) {
    const start_time = Date.now();
    await next();
    ctx.app.logger.info('runtiem:', Date.now() - start_time);
  };
};
