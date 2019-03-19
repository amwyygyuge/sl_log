'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
	async query() {
		const { project } = this.ctx.service.log
		const res = await project.query(this.ctx.request.query)
		this.ctx.body = res
	}
	async update() {
		const { project } = this.ctx.service.log
		const res = await project.update(this.ctx.request.body)
		this.ctx.body = !!res
	}

	async remove() {
		const { project } = this.ctx.service.log
		const res = await project.remove(this.ctx.request.body)
		this.ctx.body = !!res
	}
}

module.exports = ProjectController
