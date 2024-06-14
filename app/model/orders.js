'use strict';

module.exports = (app) => {
  const { INTEGER } = app.Sequelize;

  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    guesthouseId: INTEGER,
    isPayed: INTEGER,
  });

  Orders.associate = () => {
    // 一个订单属于一个民宿
    app.model.Orders.belongsTo(app.model.Guesthouse, {
      foreignKey: 'guesthouseId',
      as: 'guesthouseInfo',
    });
  };

  return Orders;
};
