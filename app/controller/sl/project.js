'use strict'

const BaseController = require('./../../common/BaseController')

class ProjectController extends BaseController {
	constructor() {
		const ctx = arguments[0]
		const project = ctx.service.sl.project
		super(...arguments, project)
	}
}

module.exports = ProjectController
