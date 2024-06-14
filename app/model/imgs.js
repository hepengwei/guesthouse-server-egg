'use strict';

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const Imgs = app.model.define('imgs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: STRING(150),
    guesthouseId: INTEGER,
  });

  return Imgs;
};
