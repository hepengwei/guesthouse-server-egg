'use strict';

const BaseService = require('./base');

class CommentService extends BaseService {
  async create(params) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Comment.create(params);
      return res;
    });
  }
}

module.exports = CommentService;
