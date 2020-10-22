const { EggApplication } = require("egg");

'use strict';

const Service = require('egg').Service;

class  poemsService extends Service {
  // 登录
  async allpoems() {
    var sql = `select * from poems`
    var result = await this.app.mysql.query(sql)
    return result
  }
  // 所有名句
  async alldictum() {
    var sql = `select * from dictum`
    var result = await this.app.mysql.query(sql)
    return result
  }
}

module.exports = poemsService;
