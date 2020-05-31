
'use strict';
const app = require('tcb-admin-node');
const tcb_config = {env: 'cocos-play-ball-2a61c'};
app.init(tcb_config).auth();
exports.main = async (event, context, callback) => {
  console.log("Hello World");
  console.log(event);
  console.log(event["non-exist"]);
  console.log(context);
  callback(null, event);
};
