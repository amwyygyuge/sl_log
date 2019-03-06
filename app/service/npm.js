'use strict'

const Service = require('egg').Service
const npm_api = 'https://registry.npmjs.org'
const yarn_api = 'https://registry.yarnpkg.com'
class NpmService extends Service {
	async index({ name = '', version = '' }) {
		let result = {}
		try {
			result = await this.app.curl(`${npm_api}/${name}/${version}`, {
				dataType: 'json'
			})
		} catch (error) {
			result = await this.app.curl(`${yarn_api}/${name}/${version}`, {
				dataType: 'json'
			})
		}
		return result
	}
}

module.exports = NpmService
