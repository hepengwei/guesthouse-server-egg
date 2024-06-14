/** @type Egg.EggPlugin */
const path = require('path');

module.exports = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  notFound: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-notFound'),
  },
  auth: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-auth'),
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
