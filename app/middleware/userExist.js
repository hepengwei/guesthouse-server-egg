module.exports = () => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.userName);
    if (!user) {
      ctx.body = {
        code: 500,
        msg: '用户不存在',
        data: null,
      };
    } else {
      ctx.userId = user.dataValues.userId;
      await next();
    }
  };
};
