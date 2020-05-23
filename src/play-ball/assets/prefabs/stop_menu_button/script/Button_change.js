// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        musicLabel: {
            default: null,
            type: cc.Label
        },

    },

    onLoad () {
        cc.log(com.data);
        if(com.data == 1)
            this.musicLabel.string = "音效:开启";
        if(com.data == -1)
            this.musicLabel.string = "音效:关闭";
    },

    musicChange: function(){
        com.data = -com.data;
        if(com.data == 1){
            this.musicLabel.string = "音效:开启";
        }
        else if(com.data == -1){
            this.musicLabel.string = "音效:关闭";
        }
        
    },

});
