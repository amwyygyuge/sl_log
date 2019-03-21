'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const baseUrl = '/sl_log'
const { test_log, test_another_log } = require('../../mock.data')
describe('test/app/controller/log.test.js', () => {
	let Project, Log, User
	before(async () => {
		// 重置数据库
		const { connections } = app.mongoose
		const sl_log_unitTest = connections[0]
		sl_log_unitTest.dropDatabase()
		const ctx = app.mockContext()
		const { Project: p, User: u, Log: l } = ctx.model.Log
		Project = p
		User = u
		Log = l
	})
	it('test create and should create a log ', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().post(`${baseUrl}/create`).type('JSON').send(test_log).expect(200)
		assert(res.body.code === 0)
		assert((await Project.count()) === 1)
		assert((await User.count()) === 1)
	})

	it('test auto add project and user', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().post(`${baseUrl}/create`).type('JSON').send(test_log).expect(200)
		assert(res.body.code === 0)
		const project = await Project.find()
		const user = await User.find()
		assert((await Log.count()) === 2)
		assert(project.length === 1)
		assert(user.length === 1)
		assert(user[0].logs.length === 2)
		assert(project[0].logs.length === 2)
	})

	it('test another log', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().post(`${baseUrl}/create`).type('JSON').send(test_another_log).expect(200)
		assert(res.body.code === 0)
		assert((await Log.count()) === 3)
		assert((await Project.count()) === 2)
		assert((await User.count()) === 2)
	})

	it('test query and should return logs', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().get(`${baseUrl}/query`).expect(200)
		assert(Array.isArray(res.body))
	})
	it('test count and should return number', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().get(`${baseUrl}/count`).expect(200)
		assert(res.body === 3)
	})
	it('test remove and should remove logs', async () => {
		const res = await app.httpRequest().get(`${baseUrl}/query`)
		const ids = []
		res.body.forEach(({ _id }) => ids.push(_id))
		const removeRes = await app.httpRequest().post(`${baseUrl}/remove`).type('JSON').send({ ids }).expect(200)
		assert(removeRes.body.code === 0)
	})
	it('test count and should return number', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().get(`${baseUrl}/count`).expect(200)
		assert(res.body === 0)
	})
})
