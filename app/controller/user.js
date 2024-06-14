const BaseController = require('./base');

class UserController extends BaseController {
  async regist() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      userName: { type: 'userName', fieldName: '用户名' },
      password: { type: 'password', fieldName: '密码' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const user = await service.user.getUser(params.userName);
    if (user) {
      this.error('用户已存在');
      return;
    }
    const res = await service.user.createUser({
      userName: params.userName,
      password: params.password,
    });
    if (res) {
      this.success(null, '注册用户成功');
    } else {
      this.error('注册用户失败');
    }
  }

  async login() {
    const { ctx, app } = this;
    const {
      request,
      service,
      helper: { unPick },
    } = ctx;

    const rule = {
      userName: { type: 'string' },
      password: { type: 'string' },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const user = await service.user.getUser(params.userName, params.password);
    if (!user) {
      this.error('用户名或密码不正确');
      return;
    }
    const token = app.jwt.sign(
      {
        userName: params.userName,
        userId: user.dataValues.userId,
      },
      app.config.jwt.secret
    );
    await app.redis.set(params.userName, token, 'EX', 6 * 60 * 60);
    this.success(
      {
        ...unPick(user.dataValues, ['createdAt', 'updatedAt', 'password']),
        token,
      },
      '登录成功'
    );
  }

  async logout() {
    const { ctx, app } = this;
    await app.redis.del(ctx.userName);
    this.success(null, '注销成功');
  }

  async updateUserInfo() {
    const { ctx } = this;
    const { request, service } = ctx;

    const rule = {
      avatar: { type: 'string', required: false, allowEmpty: true },
      phone: { type: 'phone', required: false, allowEmpty: true },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const res = await service.user.updateUser(ctx.userId, {
      avatar: params.avatar || null,
      phone: params.phone || null,
    });
    if (!res) {
      this.error('更新用户信息失败');
      return;
    }
    this.success();
  }
}

module.exports = UserController;
