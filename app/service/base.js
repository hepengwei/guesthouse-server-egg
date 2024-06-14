'use strict';

const { Service } = require('egg');

class BaseService extends Service {
  tryRun(callback) {
    const { ctx, app } = this;
    try {
      if (callback) {
        return callback(ctx, app);
      }
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
}

module.exports = BaseService;
