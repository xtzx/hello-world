KG.XDD.Slider = (function(){
    var ObjProvite = (function(){
        return {
            _setPara: function(options){
                this.sliderWrapper = options.sliderWrapper;
                this.sliderArrow = options.sliderArrow || [];
                this.sliderControl = options.sliderControl || null;
                this.curIndex = options.curIndex || 0;
                this.evType = options.evType || 'mouseover';
                this.autoPlay = options.autoPlay;
                this.callback = options.callback || null;

                if (!this.sliderWrapper){
                    throw new Error('组件传参有误~~~');
                }
                
                // 获取大图LI节点列表
                this.aLiList = this.sliderWrapper.querySelectorAll('ul > li');
                // console.log(this.aLiList);
                // 大图的外层容器 UL
                this.oUl = this.sliderWrapper.querySelector('ul');
                // 每次运动的距离(长度)
                this.moveLen = this.sliderWrapper.clientWidth;
                // 大图数量
                this.Len = this.aLiList.length;
                // 定时器时间句柄
                this.timer = null;
                
                if (this.curIndex < 0){
                    this.curIndex = 0;
                }
                if (this.curIndex > this.Len - 1){
                    this.curIndex = this.Len - 1;
                }
            }
        };
    })();
    var Obj = function(options){
        if (this instanceof Obj){
            ObjProvite._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        install: function(){
            // 初始化轮播图的样式
            this.setInitStyle();

            // 初始化控制条的小圆点
            this.setCtrlDot();

            // 事件绑定 - 箭头
            this.bindArrowEvent();

            // 事件绑定 - 小圆点
            this.bindDotEvent();

            // 事件绑定 - 外层容器，自动播放
            this.bindWrapperEvent();

            // 自动播放
            this.autoPlayFn();
        },
        autoPlayFn: function(){
            if (!this.autoPlay){
                return;
            }
            this.play();
        },
        bindWrapperEvent: function(){
            var _this = this;
            // onmouseenter -> 效果和 onmouseover 一样，但是没有冒泡
            this.sliderWrapper.onmouseenter = function(){
                if (!_this.autoPlay){
                    return;
                }
                _this.stop();
                // 切换箭头显示隐藏状态动画
                _this.toggleArrow('enter');
            };
            // onmouseleave -> 效果和 onmouseout 一样，但是没有冒泡
            this.sliderWrapper.onmouseleave = function(){
                if (!_this.autoPlay){
                    return;
                }
                _this.play();
                // 切换箭头显示隐藏状态动画
                _this.toggleArrow('leave');
            };
        },
        toggleArrow: function(dir){
            if (this.sliderArrow.length == 0){
                return;
            }
            Velocity(this.sliderArrow[0], {
                left: dir == 'enter' ? 0 : -1 * (this.sliderArrow[0].offsetWidth + 10)
            }, {
                duration: 300
            });
            Velocity(this.sliderArrow[1], {
                right: dir == 'enter' ? 0 : -1 * (this.sliderArrow[1].offsetWidth + 10)
            }, {
                duration: 300
            });
        },
        play: function(){
            var _this = this;
            // 保证程序只有一个定时器在运行，因此在开启定时器之前先清空
            this.stop();
            this.timer = setInterval(function(){
                _this.moveLeft();
            }, 4000);
        },
        stop: function(){
            this.timer && clearInterval(this.timer);
        },
        bindDotEvent: function(){
            if (!this.sliderControl){
                return;
            }
            var _this = this;
            // 事件委派
            this.sliderControl['on' + this.evType] = function(ev){
                ev.stopPropagation();
                // 事件源对象
                var oTarget = ev.target;
                if (oTarget.nodeName.toLowerCase() == 'span'){
                    var v = _this.finedIndex(oTarget.parentNode.children, oTarget);
                    if (v == _this.curIndex){
                        return;
                    }
                    _this.curIndex = v;
                    _this._move();
                }
            };
        },
        finedIndex: function(arr, obj){
            var index = -1;
            for (var  i = 0; i < arr.length; i++){
                if (arr[i] === obj){
                    index = i;
                    break;
                }
            }
            return index;
        },
        bindArrowEvent: function(){
            if (this.sliderArrow.length == 0){
                return;
            }
            var _this = this;
            // 左
            this.sliderArrow[0].onclick = function(ev){
                ev.stopPropagation();
                _this.moveRight();
            };
            // 右
            this.sliderArrow[1].onclick = function(ev){
                ev.stopPropagation();
                _this.moveLeft();
            };
        },
        moveRight: function(){
            if (--this.curIndex < 0){
                this.curIndex = this.Len - 1
            }
            this._move();
        },
        moveLeft: function(){
            if (++this.curIndex > this.Len - 1){
                this.curIndex = 0
            }
            this._move();
        },
        _move: function(){
            var _this = this;
            if(this.curIndex == (this.Len-1)){
                var abs =  this.aLiList
                var i =0
                // console.log(this.aLiList[0].parentNode)
                this.aLiList[0].parentNode.appendChild(abs[i])
                i ++
                this.Len++
            };
            Velocity(this.oUl, {
                left: -1 * this.moveLen * this.curIndex
            }, {
                duration: 300,
                queue: false,
                complete: function(){
                    // 在动画结束时处理我们自己的回调
                    _this.callback && _this.callback(_this.curIndex);

                }
            });
            // 同步小圆点儿样式
            this.syncDotFn();
        },
        syncDotFn: function(){
            if (!this.sliderControl){
                return;
            }
            var aDotList = this.sliderControl.children;
            for (var i = 0; i < this.Len; i++){
                aDotList[i].removeAttribute('class');
            }
            aDotList[this.curIndex].className = 'selected';
        },
        setCtrlDot: function(){
            if (!this.sliderControl){
                return;
            }
            var str = '';
            for (var i = 0; i < this.Len; i++){
                if (i == this.curIndex){
                    str += '<span class="selected"></span>';
                } else {
                    str += '<span></span>';
                }
            }
            // DOM 操作越少越好
            this.sliderControl.innerHTML = str;
        },
        setInitStyle: function(){
            this.setStyle(this.sliderWrapper, {
                overflow: 'hidden',
                position: 'relative'
            });
            this.setStyle(this.oUl, {
                position: 'absolute',
                left: -1 * this.moveLen * this.curIndex,
                top: 0
            });
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
        update: function(options){
            ObjProvite._setPara.call(this, options);
        },
        remove: function(){
            // 有事件，需要解绑事件
            this.sliderArrow[0].onclick = null;
            this.sliderArrow[1].onclick = null;
            this.sliderControl['on' + this.evType] = null;
            this.sliderWrapper.onmouseenter = null;
            this.sliderWrapper.onmouseleave = null;
            // 关闭定时器
            this.stop();
            // 有动态的DOM节点，需要移除节点
            // 释放内存
            for (var attr in this){
                this[attr] = null;
            }
        }
    };
    return Obj;
})();
