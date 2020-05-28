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

        ScrollView:{
            default:null,
            type: cc.ScrollView
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

       
        /**
         * name : xx 
         * url  : xx
         *  */

         //将名字和url对应起来
        for(let i = 0; i < dirs.length; i++){

            let name = Object.keys(dict[dirs[i]])[0];
            let url = dict[dirs[i]][name];

            //console.log(name);
            //如果不是game就跳过
            if(!name.startsWith('game')){
                continue;
            }


            this.SceneList.push({name, url});
            
        }

        this.SceneList.sort(this.sortByField);
        //console.log(this.SceneList);
      
    },

    sortByField(x, y) {
        return x.name.slice(-2) < y.name.slice(-2);
    },


    //生成按钮
    initItem(){
        //左上角第一个button的位置
        var size = this.node.getContentSize();

        //两个按钮间的距离
        let item_nap = 150;

        let init_x = -5-item_nap;
        let init_y = size.height/2 - 200;

       

        let x = init_x;
        let y = init_y;

        let InitItemCount = Math.min(this.InitItemCount,this.SceneList.length);

        for (let i = 0; i < InitItemCount; ++i) {

            //得到一个scene
            let ItemInfo = this.SceneList[i];

        
            //生成一个新的item
            let item = cc.instantiate(this.ItemPrefab).getComponent('Select_Point_Item');
            //this.node.addChild(item.node);
            //item.parent = this.ScrollView;
            //ScrollView = this.ScrollView;
            this.ScrollView.content.addChild(item.node);
            //item.parent = ScrollView.content;

            //名字为game_01 最后的两个 即01
            item.UpdateItem (x, y, ItemInfo.name, ItemInfo.url);

            //一行只存放三个按钮
            if((i + 1) % 3 == 0){
                y -= 150;
                x = init_x;
            }else{
                x += item_nap;
            }
          

            //将game的按钮push进item列表
            this.ItemList.push(item);
        }
    },

    start () {

    },

    // update (dt) {},
});
