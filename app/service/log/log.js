'use strict'

const Service = require('egg').Service
const fixRex = /(\.)(?=\D)/g
const isIdInArray = (id, array = []) => array.includes(id)
class LogService extends Service {
	async create(log = {}) {
		if (!log.type) return false
		let dependencies = log.data.context.dependencies
		log.data.context.dependencies = JSON.parse(JSON.stringify(dependencies).replace(fixRex, '-'))
		const logString = JSON.stringify(log).replace(/\\n/g, '')
		const res = await this.ctx.model.Log.Log.create(JSON.parse(logString))
		if (res) {
			await this.correlationUserProject(res)
			return true
		}
		return false
	}

	async correlationUserProject(log) {
		const { user, project } = this.ctx.service
		const _user = await user.checkUser(log)
		const _project = await project.checkProject(log)
		if (!(_user && _project)) return false
		if (!isIdInArray(_project._id, _user.projects)) {
			_user.projects.push(_project._id)
			await _user.save()
		}
		if (!isIdInArray(_user._id, _project.users)) {
			_project.users.push(_user._id)
			await _project.save()
		}
	}

	async query(args) {
		const { endTime = null, startTime = null } = args
		delete args.endTime
		delete args.startTime
		return await this.ctx.model.Log.Log.findByTimeRange(args, [ startTime, endTime ], 'date')
	}

	async remove({ ids }) {
		const res = await this.ctx.model.Log.Log.deleteMany({ _id: { $in: ids } })
		if (res) {
			return true
		}
	}

	async count(args) {
		const { endTime = null, startTime = null } = args
		delete args.endTime
		delete args.startTime
		return await this.ctx.model.Log.Log.countByTimeRange(args, [ startTime, endTime ], 'date')
	}
}

module.exports = LogService
