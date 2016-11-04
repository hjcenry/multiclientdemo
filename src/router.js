var Router  = (function(){
    var instance = null;
    function getRouterInstance (){
        var routerInstance = {
            route:function(data){
                var jsonData = JSON.parse(data);
                var typeid = jsonData.typeid;
                var code = jsonData.data.code;
                var msg = jsonData.data.msg;
                cc.log('Network receive:'+data);
                switch(jsonData.typeid){
                    case ProtoIds.LOGIN:// 登录
                        loginLayer.loginHandle(code,msg);
                    break;
                    case ProtoIds.ENTER_MAIN_SCENE:// 进入主场景
                        loginLayer.enterMainSceneHandle(code,msg);
                    break;
                    case ProtoIds.MAIN_SCENE_QUERY_ALL:// 查询所有玩家
                        mainLayer.queryAllUserHandle(code,msg);
                    break;
                    case ProtoIds.USER_ENTER_MAIN_SCENE:// 其他玩家进入了场景
                        mainLayer.userEnterMainScene(code,msg);
                    break;
                    case ProtoIds.USER_MOVE:// 其他玩家移动
                        mainLayer.userMove(code,msg);
                    break;
                }
            }
        };
        return routerInstance;
    };

    return {
        getInstance:function(){
            if(instance === null){
                instance = getRouterInstance();
            }
            return instance;
        }
    };
})();