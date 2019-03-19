'use strict'

const Service = require('egg').Service

class ProjectService extends Service {
	async checkProject(log) {
		const { project, dependencies } = log.data.context
		if (!project) return false
		const { Project } = this.ctx.model
		const _project = await Project.findOne({ project })
		if (_project) {
			_project.logs.push(log._id)
			_project.dependencies = dependencies
			return _project.save()
		} else {
			return await Project.create({
				logs: [ log._id ],
				project,
				dependencies,
				users: []
			})
		}
	}
	async query(args) {
		const { withLogs, withUsers } = args
		delete args.withLogs
		delete args.withUsers
		const { conditions, options } = this.ctx.helper.resolveQuery(args)
		const { Project } = this.ctx.model
		let _project = Project.find(conditions, null, options)
		if (withLogs) _project = _project.populate('logs')
		if (withUsers) _project = _project.populate('users')
		return await _project
	}
	async update({ id, git, project, name }) {
		const { Project } = this.ctx.model
		if (!id) return false
		return await Project.findByIdAndUpdate(id, { name, git, project })
	}
}

module.exports = ProjectService
