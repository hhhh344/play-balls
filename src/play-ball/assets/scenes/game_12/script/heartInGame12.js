var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        circle_transition: {
            default: null,
            type: cc.Node
        },

        circle_red: {
            default: null,
            type: cc.Node
        },

        ball: {
            default: null,
            type: cc.Node
        },

        nextSceneName: {
            default: 'game_01',
        },
        
        collideAudio: {
            default: null,
            type: cc.AudioClip
        },

        // upperCurtain: {
        //     default: null,
        //     type: cc.Node
        // },
        // lowerCurtain: {
        //     default: null,
        //     type: cc.Node
        // },
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        if(com.result==1){
            this.scheduleOnce(function() {
                this.close_the_door();
            }, 0.1);
        }
        else if(com.result==-1){
            this.circle_transition.active=false;
            this.close_the_reddoor();
        }
    },

    start () {

    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        if(com.data == 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        if(otherCollider.name == `${this.ball.name}<PhysicsCircleCollider>`) {   
            com.result=1;
            console.log('win');
            this.open_the_door();
            this.scheduleOnce(function() {
                cc.director.loadScene(this.nextSceneName);
            }, 1.2);
            this.node.getComponent(cc.RigidBody).enabledContactListener = false;
        }
    },
    
    open_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        this.circle_transition.active=true;
        this.circle_transition.scale=0.1;
        cc.tween(this.circle_transition)
        .to(.5, { scale: 2.74 })
        .start()
    },

    close_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        cc.tween(this.circle_transition)
        .to(.5, { scale: 0.1 })
        .start()
                this.scheduleOnce(function() {
            this.circle_transition.active=false;
                    },.5);
    },
    close_the_reddoor:function(){
        this.circle_red.x=this.ball.x;
        this.circle_red.y=this.ball.y;
        this.circle_red.scale = 2.5;
        this.circle_red.active=true;
        cc.tween(this.circle_red)
        .to(.5, { scale: 0.1 })
        .start()
                this.scheduleOnce(function() {
            this.circle_red.active=false;
                    },.5);
    },
    // close_the_door:function(){
    //     com.transition = -com.transition;
    //     var win_size = cc.director.getWinSize();
        
    //     var m1 = cc.moveBy(0.5,0,3504);
       
    //     this.lowerCurtain.runAction(m1);
      
    //     var m2 = cc.moveBy(0.5,0,-3504);

    //     this.upperCurtain.runAction(m2);
    //     cc.log('close_the_door');
    // },

    // open_the_door:function(){
    //         com.transition = -com.transition;
    //         var win_size = cc.director.getWinSize();
            
    //         var m1 = cc.moveBy(0.5,0,-3504);
           
    //         this.lowerCurtain.runAction(m1);
          
    //         var m2 = cc.moveBy(0.5,0,3504);
    
    //         this.upperCurtain.runAction(m2);
    //         cc.log('open_the_door');
    // },
    update (dt) {},
});
