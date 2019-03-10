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

	async query(args) {
		const { endTime = null, startTime = null } = args
		delete args.endTime
		delete args.startTime
		const logs = await this.ctx.model.Log.findByTimeRange(args, [ startTime, endTime ], 'date')
		return logs
	}

	async remove({ ids }) {
		const res = await this.ctx.model.Log.deleteMany({ _id: { $in: ids } })
		if (res) {
			return true
		}
	}
}

module.exports = LogService
