// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
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
                this.rigidBody.linearVelocity = cc.v2(100, 0);
            }
            else {
                this.rigidBody.linearVelocity = cc.v2(-100, 0);
            }
            this.times--;
        }
    },
});
