const BaseController = require('./base');

class CommentController extends BaseController {
  async hasOrder() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      guesthouseId: { type: 'number', fieldName: '民宿ID' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const order = await service.orders.getOrder({
      guesthouseId: params.guesthouseId,
    });
    if (!order) {
      this.success(
        { hasOrder: false, hasOrderBySelf: false, hasPay: false },
        '未被预定'
      );
    } else {
      if (order.dataValues.userId === ctx.userId) {
        this.success(
          {
            hasOrder: true,
            hasOrderBySelf: true,
            hasPay: order.dataValues.isPayed,
          },
          '已被自己预定'
        );
      } else {
        this.success(
          {
            hasOrder: true,
            hasOrderBySelf: false,
            hasPay: order.dataValues.isPayed,
          },
          '已被预定'
        );
      }
    }
  }

  async create() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      guesthouseId: { type: 'number', fieldName: '民宿ID' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const userName = ctx.userName;
    const user = await service.user.getUser(userName);
    if (!user) {
      this.error('用户不存在');
      return;
    }
    const order = await service.orders.getOrder({
      guesthouseId: params.guesthouseId,
    });
    if (order) {
      this.error('已被预定');
      return;
    }
    const res = await service.orders.create({
      userId: user.userId,
      guesthouseId: params.guesthouseId,
      isPayed: 0,
    });
    if (res) {
      this.success();
    } else {
      this.error();
    }
  }

  async delete() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      guesthouseId: { type: 'number', fieldName: '民宿ID' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const userName = ctx.userName;
    const user = await service.user.getUser(userName);
    if (!user) {
      this.error('用户不存在');
      return;
    }
    const order = await service.orders.getOrder({
      guesthouseId: params.guesthouseId,
      userId: user.dataValues.userId,
    });
    if (!order) {
      this.error('订单不存在');
      return;
    }
    const res = await service.orders.delete({
      guesthouseId: params.guesthouseId,
    });
    if (res) {
      this.success(null, '取消预定成功');
    } else {
      this.error('取消预定失败');
    }
  }

  async getOrders() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      pageSize: { type: 'number', fieldName: 'pageSize' },
      pageNum: { type: 'number', fieldName: 'pageNum' },
      isPayed: { type: 'number', fieldName: '是否支付' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const userName = ctx.userName;
    const user = await service.user.getUser(userName);
    if (!user) {
      this.error('用户不存在');
      return;
    }
    const res = await service.orders.getOrders({
      ...params,
      userId: user.dataValues.userId,
    });
    if (res) {
      this.success({
        list: res.rows.map((item) => item.dataValues),
        total: res.count,
      });
    } else {
      this.error('获取订单列表失败');
    }
  }

  async payOrder() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      orderId: { type: 'number', fieldName: '订单编号' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const userName = ctx.userName;
    const user = await service.user.getUser(userName);
    if (!user) {
      this.error('用户不存在');
      return;
    }
    const order = await service.orders.getOrder({
      id: params.orderId,
      userId: user.dataValues.userId,
    });
    if (!order) {
      this.error('订单不存在');
      return;
    }
    const res = await service.orders.payOrder(params.orderId);
    if (res) {
      this.success();
    } else {
      this.error('支付失败');
    }
  }
}

module.exports = CommentController;
