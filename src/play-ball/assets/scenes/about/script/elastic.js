cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setAction () {
        let seq = [];
        seq.push(cc.scaleTo(0.1, 1.05, 0.95).easing(cc.easeQuinticActionOut()));
        seq.push(cc.scaleTo(0.2, 0.95, 1.05).easing(cc.easeCubicActionOut()));
        seq.push(cc.scaleTo(0.3, 1, 1).easing(cc.easeCubicActionIn()));
        return cc.sequence(...seq);
    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        this.node.runAction(this.setAction());
    },


    // update (dt) {},
});
