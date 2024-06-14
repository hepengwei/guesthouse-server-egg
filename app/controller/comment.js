const BaseController = require('./base');

class CommentController extends BaseController {
  async create() {
    const { ctx } = this;
    const { request, service } = ctx;
    const rule = {
      guesthouseId: { type: 'number', fieldName: '民宿ID' },
      msg: {
        type: 'string',
        fieldName: '评论内容',
      },
    };
    const params = ctx.getParams();
    if (!request.validateParams(rule, params)) return;
    const res = await service.comment.create({
      userId: ctx.userId,
      guesthouseId: params.guesthouseId,
      msg: params.msg,
    });
    if (res) {
      this.success();
    } else {
      this.error();
    }
  }
}

module.exports = CommentController;
