module.exports = () => {
  return async (ctx, next) => {
    const flag = ctx.app.router.stack.filter((item) => {
      return item.regexp.test(ctx.request.url);
    });
    if (!flag.length) {
      ctx.body = {
        code: 404,
        msg: `接口 ${ctx.request.url} 不存在`,
        data: null,
      };
    } else {
      await next();
    }
  };
};
