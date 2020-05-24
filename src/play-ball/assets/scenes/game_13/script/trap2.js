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

        otherBallScript: {
            default: 'normal_ball'
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

    onCollisionEnter: function(other, self) {
        other.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
        this.open_the_door();
        console.log('fail');
        com.result=-1;
        this.scheduleOnce(function() {
            cc.director.loadScene(this.nextSceneName);
        }, 0.3);
    },

    open_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        this.circle_transition.active=true;
        cc.tween(this.circle_transition)
        .to(0.2, { scale: 3 })
        .start()
             
    },
    // update (dt) {},
});
