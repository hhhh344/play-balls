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
        xSpeed: {
            default: 0,
            type: cc.Float
        },

        ySpeed: {
            default: 0,
            type: cc.Float
        },

        maxMoveSpeed: {
            default: 18,
            type: cc.Float
        },

        minMoveSpeed:{
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
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
    },

    start () {

    },

    ballMove () {
        const canvas = this.node.parent.getComponent('charge_bar').Canvas;
        if(Math.abs(this.node.x) + this.node.width/2 >= canvas.width/2) {
            this.xSpeed = -this.xSpeed;
            // if(com.data == 1) {
            //     cc.audioEngine.playEffect(this.collideAudio);
            // }
        }
        if(Math.abs(this.node.y) + this.node.height/2 >= canvas.height/2) {
            this.ySpeed = -this.ySpeed;
            // if(com.data == 1) {
            //     cc.audioEngine.playEffect(this.collideAudio);
            // }
        }

        // this.xSpeed = this.accel * this.xSpeed;
        // this.ySpeed = this.accel * this.ySpeed;

        this.node.x += this.xSpeed;
        this.node.y += this.ySpeed;
    },

    update (dt) {
        this.ballMove();
    },
});
