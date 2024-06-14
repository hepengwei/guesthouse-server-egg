module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    const { header } = ctx.request;
    if (!options.exclude.includes(url.split('?')[0])) {
      if (!header?.authorization) {
        ctx.body = {
          code: 401,
          msg: '未登录或登录已过期',
          data: null,
        };
      } else {
        const userToken = await ctx.app.redis.get(ctx.userName);
        if (!userToken || userToken !== header.authorization) {
          ctx.body = {
            code: 401,
            msg: '未登录或登录已过期',
            data: null,
          };
        } else {
          await next();
        }
      }
    } else {
      await next();
    }
  };
};
