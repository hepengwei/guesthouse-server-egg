/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const useExist = app.middleware.userExist();

  router.get('/api/common/getCitys', controller.common.getCitys);

  router.post('/api/user/regist', controller.user.regist);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/logout', controller.user.logout);
  router.post(
    '/api/user/updateUserInfo',
    useExist,
    controller.user.updateUserInfo
  );

  router.get('/api/guesthouse/getHot', controller.guesthouse.getHot);
  router.post('/api/guesthouse/search', controller.guesthouse.search);
  router.get('/api/guesthouse/detail/:id', controller.guesthouse.detail);

  router.post('/api/comment/create', useExist, controller.comment.create);

  router.post('/api/orders/hasOrder', controller.orders.hasOrder);
  router.post('/api/orders/create', useExist, controller.orders.create);
  router.post('/api/orders/delete', useExist, controller.orders.delete);
  router.post('/api/orders/list', useExist, controller.orders.getOrders);
  router.post('/api/orders/payOrder', useExist, controller.orders.payOrder);
};
