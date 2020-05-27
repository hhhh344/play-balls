// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    Load_main(){
        cc.director.loadScene('main');
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {

        //左上角第一个button的位置
        var size = this.node.parent.getContentSize();
        //console.log(size);

         let init_x =  - size.width/2 + 50;
         let init_y =   size.height/2 - 70;
         this.node.x = init_x;
         this.node.y = init_y;
         
    },

    // update (dt) {},
});
