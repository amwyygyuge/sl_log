'use strict';
module.exports = () => {
  return async function(ctx, next) {
    await next();
    if (ctx.body === true) {
      ctx.body = { message: '请求成功', code: 0 };
    }
  };
};
