'use strict'
module.exports = () => {
	return async function(ctx, next) {
		await next()
		if (ctx.body === true) {
			ctx.body = { message: '请求成功', code: 0 }
		}
		if (ctx.body === false) {
			ctx.body = { message: '请求失败', code: -1 }
		}
		if (ctx.body === null) {
			ctx.body = { message: '请求失败', code: -1 }
		}
	}
}
