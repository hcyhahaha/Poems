'use strict';
const Controller = require('egg').Controller;

class UserProductionController extends Controller {


    //用户 收藏
    async collectionProduction() {
        // console.log(this.ctx.request.query)
        var re = await this.ctx.service.userProduction.collectionProduction(this.ctx.request.query)
        if (re.affectedRows > 0) {
            this.ctx.body = { code: 2006, info: "收藏成功" }
        } else {
            this.ctx.body = { code: 4009, info: "收藏失败" }
        }
    }

    //取消收藏
    async cancelCollection() {
        var re = await this.ctx.service.userProduction.cancelCollection(this.ctx.request.query)
        if (re.affectedRows > 0) {
            this.ctx.body = { code: 2006, info: "取消收藏成功" }
        } else {
            this.ctx.body = { code: 4009, info: "取消收藏失败" }
        }
    }

    //获取用户所有收藏的图片
    async getcollectionProduction() {
        var re = await this.ctx.service.userProduction.getcollectionProduction(this.ctx.request.query)
        this.ctx.body = re

    }

    //用户上传作品
    async uploadpoems() {
        var re = await this.ctx.service.userProduction.uploadpoems(this.ctx.request.body)
        if (re.affectedRows > 0) {
            this.ctx.body = { code: 2006, info: "上传成功" }
        } else {
            this.ctx.body = { code: 4009, info: "上传失败" }
        }


    }

    // 用户所有上传作品
    async getSelfProduction() {
        // var re = await this.ctx.service.userProduction.getSelfProduction(this.ctx.request.query)
        var sql = `select * from userpoems where userid=${this.ctx.request.query.userid}`
        var re = await this.app.mysql.query(sql)
        this.ctx.body = re;
    }

    //获取所有 现代创作 作品
    async getAllSelfPoems() {
        var sql = `select * from userpoems`
        var result = await this.app.mysql.query(sql)
        this.ctx.body = result;
    }

}
module.exports = UserProductionController;