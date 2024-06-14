/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1717375284325_5397';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false, // 本地开发时设为false，上生产打包时要改为true
    },
  };

  config.session = {
    key: 'GUESTHOUSE',
    httpOnly: true,
    maxAge: 1000 * 60,
    renew: true,
  };

  config.auth = {
    exclude: [
      '/api/user/login',
      '/api/user/regist',
      '/api/common/getCitys',
      '/api/guesthouse/getHot',
      '/api/guesthouse/search',
    ],
  };

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0,
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg_guesthouse',
    define: {
      timestamps: true,
      underscored: false, // 表字段不使用下划线
      freezeTableName: true, // 防止修改表名为复数
    },
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  config.jwt = {
    secret: 'guesthouse',
  };

  // add your user config here
  const userConfig = {
    salt: 'guesthouse',
  };

  return {
    ...config,
    ...userConfig,
  };
};
