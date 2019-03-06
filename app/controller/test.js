'use strict'

const Controller = require('egg').Controller

class TestController extends Controller {
	async errorTest() {
		throw Error('this is a error test!')
	}
}

module.exports = TestController
