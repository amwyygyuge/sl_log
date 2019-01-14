'use strict';

exports.mongoose = {
  client: {
    url: 'mongodb://junxiong.cai:amwyygyuge@127.0.0.1:27017/sl_log',
    options: {},
  },
};

exports.cluster = {
  listen: {
    port: 8000,
    hostname: '0.0.0.0',
    // path: '/var/run/egg.sock',
  },
};
