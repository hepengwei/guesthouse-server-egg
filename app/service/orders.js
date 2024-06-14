'use strict';

const BaseService = require('./base');

class CommentService extends BaseService {
  async getOrder(where) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Orders.findOne({
        where,
      });
      return res;
    });
  }

  async create(params) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Orders.create(params);
      return res;
    });
  }

  async delete(where) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Orders.destroy({
        where,
      });
      return res;
    });
  }

  async getOrders(params) {
    return this.tryRun(async (ctx, app) => {
      const res = await ctx.model.Orders.findAndCountAll({
        order: [['createdAt', 'DESC']],
        offset: params.pageSize * (params.pageNum - 1),
        limit: params.pageSize,
        where: { isPayed: params.isPayed, userId: params.userId },
        include: [
          {
            model: app.model.Guesthouse,
            as: 'guesthouseInfo',
            include: [
              {
                model: app.model.Imgs,
                limit: 1,
                attributes: ['url'],
              },
            ],
          },
        ],
      });
      return res;
    });
  }

  async payOrder(orderId) {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Orders.update(
        { isPayed: 1 },
        {
          where: {
            id: orderId,
          },
        }
      );
      return res;
    });
  }
}

module.exports = CommentService;
