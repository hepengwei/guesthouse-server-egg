'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    guesthouseId: INTEGER,
    msg: STRING,
  });

  Comment.associate = () => {
    // 一个评论属于一个用户
    app.model.Comment.belongsTo(app.model.User, {
      foreignKey: 'userId',
      as: 'userInfo',
    });
  };

  return Comment;
};
