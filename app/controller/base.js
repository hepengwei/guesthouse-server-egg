const { Controller } = require('egg');

class BaseController extends Controller {
  success(data = null, msg = 'OK') {
    const { ctx } = this;
    ctx.body = { code: 200, msg, data };
  }

  error(msg = '', data = null, code = 500) {
    const { ctx } = this;
    ctx.body = { code, msg, data };
  }
}

module.exports = BaseController;
