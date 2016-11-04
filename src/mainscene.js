var mainLayer;
var MainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (randomX,randomY) {
        this._super();
        var size = cc.winSize;
        var circle = new cc.DrawNode();
        circle.drawDot(
                   cc.p(20,20), // 圆点
                   50, // 半径
                   cc.color(255,255, 255, 200) // 圆的颜色
                   );
        circle.setPosition(randomX,randomY);
        this.addChild(circle);
        circle.setTag(LocalData.userid);
        // 查询所有玩家
        var queryReq = ProtoMessage.buildMessage(ProtoIds.MAIN_SCENE_QUERY_ALL);
        Network.getInstance().send(queryReq);
        return true;
    },
    onEnter:function(){
     this._super();
      //添加触屏事件
      cc.eventManager.addListener({
          event:cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches:true,//吞噬事件 不再传递
          onTouchBegan:this.touchbegan,
          onTouchMoved:this.touchmoved,
          onTouchEnded:this.touchended
      },this);
  },
  touchbegan:function(touch,event){
     return true;
 },
 touchmoved:function(touch,event){
    var x = touch.getLocationX();
    var y = touch.getLocationY();
    var self = event.getCurrentTarget().getChildByTag(LocalData.userid);
    self.setPosition(touch.getLocationX(),touch.getLocationY());
    if((x*x+y*y)>=25){
        cc.log("send move to server");
        var moveReq = ProtoMessage.buildMessage(ProtoIds.MAIN_SCENE_MOVE,{"x":self.getPositionX(),"y":self.getPositionY()});
        Network.getInstance().send(moveReq);
    }
    return true;
},
touchend:function(touch,event){
 return true;
},
queryAllUserHandle:function(code,msg){
    var users = JSON.parse(msg);
    for (var index in users) {
        var userInfo = users[index];
        if(this.getChildByTag(userInfo[0])!=undefined){
            cc.log('already exists');
            continue;
        }
        var circle = new cc.DrawNode();
        circle.drawDot(
                       cc.p(20,20), // 圆点
                       50, // 半径
                       cc.color(255,255, 255, 200) // 圆的颜色
                       );
        circle.setPosition(userInfo[1],userInfo[2]);
        this.addChild(circle);
        circle.setTag(userInfo[0]);
    }
},
userEnterMainScene:function(code,msg){
    cc.log('user enter');
    var userInfo =JSON.parse(msg);
    if(this.getChildByTag(userInfo[0])!=null){
        cc.log('already exists');
        return;
    }
    var circle = new cc.DrawNode();
    circle.drawDot(
                   cc.p(20,20), // 圆点
                   50, // 半径
                   cc.color(255,255, 255, 200) // 圆的颜色
                   );
    circle.setPosition(userInfo[1],userInfo[2]);
    this.addChild(circle);
    circle.setTag(userInfo[0]);
},
userMove:function(code,msg){
    var userInfo =JSON.parse(msg);
    cc.log('circle move');
    if(userInfo[0]==LocalData.userid){
        cc.log("self not move");
        return;
    }
    if(this.getChildByTag(userInfo[0])!=null){
        var circle = this.getChildByTag(userInfo[0]);
        circle.setPosition(userInfo[1],userInfo[2]);
    }else{
       var circle = new cc.DrawNode();
       circle.drawDot(
                        cc.p(20,20), // 圆点
                        50, // 半径
                        cc.color(255,255, 255, 200) // 圆的颜色
                        );
       circle.setPosition(userInfo[1],userInfo[2]);
       this.addChild(circle);
       circle.setTag(userInfo[0]);
   }
}
});

var MainScene = cc.Scene.extend({
    ctor:function (randomX,randomY) {
        this._super();
        mainLayer = new MainLayer(randomX,randomY);
        this.addChild(mainLayer);
    }
});
