const { EggApplication } = require("egg");

'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class UserService extends Service {
  //验证码
  async verif() {
    //生成验证码 缓存文字 返回给调用者svg标签字符串
    const verifobj = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      bacground: '#cc9966'
    });
    this.ctx.session.verif = verifobj.text;
    return verifobj;
  }
  // 登录
  async login(loginUserInfo) {
    var sql = `select * from userinfo where username="${loginUserInfo.email}" and pwd="${loginUserInfo.password}"`
    var result = await this.app.mysql.query(sql)
    return result
  }

  //注册
  async register(userinfo) {
    console.log("提交的数据:", userinfo)//注册按钮提交时 提交的数据
    
    if (!userinfo.hcverif) {
      return { code: 4003, info: "前端没有获取验证码,验证码接口: http://ip:7001/verif" }
    }
    else if (userinfo.verif.toUpperCase() != userinfo.hcverif.toUpperCase()) {
      return { code: 4001, info: "验证码错误" }
    } else {
      var sql = `select * from userinfo where username="${userinfo.email}"`
     
      var results = await this.app.mysql.query(sql)
      // console.log(re)
      if (results[0]) {
        return { code: 4002, info: "邮箱已经注册过" }
      } else {
        var sql = `insert into userinfo (username,pwd,nc) values ("${userinfo.email}","${userinfo.password}","${userinfo.nc}")`
        var results1 = await this.app.mysql.query(sql)
        if (results1.affectedRows > 0) {
          return { code: 2001, info: "注册成功" }
        } else {
          return { code: 5001, info: "注册失败,稍后再试:后端bug" }
        }

      }

    }

  }

}

module.exports = UserService;
