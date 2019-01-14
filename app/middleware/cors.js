'use strict';
module.exports = () => {
  return async function(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*'); // 这个表示任意域名都可以访问，这样写不能携带cookie了。
    // res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');// 设置方法
    if (ctx.method === 'OPTIONS') {
      ctx.status = 200;// 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    } else {
      await next();
    }
  };
};
