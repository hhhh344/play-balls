// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        menu: {
            default: null,
            type: cc.Node
        },

        currentSceneName: {
            default: 'game_01',
        },
      
        homeSceneName: {
            default: 'main',
        },
    },

    onLoad () {
        this.menu.active = false; 
    },
    start () {

    },

    buttonStop:function(){
        cc.director.pause();

    },

    buttonJixu:function(){
        //前面打开了菜单 现在要关闭菜单       
        this.menu.active = false;        
        cc.director.resume();
    },

    restart : function(){
        //前面打开了菜单 现在要关闭菜单       
        this.menu.active = false;
        cc.director.resume();
        cc.director.loadScene(this.currentSceneName);  
        
    },
    returnHome : function(){
        //前面打开了菜单 现在要关闭菜单       
        this.menu.active = false;
        cc.director.resume();
        cc.director.loadScene(this.homeSceneName);  
        
    },
    musicChange: function(){
        if(com.data == 1)
        this.musicLabel.string = "开启音乐";
        else if(com.data == -1)
        this.musicLabel.string = "关闭音乐";
    },

    getmenu:function(){
        //显示菜单       
        this.menu.active = true;
    },
});
