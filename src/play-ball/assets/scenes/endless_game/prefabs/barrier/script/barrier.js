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
        let sc = this.main.setBarrierScore();
        this.setScore(sc);

        let r = this.node.color.r - sc * 5;
        let g = this.node.color.g - sc;
        let b = this.node.color.b - sc * 5;

        if(r <= 180){
            r = 180;
        }
        if(g <= 180){
            g = 180;
        }
        if(b <= 180){
            b = 180;
        }
        this.node.color = cc.color(r, g, b, 255);

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
        let r = this.node.color.r + 20;
        let g = this.node.color.g + 20;
        let b = this.node.color.b + 20;

        if(r >= 255){
            r = 255;
        }
        if(g >= 255){
            g = 255;
        }
        if(b >= 255){
            b = 255;
        }
       
        this.node.color = cc.color(r, g, b, 255);
      
        //console.log(this.node.color);
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
        this.contact = true;
    },
});
module.exports = Barrier;
