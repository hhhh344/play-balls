// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.times = 1;
    },

    start () {

    },

    update (dt) {
        if(this.ball.getComponent(cc.RigidBody).linearVelocity.mag() > 0 && this.times === 1) {
            if(this.ball.getComponent(cc.RigidBody).linearVelocity.x <= 0) {
                this.rigidBody.linearVelocity = cc.v2(800, -800);
            }
            else {
                this.rigidBody.linearVelocity = cc.v2(-800, -800);
            }
            this.times--;
            console.log(this.times);
        }
    },
});
