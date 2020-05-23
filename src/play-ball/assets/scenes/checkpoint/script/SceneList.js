// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//require("../../../creator");

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

        //加载game按钮
        this.initItem();
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
                //scene位于文件夹名
                let DirName = cc.path.dirname(url).replace('db://assets/scenes/', '');
                //获得scene名
                let SceneName = cc.path.basename(url, '.fire');


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

        //得到所有文件夹的名字
        let dirs = Object.keys(dict);

        dirs.sort();

        /**
         * name : xx 
         * url  : xx
         *  */

         //将名字和url对应起来
        for(let i = 0; i < dirs.length; i++){

            let name = Object.keys(dict[dirs[i]])[0];
            let url = dict[dirs[i]][name];

            console.log(name);
            //如果不是game就跳过
            if(!name.startsWith('game')){
                continue;
            }


            this.SceneList.push({name, url});
            
        }

      
    },

    //生成按钮
    initItem(){
        //左上角第一个button的位置
        let x = -300;
        let y = 280;

        let InitItemCount = Math.min(this.InitItemCount,this.SceneList.length);

        for (let i = 0; i < InitItemCount; ++i) {

            //得到一个scene
            let ItemInfo = this.SceneList[i];

        
            //生成一个新的item
            let item = cc.instantiate(this.ItemPrefab).getComponent('Select_Point_Item');
            this.node.addChild(item.node);

            //一行只存放三个按钮
            if((i + 1) % 4 == 0){
                y -= 150;
                x = -300;
            }else{
                x += 150;
            }
          

            //名字为game_01 最后的两个 即01
            item.UpdateItem (x, y, ItemInfo.name.slice(-2), ItemInfo.url);

            //将game的按钮push进item列表
            this.ItemList.push(item);
        }
    },

    start () {

    },

    // update (dt) {},
});
