var ProtoMessage = (function(){
    var typeid;
    var userid;
    var data;
    return {
        buildMessage:function(typeid,data,userid){
            this.typeid = undefined;
            this.userid = undefined;
            this.data = undefined;
            switch(arguments.length){
                case 3:
                    this.userid = userid;
                case 2:
                    this.data = data;
                case 1:
                    this.typeid = typeid;
                break;
            }
            return  JSON.stringify(this) ;
        }
    };
})();