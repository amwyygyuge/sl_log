'use strict'

const Controller = require('egg').Controller

class LogController extends Controller {
	async query() {
		const { log } = this.ctx.service
		const res = await log.query(this.ctx.request.query)
		this.ctx.body = res
	}

	async create() {
		const { log } = this.ctx.service
		const res = await log.create(this.ctx.request.body)
		this.ctx.body = res
	}

	async remove() {
		const { log } = this.ctx.service
		const res = await log.remove(this.ctx.request.body)
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

module.exports = LogController
