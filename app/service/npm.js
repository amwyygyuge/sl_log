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
		const { data, status } = result
		if (status === 200) {
			if (data.version) {
				// 单个版本
				return data.version
			} else {
				// 多个版本
				return Object.keys(data.versions)
			}
		} else {
			return false
		}
	}
}

module.exports = NpmService
