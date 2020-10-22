'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.index);
  //请求验证码
  router.get("/verif", controller.user.verif)
  //登录
  router.post('/login', controller.user.login);
  //注册
  router.post('/register', controller.user.register);
  router.get('/userinfo', controller.user.userinfo);//用户信息
  //获取所有诗词作品
  router.get('/poems', controller.allPoems.allpoems);
  //搜索类型
  router.get('/keydordstype', controller.allPoems.keydordstype);
  //搜索作者
  router.get('/keydordsauthor', controller.allPoems.keydordsauthor);
  //搜索朝代
  router.get('/keydordsdynasty', controller.allPoems.keydordsdynasty);
  //搜索形式
  router.get('/keydordsformality', controller.allPoems.keydordsformality);
  //搜索所有内容
  router.get('/keydords', controller.allPoems.keydords);
  //请求所有名句
  router.get('/alldictum', controller.allPoems.alldictum);
  //搜索名句主题
  router.get('/keydordsdictum', controller.allPoems.keydordsdictum);
  //用户 收藏
  router.get('/collectionProduction', controller.userProduction.collectionProduction);
  //取消收藏
  router.get('/cancelCollection', controller.userProduction.cancelCollection);
  //获取用户所有收藏的图片
  router.get('/getcollectionProduction', controller.userProduction.getcollectionProduction);
  //上传 作品
  router.post('/uploadpoems', controller.userProduction.uploadpoems);
  //获取所有 自己的 作品
  router.get('/getSelfProduction', controller.userProduction.getSelfProduction);
  //获取所有 现代创作 作品
  router.get('/getAllSelfPoems', controller.userProduction.getAllSelfPoems);
  //评论 接口
  router.get('/setComments', controller.comments.setComments);
  //获取所有评论
  router.get('/getallcomments', controller.comments.getallcomments);
  //购物车
  router.get('/getcar', controller.car.getcar);
  router.get('/setcar', controller.car.setcar);
};
