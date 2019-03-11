'use strict'

// exports.mongoose = {
// 	client: {
// 		url: 'mongodb://127.0.0.1/sl_log',
// 		options: {}
// 	}
// }
exports.mongoose = {
	client: {
		url: 'mongodb://junxiong.cai:amwyygyuge@119.29.134.187/sl_log',
		options: {}
	}
}
exports.cluster = {
	listen: {
		port: 7070,
		hostname: 'localhost'
		// path: '/var/run/egg.sock',
	}
}
