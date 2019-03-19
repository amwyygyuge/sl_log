'use strict'

const Controller = require('egg').Controller

class BaseControllerController extends Controller {
	constructor(ctx, Service) {
		super(ctx)
		this._Service = Service
	}
	async query() {
		const res = await this._Service.query(this.ctx.request.query)
		this.ctx.body = res
	}

	async create() {
		const res = await this._Service.create(this.ctx.request.body)
		this.ctx.body = res
	}

	async update() {
		const data = this.ctx.request.body
		const id = data.id
		delete data.id
		const res = await this._Service.update(id, data)
		this.ctx.body = !!res
	}

	async remove() {
		const res = await this._Service.remove(this.ctx.request.body.id)
		this.ctx.body = !!res
	}

	async detail() {
		const res = await this._Service.detail(this.ctx.request.body.id)
		this.ctx.body = res
	}
}

module.exports = BaseControllerController
