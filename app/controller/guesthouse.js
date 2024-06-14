const BaseController = require('./base');

class GuesthouseController extends BaseController {
  async getHot() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.guesthouse.getHot();
    if (res) {
      this.success(res.map((item) => item.dataValues));
    } else {
      this.error();
    }
  }

  async search() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      pageSize: { type: 'number', fieldName: 'pageSize' },
      pageNum: { type: 'number', fieldName: 'pageNum' },
      cityCode: {
        type: 'string',
        fieldName: '城市编号',
        required: false,
        allowEmpty: true,
      },
      startDate: { type: 'date', fieldName: '开始出租时间' },
      endDate: { type: 'date', fieldName: '结束出租时间' },
      name: {
        type: 'string',
        fieldName: 'name',
        required: false,
        allowEmpty: true,
      },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const res = await service.guesthouse.search(params);
    if (res) {
      this.success({
        list: res.rows.map((item) => item.dataValues),
        total: res.count,
      });
    } else {
      this.error();
    }
  }

  async detail() {
    const { ctx } = this;
    const { service } = ctx;
    const params = ctx.getParams('', true);
    if (!params.id && params.id !== 0) {
      this.error('id为必填项');
      return;
    }
    const res = await service.guesthouse.detail(Number(params.id));
    if (res) {
      this.success(res.dataValues);
    } else {
      this.error();
    }
  }
}

module.exports = GuesthouseController;
