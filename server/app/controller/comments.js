'use strict';
const Controller = require('egg').Controller;
class CommentsController extends Controller {
    //获取评论
    async getallcomments() {
        const { ctx } = this;
        var sql = `select * from comments where poemsid=${ctx.request.query.poemsid}`
        ctx.body = await this.app.mysql.query(sql);
    }


    //评论
    async setComments() {
        const { ctx } = this;
        var info = ctx.request.query;
        var sql = `insert into comments (userid,nc,poemsid,comtext) values (${info.userid},"${info.nc}",${info.poemsid},"${info.comtext}")`
        var re = await this.app.mysql.query(sql);
        ctx.body = re;
    }

}
module.exports = CommentsController;