var com = require('common');
cc.Class({
    extends: cc.Component,
    properties: {
        //小球节点
        player: {
            type: cc.Node,
            default: null,
        },

        //蓄力条边框
        border: {
            type: cc.Node,
            default: null,
        },

        //蓄力条
        rectangle: {
            type: cc.Node,
            default: null,
        },

        //画布
        Canvas: {
            type: cc.Node,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ballRigidBody = this.player.getComponent(cc.RigidBody);
        this.ballScript = this.player.getComponent('elastic_ball');
        this.maxSpeed = this.ballScript.maxSpeed;
        this.minSpeed = this.ballScript.minSpeed;
        //设置蓄力条透明，位置在小球上
        this.border.opacity = 0;
        [this.border.x, this.border.y] = [this.player.x, this.player.y];

        //蓄力条长度
        this.rectHeight = this.rectangle.height;

        //鼠标与小球的距离≥maxDistance时，蓄力条满
        this.maxDistance = 150;

        //rectangle的高度与原高度之比
        this.ratio = 0;

        //rectangle的高度与原高度之比小于该值，则取消发射小球
        this.cancelRatio = 0.2;

        //鼠标事件的顺序 
        this.canLaunch = 0;

        this.Canvas.on(cc.Node.EventType.TOUCH_START, e => {
            if(com.mouse === 1 && this.canLaunch === 0) {
                this.canLaunch = 1;
                this.ballRigidBody.linearVelocity = this.ballRigidBody.linearVelocity.normalize().mulSelf(5);
                this.ballRigidBody.gravityScale = 0.1;
                this.border.opacity = 255;
                this.calculateChargeBar(e);
                this.chargeBarChange();
            }
        });

        this.Canvas.on(cc.Node.EventType.TOUCH_MOVE, e => {
            if(com.mouse === 1 && this.border.opacity === 255) {
                this.calculateChargeBar(e);
                this.chargeBarChange();
            }
        });

        this.Canvas.on(cc.Node.EventType.TOUCH_END, e => {
            if(com.mouse === 1 && this.canLaunch === 1) {
                this.canLaunch = 2;
                this.ballRigidBody.gravityScale = 1;
                this.border.opacity = 0;
                this.launch();
                setTimeout(() => {
                    this.canLaunch = 0;
                }, 2000);
            }
        })
    },

    //根据鼠标位置和球心计算向量
    calculateChargeBar (e) {
        let vx = this.player.x + this.Canvas.width/2 - e.getLocationX();
        let vy = this.player.y + this.Canvas.height/2 - e.getLocationY();
        this.vBall = cc.v2(vx, vy);
    },

    chargeBarChange () {
        //角度控制
        let theta = 360 * Math.atan(this.vBall.x/this.vBall.y)/(2*Math.PI);
        if(this.vBall.y < 0) {
            theta += 180;
        }
        this.border.angle = -theta;

        //长度控制
        this.ratio = this.vBall.mag()/this.maxDistance;
        if(this.ratio <= this.cancelRatio) {
            this.rectangle.height = 0;
        }
        else if(this.ratio < 1) {
            this.rectangle.height = this.ratio * this.rectHeight;
        }
        else {
            this.rectangle.height = this.rectHeight;
        }
    },

    //发射小球
    launch () {
        if(this.ratio > this.cancelRatio) {
            if(this.ratio > 1) {
                this.ratio = 1;
            }
            const deltaSpeed = this.maxSpeed - this.minSpeed;
            const speed = this.ratio * deltaSpeed + this.minSpeed;
            this.ballRigidBody.linearVelocity = this.vBall.normalize().mulSelf(50*speed);
        }
    },

    start () {

    },

    update (dt) {
        this.border.x = this.player.x;
        this.border.y = this.player.y;
    },
});
