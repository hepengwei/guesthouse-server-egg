const path = require('path');

module.exports = (app) => {
  app.config.coreMiddleware.push('notFound');
  app.config.coreMiddleware.push('auth');

  // 引入validate目录，并注入app实例
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
};
