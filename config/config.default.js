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
	config.alinode = {
		enable: true,
		appid: '78690',
		secret: '74072dc3af750f64427b23a5069c29dcc238e121',
		// logdir: '/root/',
		// error_log: [ '/root/logs/' ],
		packages: [ '/sl_log/package.json' ]
	}
	return config
}
