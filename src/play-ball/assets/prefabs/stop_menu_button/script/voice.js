var com = require('common');
cc.Class({
    extends: cc.Component,
    properties: {
        // //声音按钮
        // button: {
        //     default: null,
        //     type: cc.Node,
        // },
        // //静音按钮
        // button2: {
        //     default: null,
        //     type: cc.Node,
        // },


    },

    onLoad: function () {
    },

    //有声音
    OnMusic: function(){
        com.data=1;
    },

    //静音
    OffMusic: function(){
        com.data=-1;
    }

});