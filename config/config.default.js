'use strict'

module.exports = appInfo => {
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1544067874164_2169'
	config.middleware = [ 'report', 'resolveBody' ]
	config.security = {
		csrf: false
	}
	config.cors = {
		origin: '*',
		maxAge: 3600 * 1000
	}
	config.static = {
		gzip: true
	}

	// add your config here
	return config
}
