
var EndBall = require("../prefabs/ball/script/EndBall");
var Barrier = require("../prefabs/barrier/script/barrier");
require("./shake");

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
        },

        barriers:{
            type:Barrier,
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
        this.addBarriers();
    },

    init(){
        //计分牌
        this.score = 0; 

        //小球从圆圈出来到这个位置，再进行发射
        this.origin_site = cc.v2(0,310);

        this.guidePlay.active = false;

        this.balls[0].main = this;

        //设置障碍物的基本分
        this.barrierScoreRate  = 0;

        this.recycleBallsCount = 1;

    },

    //触摸开始时
    onTouchStart() {
        this.guideStop();
    },

     //触摸结束
    onTouchEnd(touch) {

        if (!this.isRecycleFinished()) {
            return;
        }

        //让引导射线消失
        let graphics = this.node.getChildByName("take_aim").getComponent(cc.Graphics);
        graphics.clear();

        //发射
        let touchPos = this.node.convertTouchToNodeSpaceAR(touch.touch);
        this.shootBalls(touchPos.sub(this.origin_site));

        //将回收的球置零
        this.recycleBallsCount = 0;
        
    
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

    //新增小球
    addBall(pos) {
        let ball = cc.instantiate(this.prefabBall).getComponent(EndBall);
        ball.node.parent = this.node;
        ball.node.position = pos;
        ball.main = this;
        this.balls.push(ball);
        //this.setBallCount(this.balls.length);
    },
    //添加障碍物
    addBarriers() {
        //障碍物的起始地点
        let startPosX = -240;

        //障碍物能到达的最右边
        let endPosX = 190;

        //第一个障碍物的位置
        let currentPosX = startPosX + this.getRandomSpace();

        //没有到达最右边就继续加
        while (currentPosX < endPosX) {
            //随机选择一个障碍物
            let barrier = cc.instantiate(this.prefabBarriers[Math.floor(Math.random() * this.prefabBarriers.length)]).getComponent(Barrier);
            
            //设定障碍物的位置
            barrier.node.parent = this.node;
            barrier.node.position = cc.v2(currentPosX, -320);
            barrier.main = this;
            currentPosX += this.getRandomSpace();

            this.barriers.push(barrier);
        }
    },

    //获取随机距离，用于生成障碍物的间距
    getRandomSpace() {
        return 80 + Math.random() * 100;
    },


    //消除障碍物
    removeBarrier(barrier) {
        let idx = this.barriers.indexOf(barrier);
        if (idx != -1) {
            barrier.node.removeFromParent(false);
            this.barriers.splice(idx, 1);
        }
    },

    //抖动障碍物
    shake(barrier) {
        let shake = cc.shake(0.7, 1, 1);
        barrier.node.runAction(shake);
    },

    //设置障碍物自身分数值
    setBarrierScore() {
        let score = Math.floor(this.randomNum(1 + 2 * this.barrierScoreRate, 5 + 3 * this.barrierScoreRate));
        return score;
    },

    //获取区间随机值
    randomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range);
        return num;
    },

    //收回小球，上移一排障碍物
    recycleBall() {
        //已经回收ball的数量
        this.recycleBallsCount++;
        //this.barrierScoreRate += 0.1;

        if (this.isRecycleFinished()) {
            for (let i = 0; i < this.barriers.length; i++) {
                let barrier = this.barriers[i];
                barrier.node.runAction(cc.sequence(
                    cc.moveBy(0.5, cc.v2(0, 100)),
                    cc.callFunc(function () {
                        if (barrier.node.position.y > 200) {
                            barrier.node.runAction(cc.shake(1.5, 3, 3));
                        }
                        if (barrier.node.position.y > 300) {
                            //cc.director.loadScene('endless_main');
                        }
                    }.bind(this))
                ))
            }
            this.addBarriers();
        }
    },

    //小球是否收回完毕
    isRecycleFinished() {
        return this.recycleBallsCount == this.balls.length;
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
