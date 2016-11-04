var loginLayer;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var btnMenu = new cc.MenuItemFont('Enter Main Scene',function(){
            cc.log('Enter Main Scene');
            // 登录
            var loginRequest = ProtoMessage.buildMessage(ProtoIds.LOGIN);
            Network.getInstance().send(loginRequest);
        },this);
        var menu = new cc.Menu(btnMenu);
        this.addChild(menu);
        return true;
    },
    loginHandle:function(code,msg){
        if(code==ResultType.SUCCESS){
            var okText = new cc.LabelTTF("login success","",20);
            okText.setPosition(okText.width/2+20,okText.height/2+20);
            this.addChild(okText);
            LocalData.userid = JSON.parse(msg)[0];
            cc.log("userid:"+LocalData.userid);
            // 进入主场景
            var enterMainSceneReq = ProtoMessage.buildMessage(ProtoIds.ENTER_MAIN_SCENE);
            Network.getInstance().send(enterMainSceneReq);
        }else{
            var okText = new cc.LabelTTF("login failed","",20);
            okText.setPosition(okText.width/2+20,okText.height/2+20);
            this.addChild(okText);
        }
    },
    enterMainSceneHandle:function(code,msg){
        cc.log("enter main scene");
        var ret = JSON.parse(msg);
        cc.log(ret);
        cc.director.runScene(new MainScene(ret[0],ret[1]));
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        loginLayer = new HelloWorldLayer();
        this.addChild(loginLayer);
    }
});
