var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {

        //幕布开合时间
        duration : 0.5,

        top_Curtain_red: {
            default: null,
            type: cc.Node
        },

        bottom_Curtain_red: {
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },

    start () {

    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        //小球碰到陷阱后， 判定为失败，并且撤销陷阱的碰撞监听
        if(otherCollider.node._name == this.ball._name) {
            if(com.data == 1) {
                cc.audioEngine.playEffect(this.collideAudio);
            }
            this.top_Curtain_red.active=true;
            this.bottom_Curtain_red.active=true;
            this.close_the_door();
            console.log('fail');
            com.result=-1;
            this.scheduleOnce(function() {
                cc.director.loadScene(this.nextSceneName);
            }, this.duration);
            this.node.getComponent(cc.RigidBody).enabledContactListener = false;
        }
    },

    close_the_door:function(){

        cc.tween(this.top_Curtain_red)
        .to(this.duration, { position: cc.v2(0, 250) })
        .start()
        cc.tween(this.bottom_Curtain_red)
        .to(this.duration, { position: cc.v2(0, -250) })
        .start()
        this.scheduleOnce(function() {
        },this.duration);
    },
});
