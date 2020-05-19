// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        nextSceneName: {
            default: 'game_01',
        },

        otherBallScript: {
            default: 'normal_ball'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },

    start () {

    },

    onCollisionEnter: function(other, self) {
        const otherScript =  other.getComponent(this.otherBallScript);
        otherScript.xSpeed = 0;
        otherScript.ySpeed = 0;
        console.log(otherScript.xSpeed);
        console.log('fail');
        cc.director.loadScene(this.nextSceneName);
    },

    // update (dt) {},
});
