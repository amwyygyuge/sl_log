'use strict'

const Service = require('egg').Service
const fixRex = /(\.)(?=\D)/g
class LogService extends Service {
	async create(log = {}) {
		const logString = JSON.stringify(log).replace(fixRex, '-')
		const res = await this.ctx.model.Log.create(JSON.parse(logString))
		if (res) {
			return true
		}
		return false
	}

	async query() {
		const logs = await this.ctx.model.Log.find()
		return logs
	}
}

module.exports = LogService
