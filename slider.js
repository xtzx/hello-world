KG.ZM.Slider = (function(){
    var ObjProvite = (function(){
        return {
            _setPara: function(options){
                // this.msg = options.msg;
                this.sliderWrapper = options.sliderWrapper
                this.sliderArrow = options.sliderArrow
                this.sliderControl = options.sliderControl
                this.curIndex = options.curIndex
                this.autoPlay = options.autoPlay
                this.evType = options.evType
                this.oUl = options.sliderWrapper.querySelector('.box ul')
                this.moveLen = this.sliderWrapper.clientWidth
                this.timer = null
                if(!this.sliderWrapper){
                    throw new Error('error')
                }
                this.aLiList = this.sliderWrapper.querySelectorAll('.box > ul > li')
            }
        };
    })();
    
    var Obj = function(options){
        if (this instanceof Obj){
            ObjProvite._setPara.call(this, options);
            // ObjProvite._setPara(options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        install: function(){
            this.setCtelDot();
            this.bindSliderArrow();
            this.setInitStyle();
            this.bindDot()
            this.bindWrapper()
        },

        bindWrapper:function(){
            _this = this
            this.sliderWrapper.onmouseenter = function(){

            }
            this.sliderWrapper.onmouseleave = function(){
                var timer = setInterval(function(){

                },1000)
            }
        },

        stopTimer:function(){
            setInterval&&clearInterval(timer)
        },
        bindSliderArrow:function(){

        },
        autoPlayFn:function(){

        }
        ,_move:function(){

        },
        bindDot:function(){
            _this = this
            this.sliderControl['on' + this.evType] = function(ev){
                ev.stopPropagation();
                // console.log(ev.target.nodeName)
                if(ev.target.nodeName == 'SPAN'){
                    _this.findIndex(ev.target.parentNode,ev.target)
                }

            }
        }
        ,oDotCtrl:function(){
            var v = this.curIndex
            for(var i = 0 ; i <this.aLiList.length;i++){
                if( v == i)
                return 
                else{
                    
                }
            }
        }
        ,findIndex:function(arr,obj){
            var index = -1;
            for(var i = 0 ; i<arr.length ; i++){
                if(obj == arr[i])
                index = i
                break
            }
            return index
        }
        ,setInitStyle:function(){
            this.oUl.style.position = 'absolute';
            this.oUl.style.left = -1*this.moveLen*this.curIndex + 'px';
            this.oUl.style.top = '0px';
            this.sliderWrapper.style.position = 'relative';
            this.sliderWrapper.style.overflow = 'hidden';
        },
        setCtelDot:function(){
            if(!this.sliderControl){
                return;
            }
            var str = ''
            for(var i = 0;i<this.aLiList.length;i++){
                if(i==this.curIndex){
                    str += '<span class="selected"></span>'
                }else{
                    str +='<span></span>'
                }
            }
            this.sliderControl.innerHTML = str
        },
        setStyle: function(obj, json){
            for (var attr in json){
                if (attr != 'opacity'){
                    if (typeof json[attr] == 'number'){ // 说明是数值类型
                        json[attr] += 'px';
                    }
                    obj.style[attr] = json[attr];
                } else {
                    obj.style[attr] = json[attr]; // chrome , FF
                    obj.style[attr] = 'filter:alpha(opacity='+ (json[attr] * 100) +')';
                }
            }
        },
        onMouseOver:function(){
            _this = this 
            this.sliderWrapper.onmouseenter = function(){
                Velocity(_this.sliderArrow[0],{
                    left:dir == 'enter' ? 0 : -(this.sliderArrow[0].offsetWidth+10),
                },{
                    duration:300,
                })
            }
                Velocity(_this.sliderArrow[1],{
                    right:dir == 'enter' ? 0 : -(this.sliderArrow[1].offsetWidth+10),
                },{
                    duration:300,
                })
            },
        update: function(options){
            ObjProvite._setPara.call(this, options);
        },
        remove: function(){
            for (var attr in this){
                this[attr] = null;
                
            }
        }
    }
    return Obj;
})();