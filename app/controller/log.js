'use strict'

const Controller = require('egg').Controller

class LogController extends Controller {
	async query() {
		const { log } = this.ctx.service
		const res = await log.query()
		this.ctx.body = res
	}

	async create() {
		const { log } = this.ctx.service
		const res = await log.create(this.ctx.request.body)
		this.ctx.body = res
	}
}

module.exports = LogController
