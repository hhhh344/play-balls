//障碍物类
var Barrier = cc.Class({
    extends: cc.Component,
    properties: {
        lbScore: {
            default: null,
            type: cc.Label
        },
        isAddBuffBall: false,
        contact:false,
    },
    //start
    start() {
        if(!this.name.startsWith('addBall')){
            let sc = this.main.setBarrierScore();
            this.setScore(sc);
            
            let r = 120 - sc * 10;
            let g = 224 - sc * 10 ;
            let b = this.node.color.b;
            
            if(r <= 7){
                r = 7;
            }
            if(g <= 140){
                g = 140;
            }
           this.node.color = cc.color(r, g, b, 255);
        }
       this.node.zIndex = 9;

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
    update(){
        if(this.contact == true){
            let angle = this.node.rotation + 10;
            this.node.rotation = angle;
            console.log(this.node.rotation);
            this.contact = false;
        }
    },

    //发生碰撞时
    onBeginContact(contact, selfCollider, otherCollider) {
        //console.log(this.node.color);
        if (this.name.startsWith('addBall')) {
            this.main.addBall(this.node.position);
            this.main.removeBarrier(this);
        } else {
            let r = this.node.color.r + 10;
            let g = this.node.color.g + 10;
            let b = this.node.color.b;
    
            if(r >= 120){
                r = 120;
            }
            if(g >= 224){
                g = 224;
            }
           
            this.node.color = cc.color(r, g, b, 255);
            //this.main.addScore();
            if (this.score == 1) {
                this.main.removeBarrier(this);
            } else {
                this.main.shake(this);
                this.setScore(this.score - 1);
            }
           
        }
        this.contact = true;
    },
});
module.exports = Barrier;
