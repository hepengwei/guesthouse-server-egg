module.exports = (app) => {
  const { validator } = app;

  // 校验用户名
  validator.addRule('userName', (rule, value) => {
    if (typeof value !== 'string') {
      return '用户名应该为字符串类型';
    } else if (value.length < 2 || value.length > 20) {
      return '用户名的长度应该在2~20之间';
    }
  });

  // 校验密码
  validator.addRule('password', (rule, value) => {
    if (typeof value !== 'string') {
      return '密码应该为字符串类型';
    } else if (value.length < 6 || value.length > 30) {
      return '密码的长度应该在6~30之间';
    }
  });

  // 校验电话
  validator.addRule('phone', (rule, value) => {
    const telReg = /^(?:\+86|0)?(?:[1-9]\d{2,3}|\([2-9]\d{2,3}\))[-.\s]?\d{8}$/;
    if (value) {
      if (typeof value !== 'string') {
        return '手机号应该为字符串类型';
      } else if (!telReg.test(value)) {
        return '手机号格式不正确';
      }
    }
  });
};
