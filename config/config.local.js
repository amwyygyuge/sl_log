'use strict';

exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/sl_log',
    options: {},
  },
};
exports.cluster = {
  listen: {
    port: 7070,
    hostname: 'localhost',
    // path: '/var/run/egg.sock',
  },
};
