'use strict';

const Controller = require('egg').Controller;

class poemsController extends Controller {
    // 获取所有诗词作品
    async allpoems() {
        const { ctx } = this;
        ctx.body = await ctx.service.allPoems.allpoems()
        // ctx.body = '获取所有诗词作品';
    }

    // 搜索类型
    async keydordstype() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from poems where type like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }

    // 搜索作者
    async keydordsauthor() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from poems where author like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }
    // 搜索作者
    async keydordsdynasty() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from poems where dynasty like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }
    // 搜索形式
    async keydordsformality() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from poems where formality like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }
    // 搜索所有
    async keydords() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from poems where title like "%${keydords}%" or dynasty like "%${keydords}%" or author like "%${keydords}%" or formality like "%${keydords}%" or type like "%${keydords}%" or content like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }
    // 所有名句
    async alldictum() {
        this.ctx.body = await this.ctx.service.allPoems.alldictum();
    }
    // 搜索名句
    async keydordsdictum() {
        var keydords = this.ctx.request.query.keydords;
        var sql = `select * from dictum where type like "%${keydords}%" or title like "%${keydords}%" or author like "%${keydords}%" or sentence like "%${keydords}%"`
        this.ctx.body = await this.app.mysql.query(sql);
    }
}


module.exports = poemsController;
