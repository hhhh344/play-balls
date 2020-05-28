var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        //最大速度
        maxSpeed: {
            default: 18,
            type: cc.Float
        },

        //最小发射速度
        minSpeed:{
            default: 8,
            type: cc.Float
        },

        //小球音效
        collideAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        var physicsManager = cc.director.getPhysicsManager();
        manager.enabled = true;
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(-300, 0);
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        //manager.enabledDebugDraw = true;
    },

    setAction () {
        let seq = [];
        seq.push(cc.scaleTo(0.1, 1.4, 0.6).easing(cc.easeQuinticActionOut()));
        seq.push(cc.scaleTo(0.2, 0.9, 1.2).easing(cc.easeCubicActionOut()));
        seq.push(cc.scaleTo(0.3, 1, 1).easing(cc.easeCubicActionIn()));
        return cc.sequence(...seq);
    },

    onEndContact: function() {
        //限速
        if(this.rigidBody.linearVelocity.mag() > this.maxSpeed * 50) {
            this.rigidBody.linearVelocity = this.rigidBody.linearVelocity.normalize().mulSelf(50 * this.maxSpeed);
        }
        
    },

    keepSame () {
        let angle = 180*cc.Vec2.angle(cc.Vec2.UP_R, this.rigidBody.linearVelocity)/Math.PI;
        return angle;
    },

    //碰撞回调
    onBeginContact: function(contact, selfCollider, otherCollider) {
        this.node.runAction(this.setAction());
        //碰到心或者陷阱 撤销小球的碰撞监听 防止多次碰撞 音效炸裂
        if(otherCollider.node._name == 'heart' || otherCollider.node._name == 'trap') {
            this.rigidBody.enabledContactListener = false;
            //this.rigidBody.linearVelocity = cc.Vec2.ZERO;
            return;
        }
        if(com.data === 1) {
            com.data = 0;
            cc.audioEngine.playEffect(this.collideAudio);
            //控制音效播放的最小间隔
            setTimeout(() => {
                com.data = 1;
            }, 300);
        }
    },

    update (dt) {
        if(this.rigidBody.linearVelocity.x < 0) {
            this.node.angle = this.keepSame();
        }
        else {
            this.node.angle = -this.keepSame();
        }
    },
});
