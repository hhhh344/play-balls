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
        },

        collideAudio: {
            default: null,
            type: cc.AudioClip
        },
        v :{
            default: null,
            type: cc.v2
        },

    },

    onLoad () {
        this.ballRigidBody = this.ball.getComponent(cc.RigidBody);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {

    },

    onCollisionEnter: function(other, self){
        if(com.data == 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        this.v = other.getComponent(cc.RigidBody).linearVelocity;
        other.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
        this.ballRigidBody.gravityScale = 0;
        console.log('this.v：'+this.v);
        console.log('前');

    },
    onCollisionStay: function(other, self) {
        if(com.type==1){
            this.v=cc.v2(-this.v.x,-this.v.y);
            console.log('this.v：'+this.v);
            other.getComponent(cc.RigidBody).linearVelocity =this.v;
            console.log('中 type:'+com.type);
            com.type=2;
            console.log('中 type:'+com.type);

        }
    },
    onCollisionExit: function(other, self) {
            com.type=1;
            console.log('后');
            other.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
    },
    open_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        this.circle_transition.active=true;
        cc.tween(this.circle_transition)
        .to(.5, { scale: 3 })
        .start()
             
    },
    // update (dt) {
    // },
});
