'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  //验证码
  async verif() {
    this.ctx.body = await this.ctx.service.user.verif()
  }
  async goods() {
    // 连接数据库
    // 给前端发数据
    this.ctx.body = await this.service.home.goods();
  }

  //登录
  async login() {
    // 连接数据库
    // 给前端发数据
    // console.log(this.ctx.request.body);{ email: '哈哈哈哈', password: '22' }
    var result = await this.ctx.service.user.login(this.ctx.request.body)
    console.log(result);//是一个数组
    if (result[0]) {
      //验证通过,用户输入正确,通知浏览器做cookie缓存,后端保存用户id
      this.ctx.session.userid = result[0].id
      this.ctx.body = { code: 2002, info: "登录成功,接下来请求任何接口都不用传账号密码",userid: result[0].id,nc:result[0].nc }
    } else {
      this.ctx.body = { code: 4003, info: "密码或账号错误" }
    }
  }
  //注册
  async register() {
    this.ctx.body = await this.ctx.service.user.register(this.ctx.request.body)
}

  //用户信息，头像，昵称
  async userinfo() {
    const { ctx } = this;
    console.log("11111111", ctx.session.userid);
    // var res = await ctx.service.user.userinfo()
    ctx.body = 666;
  }
}


module.exports = UserController;
