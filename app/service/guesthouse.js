'use strict';

const BaseService = require('./base');

class GuesthouseService extends BaseService {
  async getHot() {
    return this.tryRun(async (ctx) => {
      const res = await ctx.model.Guesthouse.findAll({
        order: [['showCount', 'DESC']],
        limit: 4,
        attributes: {
          exclude: ['startTime', 'endTime'],
        },
        include: [
          {
            model: this.app.model.Imgs,
            limit: 1,
            attributes: ['url'],
          },
        ],
      });
      return res;
    });
  }

  async search(params) {
    return this.tryRun(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const _where = {
        startTime: {
          [gte]: params.startDate,
        },
        endTime: {
          [lte]: params.endDate,
        },
      };
      if (params.cityCode && params.cityCode !== 'all') {
        _where.cityCode = params.cityCode;
      }
      if (params.name) {
        _where.name = {
          [like]: `%${params.name}%`,
        };
      }
      const res = await ctx.model.Guesthouse.findAndCountAll({
        order: [['showCount', 'DESC']],
        offset: params.pageSize * (params.pageNum - 1),
        limit: params.pageSize,
        where: _where,
        include: [
          {
            model: app.model.Imgs,
            limit: 1,
            attributes: ['url'],
          },
        ],
      });
      return res;
    });
  }

  async detail(id) {
    return this.tryRun(async (ctx, app) => {
      const res = await ctx.model.Guesthouse.findByPk(id, {
        include: [
          {
            model: app.model.Imgs,
            attributes: ['url'],
          },
          {
            model: app.model.Comment,
            as: 'comments',
            attributes: { exclude: ['userId'] },
            include: [
              {
                model: app.model.User,
                attributes: ['userId', 'userName', 'avatar'],
                as: 'userInfo',
              },
            ],
          },
        ],
      });
      return res;
    });
  }
}

module.exports = GuesthouseService;
