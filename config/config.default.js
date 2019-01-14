'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544067874164_2169';
  config.middleware = ['report', 'cors', 'resolveBody'];
  config.security = {
    csrf: false
  };

  // add your config here
  return config;

};
