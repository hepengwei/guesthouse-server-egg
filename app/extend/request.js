module.exports = {
  validateParams(rule, params = {}) {
    const err = this.app.validator.validate(rule, params);
    if (err) {
      const msg = this.ctx.helper.validateMessageToMsg(err, rule);
      this.ctx.body = {
        code: 500,
        msg: msg || '参数错误',
        data: err,
      };
      return false;
    }
    return true;
  },
};
