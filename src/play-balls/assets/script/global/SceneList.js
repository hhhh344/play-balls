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
    
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(){
        this.SceneList = [];
        this.initList();
    },
    onLoad(){
        this.init();
    },
    initList(){

        //获得项目中所有scene
        var scenes = cc.game._sceneInfos;

        var dict = {};

        if(scenes){
            //遍历每个scene
            for(let i = 0; i < scenes.length; i++){
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
            this.SceneList.push({
                name: dirs[i],
                url:null
            });

            let SceneName = Object.keys(dict[dirs[i]])[0];
            let url = dict[dirs[i]][SceneName];

            this.SceneList.push({SceneName, url});
            
        }
       console.log(this.SceneList);

    },

    start () {

    },

    // update (dt) {},
});
