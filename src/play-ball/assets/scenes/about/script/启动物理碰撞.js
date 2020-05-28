cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -300);
    },

    start () {

    },
});
