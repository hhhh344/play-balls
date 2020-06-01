
'use strict';
const app = require('tcb-admin-node');
const tcb_config = {env: 'cocos-play-balls-env-4d225'};
const auth = app.init(tcb_config).auth();
exports.main = async (event, context, callback) => {
    /*
  const userInfo = auth.getUserInfo();
  const {
      openid,
      nickname,
      sex,
      province,
      country,
      headimgurl,
      privilege,
      unionid,
 } = userInfo*/
  
  //打开数据库
  var db = app.database();

  if(event.action == 'Update'){
       //查询是否存在
      let UserData = db.collection("UserInfo")
                  .where({
                          _openid:event.openid
                  })
                  .get()
                  .then(res => {
                                console.log(res.data);
                  });
      if(UserData.data.length == 0){

          db.collection('UserInfo').add({
                          _openid : event.openid,
                          UserName : event.nickname,
                          gender:event.sex,
                          headimgurl:event.headimgurl,
          }).then(res => {
                          console.log(res);
          });

          db.collection('EndLess').add({
                      _openid : event.openid,
                      TopScore: event.score
          }).then(res => {
                        console.log(res);
                  })

      }else{
            db.collection('EndLess').where({
                       _openid : event.openid,
            }).update({
                       TopScore: event.score
            })
      }
  }
 
  callback(null, event);
};
