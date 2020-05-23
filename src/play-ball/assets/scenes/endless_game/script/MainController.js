
var EndBall = require("../prefabs/ball/script/EndBall");

var MainController = cc.Class({
    extends: cc.Component,

    properties: {

        //预设障碍物
        prefabBarriers:{
            type:cc.Prefab,
            default:[]
        },

        //预设小球
        prefabBall:{
            type:cc.Prefab,
            default:null
        },

        //引导动画
        guidePlay:{
            type:cc.Node,
            default:null
        },

        //分数标签
        labelScore:{
            type:cc.Label,
            default:null
        },

        //球的数量
        labelBallNum:{
            type:cc.Label,
            default:null
        },
        
        //瞄准
        takeAim:{
            type:cc.Node,
            default:null
        },

        balls:{
            type:EndBall,
            default:[]
        }


    },

    onLoad(){

        //启用物理世界
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getActionManager().gravity = cc.v2(0, -1000); //设置重力
        
         //事件监听
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        
        //初始化，并显示指导动画
        this.init();
        this.guideShow();
    },

    init(){
        //计分牌
        this.score = 0; 

        //小球从圆圈出来到这个位置，再进行发射
        this.origin_site = cc.v2(0,310);

        this.guidePlay.active = false;

    },

    //触摸开始时
    onTouchStart() {
        this.guideStop();
    },

     //触摸结束
    onTouchEnd(touch) {

        //让引导射线消失
        let graphics = this.node.getChildByName("take_aim").getComponent(cc.Graphics);
        graphics.clear();

        let touchPos = this.node.convertTouchToNodeSpaceAR(touch.touch);
        this.shootBalls(touchPos.sub(this.origin_site));
        
    
    },
    //连续发射小球
    shootBalls(dir) {
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            this.scheduleOnce(function () {
                this.shootBall(ball, dir);
            }.bind(this), i * 0.2)
        }
    },

     //发射单个小球
    shootBall(ball, dir) {
        ball.rigidBody.active = false;
        let pathPos = [];

        //push进小球的初始位置,先移动初始位置
        pathPos.push(ball.node.position);
        pathPos.push(this.origin_site);

        ball.node.runAction(cc.sequence(

            //先移动到pathPos的位置
            cc.cardinalSplineTo(0.8, pathPos, 0.5),

            //再按照dir向量移动到touch的位置
            cc.callFunc(function () {
                ball.rigidBody.active = true;
                ball.rigidBody.linearVelocity = dir.mul(3);
            })
        ))
    },

    //显示小球总数
    setBallCount(num){
        this.labelBallNum.string = '小球数：' + num.toString();
    },



    //显示引导动画
    guideShow() {
        this.guidePlay.active = true;
        let handMove = this.guidePlay.getChildByName('handMove');
        let animCtrl = handMove.getComponent(cc.Animation);
        animCtrl.play('handMove');
    },

    guideStop(){
        this.guidePlay.active = false;
        let handMove = this.guidePlay.getChildByName('handMove');
        let animCtrl = handMove.getComponent(cc.Animation);
        animCtrl.stop('handMove');
    },
});
