var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        nextSceneName: {
            default: 'game_01',
        },

        otherBallScript: {
            default: 'normal_ball'
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
    },

    start () {

    },

    onCollisionEnter: function(other, self) {
        if(com.data == 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        const otherScript =  other.getComponent(this.otherBallScript);
        otherScript.xSpeed = 0;
        otherScript.ySpeed = 0;
        console.log('win');
        cc.director.loadScene(this.nextSceneName);
    },

    update (dt) {},
});
