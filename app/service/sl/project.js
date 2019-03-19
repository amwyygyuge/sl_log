'use strict'

const BaseService = require('../../common/BaseService')
class ProjectService extends BaseService {
	constructor() {
		const ctx = arguments[0]
		const model = ctx.model.Sl.Project
		super(...arguments, model)
	}
}

module.exports = ProjectService
