'use strict';
const Controller = require('egg').Controller;
class CarController extends Controller {
    async getcar() {
        var sql = `select * from tbgoods`
        this.ctx.body = await this.app.mysql.query(sql)
    }
    async setcar() {
        console.log(this.ctx.request.query)
        var a = !isNaN(parseInt(this.ctx.request.query.count))
        var b = !isNaN(parseInt(this.ctx.request.query.id))
        console.log(a, b)
        if (a && b) {
            var sql = `update tbgoods set count=${this.ctx.request.query.count} where id=${this.ctx.request.query.id}`
            console.log(sql)
            var re = await this.app.mysql.query(sql)
            this.ctx.body = { code: 2001, info: "修改成功" }
        }
        else {
            this.ctx.body = { code: 4002, info: "参数错误" }
        }

    }
}
module.exports = CarController;