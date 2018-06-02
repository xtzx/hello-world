var oDiv = (function(){
    var Obj = function(options){
        tab.call(this,options)
        tab.prototype.__proto__ =  oDiv.prototype
   }
   Obj.prototype = {
    __proto__: Tab.prototype,
    autoPlay: function(){
        var _this = this;
        setInterval(function(){
            if (++_this.curIndex > (_this.aLiList.length - 1)){
                _this.curIndex = 0;
            }
            _this.cutTabStyle();
            _this.cutTabBox();
        }, this.timeLen * 1000);
    }
}

})()