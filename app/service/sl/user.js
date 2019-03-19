'use strict'

const BaseService = require('./../../common/BaseService')
class UserService extends BaseService {
	constructor() {
		const ctx = arguments[0]
		const model = ctx.model.Sl.User
		super(...arguments, model)
	}
}

module.exports = UserService
