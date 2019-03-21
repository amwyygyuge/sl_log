'use strict'

const Service = require('egg').Service

class ProjectService extends Service {
	async checkProject(log) {
		const project = log.data.context.project
		const git = log.data.context.git
		if (!project || typeof project === 'string') return false
		const { name, dependencies } = project
		const { Project } = this.ctx.model.Log
		const _project = await Project.findOne({ project: name })
		if (_project) {
			_project.logs.push(log._id)
			_project.dependencies = dependencies
			_project.git = git
			return _project.save()
		} else {
			return await Project.create({
				logs: [ log._id ],
				project: name,
				dependencies,
				users: [],
				git
			})
		}
	}
	async query(args) {
		const { withLogs, withUsers } = args
		delete args.withLogs
		delete args.withUsers
		const { conditions, options } = this.ctx.helper.resolveQuery(args)
		const { Project } = this.ctx.model.Log
		let _project = Project.find(conditions, null, options)
		if (withLogs) _project = _project.populate('logs')
		if (withUsers) _project = _project.populate('users')
		return await _project
	}
	async update({ id, project, name }) {
		const { Project } = this.ctx.model.Log
		if (!id) return false
		return await Project.findByIdAndUpdate(id, this.ctx.helper.filterObject({ name, project }))
	}
}

module.exports = ProjectService
