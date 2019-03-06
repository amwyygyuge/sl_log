'use strict'

const Controller = require('egg').Controller

class NpmController extends Controller {
	async index() {
		const { npm } = this.ctx.service
		const { name, version } = this.ctx.params
		const result = await npm.index({ name, version })
		if (result) {
			this.ctx.response.body = result
		} else {
			this.ctx.response.status = 400
			this.ctx.response.body = '未找到相对应的包或版本号'
		}
	}
}
module.exports = NpmController
