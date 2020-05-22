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
        //最大速度
        maxSpeed: {
            default: 18,
            type: cc.Float
        },

        //最小速度
        minSpeed:{
            default: 8,
            type: cc.Float
        },

        collideAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enable = true;
        cc.director.getPhysicsManager().enabled = true;
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        //manager.enabledDebugDraw = true;
    },

    //碰撞回调
    onBeginContact: function(contact, selfCollider, otherCollider) {
        if(com.data === 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
    },

    collideWall () {
        const canvas = this.node.parent.getComponent('charge_bar').Canvas;
        if(Math.abs(this.node.x) + this.node.width/2 >= canvas.width/2) {
            this.rigidBody.linearVelocity = cc.v2(-this.rigidBody.linearVelocity.x,this.rigidBody.linearVelocity.y);
            this.onBeginContact();
        }
        if(Math.abs(this.node.y) + this.node.height/2 >=  canvas.height/2) {
            this.rigidBody.linearVelocity = cc.v2(this.rigidBody.linearVelocity.x, -this.rigidBody.linearVelocity.y);
            this.onBeginContact();
        }
    },

    start () {

    },

    update () {
        this.collideWall();
    }
});
