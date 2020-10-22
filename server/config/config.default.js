/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1600140909702_2698';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.session = {
    key: 'HQYJ',
    maxAge: 1000 * 3600 * 24,
    httpOnly: true,
    encrypt: true
  }


  config.security = {
    csrf: {
      enable: false
    }
  }

  config.multipart = {
    mode: 'file',
  };

  // 配置数据库
  config.mysql = {
    client: {
      //host
      host: "localhost",
      //端口
      port: "3306",
      //用户名
      user: "root",
      //密码
      password: "root",
      //数据库名
      database: "taobao"
    }
  };

  // 跨域的配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true//后端会给去前端返回缓存数据包  告诉浏览器  去做缓存
  };

  return {
    ...config,
    ...userConfig,
  };
};
