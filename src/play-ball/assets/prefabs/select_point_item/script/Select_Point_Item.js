// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        url: ''
    },
    init () {
        this.index = -1;
        this.name = '';
    },

    LoadExample () {
        if (this.url) {
            if(this.name.startsWith('game_z')){
                  console.log(this.name);
                  cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
             }else{
                   cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            cc.director.loadScene(this.url);
        }
    },

    UpdateItem (x, y, name, url) {
        //设置按钮的位置
        this.node.y = y;
        this.node.x = x;

        //按钮label的名字
        this.label.string = name.slice(-2);
      
        this.url = url;
        this.name = name;
    }
 
});
