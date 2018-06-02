var tab = (function(){

    //1 构造函数
    var Obj = function(options){
        this.aLiList = opton.aLiList
        this.aDivList = opton.aDivList
        this.evType = opton.evType||'click'
        this.curIndex = opton.curIndex||0
        
    }
    Obj.prototype = {
        constructor:'Obj',
        version:'1.0.0',
        author:'zm',
        install:function(){
        
        },
        blindEve:function(){
            _this = this
            for(var i=0 ;i<this.aLiList.length;i++){
                (function(index){
                    _this.aLiList[index]['on' + _this.evType] = function(){
                        console.log(index)
                    }

                })(i)
            }

        },
        cutStyle:function(){
            for(var i = 0 ; i < this.aLiList.length; i++){
                    this.aLiList[i].class = ''
            }
            
        }
    }
        
    return Obj
})()