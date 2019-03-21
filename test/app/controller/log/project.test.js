'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const baseUrl = '/user'
const sl_log_usr = '/sl_log'
const { test_log, test_another_log } = require('../../mock.data')
describe('test/app/controller/log.test.js', () => {
	let Project, Log, User, data

	before(async () => {
		// 重置数据库
		const { connections } = app.mongoose
		const sl_log_unitTest = connections[0]
		await sl_log_unitTest.dropDatabase()
		const ctx = app.mockContext()
		const { Project: p, User: u, Log: l } = ctx.model.Log
		Project = p
		User = u
		Log = l
		app.mockCsrf()
		await app.httpRequest().post(`${sl_log_usr}/create`).type('JSON').send(test_log).expect(200)
		await app.httpRequest().post(`${sl_log_usr}/create`).type('JSON').send(test_another_log).expect(200)
	})
	it('test query users ', async () => {
		app.mockCsrf()
		const res = await app.httpRequest().get(`${baseUrl}/query`).expect(200)
		data = res.body[0]
		assert(Array.isArray(res.body))
	})

	it('test update users ', async () => {
		app.mockCsrf()
		const res = await app
			.httpRequest()
			.post(`${baseUrl}/update`)
			.type('JSON')
			.send({ id: data._id, cname: '蔡俊雄', name: 'test' })
			.expect(200)
		assert(res.body.code === 0)
		const new_user = await User.findById(data._id)
		assert(new_user.cname === '蔡俊雄')
		assert(new_user.name === 'test')
	})
})
