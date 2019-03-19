'use strict'

const Service = require('egg').Service

class BaseService extends Service {
	constructor(ctx, Model, populates = false, total = false) {
		super(ctx)
		this.resolveQuery = this.ctx.helper.resolveQuery
		this._Model = Model
		this.populates = populates
		this.total = total
	}

	/**
   *
   * @param {Object} args
   * @description 查询
   */
	async query(args) {
		const { resolveQuery, _Model, populates, total, ctx } = this
		const { conditions, options } = resolveQuery(args)
		if (total) {
			const total = await _Model.count(conditions)
			ctx.set('X-Pagination-Current-Page', total)
			ctx.set('Access-Control-Expose-Headers', 'X-Pagination-Current-Page')
		}
		if (populates) {
			return await populates(_Model.find(conditions, null, options))
		}
		return await _Model.find(conditions, null, options)
	}

	/**
   * 
   * @param {Object} args
   * @description 创建
   */
	async create(args) {
		return await this._Model.create(args)
	}

	/**
    *
    * @param {Object} args
    * @description 更新
    */
	async update(id, data) {
		if (!id) return false
		return await this._Model.findByIdAndUpdate(id, data)
	}

	/**
    *
    * @param {Object} args
    * @description 删除
    */
	async remove(id) {
		if (!id) return false
		return await this._Model.findByIdAndDelete(id)
	}

	/**
   * 
   * @param {Object} id
   * @description 详情
  */
	async detail(id) {
		if (!id) return false
		const { _Model, populates } = this
		if (populates) {
			return populates(await _Model.findById(id))
		}
		return await _Model.findById(id)
	}
}

module.exports = BaseService
