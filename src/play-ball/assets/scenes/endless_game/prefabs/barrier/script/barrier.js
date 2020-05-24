//障碍物类
var Barrier = cc.Class({
    extends: cc.Component,
    properties: {
        lbScore: {
            default: null,
            type: cc.Label
        },
        isAddBuffBall: false,
    },
    //start
    start() {
      
        this.setScore(this.main.setBarrierScore());

    },
    //获取随机值
    randomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range);
        return num;
    },

    //设置分数
    setScore(score) {
        if (this.lbScore) {
            this.score = score;
            this.lbScore.string = this.score.toString();
        }
    },

    //发生碰撞时
    onBeginContact(contact, selfCollider, otherCollider) {
        
        if (this.name.startsWith('addBall')) {
            this.main.addBall(this.node.position);
            this.main.removeBarrier(this);
        } else {
            //this.main.addScore();
            if (this.score == 1) {
                this.main.removeBarrier(this);
            } else {
                this.main.shake(this);
                this.setScore(this.score - 1);
            }
           
        }
    }
});
module.exports = Barrier;
