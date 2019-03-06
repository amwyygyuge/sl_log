'use strict'

const Controller = require('egg').Controller

class NpmController extends Controller {
	async index() {
		const { npm } = this.ctx.service
		const { name, version } = this.ctx.params
		const result = await npm.index({ name, version })
		this.ctx.response.body = result
	}
}
module.exports = NpmController
