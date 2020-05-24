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
        circle_transition: {
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
        //陷阱被碰撞时 播放音效
        if(com.data == 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        //小球碰到陷阱后， 判定为失败，并且撤销陷阱的碰撞监听
        if(otherCollider.node._name == this.ball._name) {
            this.open_the_door();
            console.log('fail');
            com.result=-1;
            this.scheduleOnce(function() {
                cc.director.loadScene(this.nextSceneName);
            }, 1.3);
            this.node.getComponent(cc.RigidBody).enabledContactListener = false;
        }
    },

    open_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        this.circle_transition.active=true;
        cc.tween(this.circle_transition)
            .to(.5, { scale: 2.5 })
            .start()

    },
    // update (dt) {},
});
