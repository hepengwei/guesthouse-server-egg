'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Guesthouse = app.model.define('guesthouse', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    des: STRING(150),
    address: STRING(100),
    price: INTEGER,
    cityCode: STRING(10),
    showCount: INTEGER,
    startTime: DATE,
    endTime: DATE,
  });

  Guesthouse.associate = () => {
    // 一个民宿关联多个图片
    app.model.Guesthouse.hasMany(app.model.Imgs, {
      foreignKey: 'guesthouseId',
    });
    // 一个民宿关联多个评论
    app.model.Guesthouse.hasMany(app.model.Comment, {
      foreignKey: 'guesthouseId',
    });
  };

  return Guesthouse;
};
