'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const baeeUrl = '/package'
describe('test/app/controller/npm.test.js', () => {
	it('test npm versions', async () => {
		const res = await app.httpRequest().get(`${baeeUrl}/igroot`).expect(200)
		assert(Array.isArray(res.body))
	})
	it('test npm last version', async () => {
		const res = await app.httpRequest().get(`${baeeUrl}/igroot/latest`).expect(200)
		assert(typeof res.text === 'string')
	})
})
