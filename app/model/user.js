'use strict';

const md5 = require('md5');
// const dayjs = require('dayjs');

const myMd5 = (str, salt) => {
  return str ? md5(`${str}${salt}`) : '';
};

module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      userId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userName: STRING(20),
      password: STRING(40),
      avatar: STRING,
      phone: INTEGER(20),
      // created_at: {
      //   type: DATE,
      //   get() {
      //     return dayjs(this.getDataValue('createdAt')).format(
      //       'YYYY-MM-DD HH:mm:ss'
      //     );
      //   },
      // },
      // updated_at: {
      //   type: DATE,
      //   get() {
      //     return dayjs(this.getDataValue('updatedAt')).format(
      //       'YYYY-MM-DD HH:mm:ss'
      //     );
      //   },
      // },
    },
    {
      hooks: {
        beforeCreate: (data) => {
          // 创建时自动对密码进行加密
          if (data.password) {
            data.password = myMd5(data.password, app.config.salt);
          }
        },
        beforeUpdate: (data) => {
          // 更新时自动对密码进行加密
          if (data.password) {
            data.password = myMd5(data.password, app.config.salt);
          }
        },
      },
    }
  );

  return User;
};
