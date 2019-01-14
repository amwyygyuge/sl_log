'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544067874164_2169';

  // add your config here
  config.middleware = [ 'report' ];
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/sl_log',
      options: {},
    },
  };
  return config;
};

