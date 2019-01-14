'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  async create(log = {}) {
    const res = await this.ctx.model.Log.create(log);
    if (res) {
      return true;
    }
    return false;
  }

  async query() {
    const logs = await this.ctx.model.Log.find().exec();
    return logs;
  }
  
}

module.exports = LogService;
