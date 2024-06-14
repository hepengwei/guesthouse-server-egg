'use strict';

const BaseService = require('./base');

class UserService extends BaseService {
  async getUser(userName, password) {
    return this.tryRun(async (ctx) => {
      const _where = password
        ? { userName, password: ctx.helper.myMd5(password) }
        : { userName };
      const res = await ctx.model.User.findOne({
        where: _where,
      });
      return res;
    });
  }

  async createUser(params) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.User.create(params);
      return res;
    });
  }

  async updateUser(userName, params) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.User.update(params, {
        where: {
          userName,
        },
      });
      return res;
    });
  }
}

module.exports = UserService;
