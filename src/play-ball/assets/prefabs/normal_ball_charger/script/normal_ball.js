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

    onEndContact: function(contact, selfCollider, otherCollider) {
        console.log('contact');
        //限速, 小于最小值时添加重力
        if(this.rigidBody.linearVelocity.mag() < this.minSpeed * 50) {
            this.rigidBody.gravityScale = 1;
        }
        if(this.rigidBody.linearVelocity.mag() > this.maxSpeed * 50) {
            this.rigidBody.linearVelocity = this.rigidBody.linearVelocity.normalize().mulSelf(50 * this.maxSpeed);
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
    }
});
