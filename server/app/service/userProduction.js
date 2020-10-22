const Service = require('egg').Service;
class UserProductionImgService extends Service {
  async uploadImg(userProductionObj) {
    var sql = `insert into upload (userid,description,upimgsrc,imgtype,imgname,imgtitle) values ("${userProductionObj.userid}","${userProductionObj.description}","${userProductionObj.upimgsrc}","${userProductionObj.imgtype}","${userProductionObj.imgname}","${userProductionObj.imgtitle}")`
    const data = await this.app.mysql.query(sql);
    return data;
  }


  async productionImg() {
    var sql = `select * from upload`
    var re = await this.app.mysql.query(sql)
    return re
  }


  //收藏
  async collectionProduction(infoobj) {
    var sql = `insert into collection (userid,poemsid) values (${infoobj.userid},${infoobj.poemid}) `
    var re = await this.app.mysql.query(sql)
    return re
  }

  //取消收藏
  async cancelCollection(infoobj) {
    var sql = `DELETE FROM collection WHERE userid=${infoobj.userid} and poemsid=${infoobj.poemid};`
    var re = await this.app.mysql.query(sql)
    return re
  }


  //获取收藏的诗集
  async getcollectionProduction(infoobj) {

    var sql = `select * from collection where userid=${infoobj.userid}`
    var arr1 = await this.app.mysql.query(sql)
    if (arr1.length === 0) {
      return []
    }
    var sql2 = `select * from poems where id in (`
    for (var i = 0; i < arr1.length; i++) {
      sql2 = sql2 + arr1[i].poemsid + ","
    }
    sql2 = sql2.substring(0, sql2.length - 1)
    sql2 += ")"
    // console.log(sql2)
    var arr2 = await this.app.mysql.query(sql2)
    return arr2
  }


  // 上传 作品
  async uploadpoems(userProductionObj) {
    var sql = `insert into userpoems (title,content,userid,nc) values ("${userProductionObj.title}","${userProductionObj.content}",${userProductionObj.userid},"${userProductionObj.nc}")`
    const data = await this.app.mysql.query(sql);
    return data;
  }

}
module.exports = UserProductionImgService;