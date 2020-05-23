var EndBall = cc.Class({
    
    extends: cc.Component,
    
    properties:{
        //刚体检测
        rigidBody: {
            type: cc.RigidBody,
            default: null
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
                pathPos.push(cc.v2(250, -350));
                //回到发射台的右侧
                pathPos.push(cc.v2(250, 420));

                pathPos.push(cc.v2(0, 350));
            }else{

                pathPos.push(cc.v2(-250, -350));
                pathPos.push(cc.v2(-250, 420));
                pathPos.push(cc.v2(0, 350));
            }
           
            // 回收小球
            this.node.runAction(cc.sequence(
                cc.cardinalSplineTo(1, pathPos, 0.9),
                cc.callFunc(function () {
                    this.rigidBody.active = true;
                    this.main.recycleBall();
                }.bind(this))
            ))
            this.isTouchedGround = false;
        }

    },
    
    //小球发生碰撞时
    onBeginContact(contact, selfCollider, otherCollider) {
        //console.log('xxx');
        if (otherCollider.node.name == 'ground') {
            this.isTouchedGround = true;
        }
    }
});

module.exports = EndBall;