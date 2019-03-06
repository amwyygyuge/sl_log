'use strict'

exports.mongoose = {
	client: {
		url: 'mongodb://junxiong.cai:amwyygyuge@127.0.0.1:27017/sl_log',
		options: {}
	}
}
exports.cluster = {
	listen: {
		port: 8000,
		hostname: '0.0.0.0'
		// path: '/var/run/egg.sock',
	}
}

exports.alinode = {
	enable: true,
	appid: '78690',
	secret: '74072dc3af750f64427b23a5069c29dcc238e121',
	// logdir: '/root/',
	// error_log: [ '/root/logs/' ],
	packages: './../package.json'
}

// exports.logger = {
// 	dir: '/root/'
// }
