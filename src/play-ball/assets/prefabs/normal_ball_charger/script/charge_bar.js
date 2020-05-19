var com = require('common');
cc.Class({
    extends: cc.Component,
    properties: {
        //小球节点
        player: {
            type: cc.Node,
            default: null,
        },

        //蓄力条边框
        border: {
            type: cc.Node,
            default: null,
        },

        //蓄力条
        rectangle: {
            type: cc.Node,
            default: null,
        },

        //画布
        Canvas: {
            type: cc.Node,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        const player = this.player;
        const playerScript = player.getComponent('normal_ball');
        const maxSpeed = playerScript.maxMoveSpeed;
        const minSpeed = playerScript.minMoveSpeed;
        const canvas = this.Canvas;
        const border = this.border;
        const rect = this.rectangle;
        const rectHeight = rect.height;

        //rectangle的高度与原高度之比小于该值，则取消发射小球
        const cancelRatio = 0.2;

        //鼠标与小球的距离≥maxDistance时，蓄力条满
        const maxDistance = 150;

        //rectangle的高度与原高度之比
        let ratio = 0;

        //蓄力条向量
        let [vecX, vecY, vecLength] = [0, 0, 0];

        //设置蓄力条透明，位置在小球上
        border.opacity = 0;
        [border.x, border.y] = [player.x, player.y];

        canvas.on(cc.Node.EventType.TOUCH_START, e => {
            if(playerScript.xSpeed == 0 && playerScript.ySpeed == 0 && com.mouse == 1) {
                border.opacity = 255;

                [vecX, vecY] = 
                [player.x + canvas.width/2 - e.getLocationX(), player.y + canvas.height/2 - e.getLocationY()];
                vecLength = Math.sqrt(vecX**2 + vecY**2);
                
                //蓄力条角度控制
                let theta = 360 * Math.atan(vecX/vecY)/(2*Math.PI);
                if(vecY < 0) {
                    theta += 180;
                }
                border.angle = -theta;

                //蓄力条长度控制
                ratio = vecLength/maxDistance;
                if(ratio <= cancelRatio) {
                    rect.height = 0;
                }
                else if(ratio < 1) {
                    rect.height = ratio * rectHeight;
                }
                else {
                    rect.height = rectHeight;
                }
            }
        });

        canvas.on(cc.Node.EventType.TOUCH_MOVE, e => {
            if(playerScript.xSpeed == 0 && playerScript.ySpeed == 0 && com.mouse == 1) {
                [vecX, vecY] = 
                [player.x + canvas.width/2 - e.getLocationX(), player.y + canvas.height/2 - e.getLocationY()];
                vecLength = Math.sqrt(vecX**2 + vecY**2);
                
                //蓄力条角度控制
                let theta = 360 * Math.atan(vecX/vecY)/(2*Math.PI);
                if(vecY < 0) {
                    theta += 180;
                }
                border.angle = -theta;

                //蓄力条长度控制
                ratio = vecLength/maxDistance;
                if(ratio <= cancelRatio) {
                    rect.height = 0;
                }
                else if(ratio < 1) {
                    rect.height = ratio * rectHeight;
                }
                else {
                    rect.height = rectHeight;
                }
            }
        });

        canvas.on(cc.Node.EventType.TOUCH_END, e => {
            if(playerScript.xSpeed == 0 && playerScript.ySpeed == 0 && com.mouse == 1) {
                border.opacity = 0;
                const deltaSpeed = maxSpeed - minSpeed;
                const cosTheta = vecX/vecLength;
                const sinTheta = vecY/vecLength;
                const speed = ratio * deltaSpeed + minSpeed;
                if(ratio > cancelRatio) {
                    [playerScript.xSpeed, playerScript.ySpeed] = 
                    [cosTheta * speed, sinTheta * speed];
                }
            }
        })
    },

    start () {

    },

    // update (dt) {
    //     
    // },
});
