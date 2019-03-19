'use strict'

const BaseController = require('./../../common/BaseController')

class UserController extends BaseController {
	constructor() {
		const ctx = arguments[0]
		const user = ctx.service.sl.user
		super(...arguments, user)
	}
}

module.exports = UserController
