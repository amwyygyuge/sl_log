'use strict'

const Controller = require('egg').Controller

class ProjectController extends Controller {
	async query() {
		const { project } = this.ctx.service
		const res = await project.query(this.ctx.request.query)
		this.ctx.body = res
	}
	async update() {
		const { project } = this.ctx.service
		const res = await project.update(this.ctx.request.body)
		this.ctx.body = res
	}

	async remove() {
		const { project } = this.ctx.service
		const res = await project.remove(this.ctx.request.body)
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

module.exports = ProjectController
