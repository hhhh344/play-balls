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
        url: '',
        bg: cc.Sprite,
        btn: cc.Button
    },
    init () {
        this.index = -1;
        this.__name = '';
    },

    LoadExample () {
        if (this.url) {
            cc.director.loadScene(this.url);
        }
    },

    UpdateItem (index,x, y, name, url) {
        let isDir = 0;
        this.index = index;
        this.node.y = y;
        this.node.x = x;
        this.label.string = this.__name = index;
        this.url = url;
        this.bg.enabled = !isDir;
        this.btn.interactable = !isDir;
    }
 
});
