'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 开启mysql插件
  mysql: {
    enable: true,
    package: "egg-mysql"
  },

  //跨域处理
    cors: {
    enable: true,
    package: 'egg-cors',
  }
};
