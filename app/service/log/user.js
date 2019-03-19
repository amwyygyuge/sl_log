'use strict'

const Service = require('egg').Service

class UserService extends Service {
	async checkUser(log) {
		const email = log.data.user
		if (!email) return false
		const { os, sl, node } = log.data.context
		const { User } = this.ctx.model.Log
		const _user = await User.findOne({ email })
		if (_user) {
			_user.logs.push(log._id)
			_user.os = os
			_user.sl = sl
			_user.node = node
			return await _user.save()
		} else {
			return await User.create({
				logs: [ log._id ],
				sl,
				node,
				os,
				email,
				projects: []
			})
		}
	}
	async query(args) {
		const { withLogs, withProjects } = args
		delete args.withLogs
		delete args.withProjects
		const { conditions, options } = this.ctx.helper.resolveQuery(args)
		const { User } = this.ctx.model.Log
		let _user = User.find(conditions, null, options)
		if (withLogs) _user = _user.populate('logs')
		if (withProjects) _user = _user.populate('projects')
		return await _user
	}
	async update({ id, cname, name, email }) {
		const { User } = this.ctx.model.Log
		if (!id) return false
		return await User.findByIdAndUpdate(id, this.ctx.helper.filterObject({ cname, name, email }))
	}
}

module.exports = UserService
