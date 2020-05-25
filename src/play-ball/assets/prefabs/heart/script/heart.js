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
        if(otherCollider.node._name == this.ball._name) {
            //心被碰撞时 播放音效
            if(com.data == 1) {
                cc.audioEngine.playEffect(this.collideAudio);
            }
            com.result=1;
            console.log('win');
            this.open_the_door();
            this.scheduleOnce(function() {
                if(this.nextSceneName=='game_z_13'|| this.nextSceneName=='game_z_14'){
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                }else{
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.director.loadScene(this.nextSceneName);
            }, 0.3);
            //小球碰撞后,即胜利后则取消监听,防止多次碰撞,多次胜利
            this.node.getComponent(cc.RigidBody).enabledContactListener = false;
        }
    },

    open_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        this.circle_transition.active=true;
        this.circle_transition.scale=0.1;
        cc.tween(this.circle_transition)
            .to(0.3, { scale: 3 })
            .start();
    },

    close_the_door:function(){
        this.circle_transition.x=this.ball.x;
        this.circle_transition.y=this.ball.y;
        cc.tween(this.circle_transition)
            .to(0.3, { scale: 0.1 })
            .start();
        this.scheduleOnce(function() {
            this.circle_transition.active=false;
        },0.3);
    },
    close_the_reddoor:function(){
        this.circle_red.x=this.ball.x;
        this.circle_red.y=this.ball.y;
        this.circle_red.scale = 3;
        this.circle_red.active=true;
        cc.tween(this.circle_red)
            .to(0.3, { scale: 0.1 })
            .start();
        this.scheduleOnce(function() {
            this.circle_red.active=false;
        },0.3);
    },
    update (dt) {},
});
