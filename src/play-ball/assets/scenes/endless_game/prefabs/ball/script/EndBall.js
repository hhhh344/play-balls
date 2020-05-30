var com = require('../../../../common');
var Config = require('../../../script/config');
var EndBall = cc.Class({
    
    extends: cc.Component,
    
    properties:{
        //刚体检测
        rigidBody: {
            type: cc.RigidBody,
            default: null
        },

        collideAudio: {
            default: null,
            type: cc.AudioClip
        },
        //是否碰到了地面
        isTouchedGround: false
    },
   
    //加载完成
    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.collider = this.getComponent(cc.Collider);
    },
    
    //更新
    update(dt) {

        if (this.isTouchedGround) {
            this.rigidBody.active = false
            this.rigidBody.linearVelocity = cc.Vec2.ZERO;

            //记录路径点
            let pathPos = [];
            pathPos.push(this.node.position);
            if(this.node.position.x > 0){

                //回到地面的边界，右侧
                // pathPos.push(cc.v2(250, -350));
                pathPos.push(cc.v2(349, -498))
                //回到发射台的右侧
                //pathPos.push(cc.v2(250, 420));
                pathPos.push(cc.v2(338, 608))

                //pathPos.push(cc.v2(0, 350));
                pathPos.push(cc.v2(0, 446))
            }else{

                //回到地面的边界，左侧
                // pathPos.push(cc.v2(250, -350));
                pathPos.push(cc.v2(-349, -498))
                //回到发射台的右侧
                //pathPos.push(cc.v2(250, 420));
                pathPos.push(cc.v2(-338, 608))

                //pathPos.push(cc.v2(0, 350));
                pathPos.push(cc.v2(0, 446))
            }
            // 回收小球
            this.node.runAction(cc.sequence(
                cc.cardinalSplineTo(1, pathPos, 0.9),
                cc.callFunc(function () {
                    this.rigidBody.active = true;
                    this.main.recycleBall();
                   
                }.bind(this))
            ))
            this.node.group = Config.groupBallInGame;
            //console.log(this.node.group);
            this.isTouchedGround = false;
        }

    },
    
    //小球发生碰撞时
    onBeginContact(contact, selfCollider, otherCollider) {
        if(com.data === 1) {
            cc.audioEngine.playEffect(this.collideAudio);
        }
        //console.log('xxx');
        if (otherCollider.node.name == 'ground') {
            this.isTouchedGround = true;
           // this.rigidBody.active = false;
           
        }
    }
});

module.exports = EndBall;