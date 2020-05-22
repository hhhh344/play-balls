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
        },

        upperCurtain: {
            default: null,
            type: cc.Node
        },
        lowerCurtain: {
            default: null,
            type: cc.Node
        },
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.scheduleOnce(function() {
            this.open_the_door();
        }, 0.1);
    },

    start () {

    },

    onCollisionEnter: function(other, self) {
        if(com.data == 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        console.log('win');
        this.close_the_door();

        this.scheduleOnce(function() {
            cc.director.loadScene(this.nextSceneName);
        }, 0.5);
    },
    
    close_the_door:function(){
        com.transition = -com.transition;
        var win_size = cc.director.getWinSize();
        
        var m1 = cc.moveBy(0.5,0,3504);
       
        this.lowerCurtain.runAction(m1);
      
        var m2 = cc.moveBy(0.5,0,-3504);

        this.upperCurtain.runAction(m2);
        cc.log('close_the_door');
    },

    open_the_door:function(){
            com.transition = -com.transition;
            var win_size = cc.director.getWinSize();
            
            var m1 = cc.moveBy(0.5,0,-3504);
           
            this.lowerCurtain.runAction(m1);
          
            var m2 = cc.moveBy(0.5,0,3504);
    
            this.upperCurtain.runAction(m2);
            cc.log('open_the_door');
    },
    update (dt) {},
});
