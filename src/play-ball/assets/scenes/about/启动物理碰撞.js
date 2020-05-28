cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
    },

    start () {

    },
});
