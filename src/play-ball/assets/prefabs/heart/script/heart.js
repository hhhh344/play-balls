var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        /*circle_transition: {
            default: null,
            type: cc.Node
        },

        circle_red: {
            default: null,
            type: cc.Node
        },
        */

        //幕布开合时间   
        duration : 0.5,  

        top_Curtain: {
            default: null,
            type: cc.Node
        },

        bottom_Curtain: {
            default: null,
            type: cc.Node
        },

        ball: {
            default: null,
            type: cc.Node
        },

        nextSceneName: {
            default: 'game_01',
        },

        collideAudio: {
            default: null,
            type: cc.AudioClip
        },

        // upperCurtain: {
        //     default: null,
        //     type: cc.Node
        // },
        // lowerCurtain: {
        //     default: null,
        //     type: cc.Node
        // },
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
            
            this.scheduleOnce(function() {
                this.open_the_door();
            }, this.duration);
    },

    start () {

    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        if(otherCollider.node._name == this.ball._name) {
            //心被碰撞时 播放音效
            if(com.data == 1) {
                cc.audioEngine.playEffect(this.collideAudio);
            }
            com.result=1;
            console.log('win');
            this.close_the_door();
            this.scheduleOnce(function() {
                if(this.nextSceneName=='game_z_13'|| this.nextSceneName=='game_z_14'){
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }else{
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.director.loadScene(this.nextSceneName);
            },this.duration);
            //小球碰撞后,即胜利后则取消监听,防止多次碰撞,多次胜利
            this.node.getComponent(cc.RigidBody).enabledContactListener = false;
        }
    },

    close_the_door:function(){
        cc.tween(this.top_Curtain)
        .to(this.duration, { position: cc.v2(0, 250) })
        .start()
        cc.tween(this.bottom_Curtain)
        .to(this.duration, { position: cc.v2(0, -250) })
        .start()
        this.scheduleOnce(function() {
        },this.duration);
    },

    open_the_door:function(){
        cc.tween(this.top_Curtain)
        .to(this.duration, { position: cc.v2(0, 780) })
        .start()
        cc.tween(this.bottom_Curtain)
        .to(this.duration, { position: cc.v2(0, -780) })
        .start()
        this.scheduleOnce(function() {
        },this.duration);
    },
    update (dt) {},
});