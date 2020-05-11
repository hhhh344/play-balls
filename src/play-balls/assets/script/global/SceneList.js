// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

require("../../../creator");

cc.Class({
    extends: cc.Component,

    properties: {
        //跳转的按钮
        ItemPrefab:{
            default:null,
            type: cc.Prefab
        },

        //初始化一个页面展示按钮的数量
        InitItemCount: 0,
    
    },

    init(){

        //存放场景的列表
        this.SceneList = [];

        //存放按钮的列表
        this.ItemList  = [];

        //加载两个list
        this.initList();
    },

    onLoad(){

        this.init();

    },

    initList(){

        //获得项目中所有scene
        var scenes = cc.game._sceneInfos;

        //
        var dict = {};

        if(scenes){
            //遍历每个scene
            for(let i = 0; i < scenes.length; i++){

                //获得场景的链接，要靠这个完成跳转
                let url = scenes[i].url;

                //如果不是scenes目录中的则跳过
                if(!url.startsWith('db://assets/scenes')){
                    continue;
                }

                let DirName = cc.path.dirname(url).replace('db://assets/scenes/', '');
                //获得scene名
                let SceneName = cc.path.basename(url, '.fire');

                //console.log(SceneName);

                if (!DirName) DirName = '_root';
                if (!dict[DirName]) {
                    dict[DirName] = {};
                }
                dict[DirName][SceneName] = url;
            }
          
        }
        else{
            cc.error('failed to get scene list');
        }

        let dirs = Object.keys(dict);

        dirs.sort();

        for(let i = 0; i < dirs.length; i++){

            let name = Object.keys(dict[dirs[i]])[0];
            let url = dict[dirs[i]][name];

            this.SceneList.push({name, url});
            
        }
        //console.log(this.SceneList);

        let y = 150;
        let x = -400;
        let InitItemCount = Math.min(this.InitItemCount,this.SceneList.length);

        for (let i = 0; i < InitItemCount; ++i) {
            //console.log(InitItemCount);
            let item = cc.instantiate(this.ItemPrefab).getComponent('Select_Point_Item');
            //console.log(item);
            let ItemInfo = this.SceneList[i];
            //item.init(this.menu);
            this.node.addChild(item.node);
            if((i + 1) % 4 == 0){
                y -= 200;
                x = -400;
            }
            x += 200;
            item.UpdateItem (i,x, y, ItemInfo.name, ItemInfo.url);
            this.ItemList.push(item);
        }
    },

    start () {

    },

    // update (dt) {},
});
