'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
	async query() {
		const { user } = this.ctx.service
		const res = await user.query(this.ctx.request.query)
		this.ctx.body = res
	}
	async update() {
		const { user } = this.ctx.service
		const res = await user.update(this.ctx.request.body)
		this.ctx.body = res
	}

	async remove() {
		const { user } = this.ctx.service
		const res = await user.remove(this.ctx.request.body)
		if (res) {
			this.ctx.body = {
				code: 0,
				msg: '删除成功'
			}
		} else {
			this.ctx.body = {
				code: -1,
				msg: '删除失败'
			}
		}
	}
}

module.exports = UserController
