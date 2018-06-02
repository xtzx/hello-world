/**
 * 页面选项卡组件
 * @author JZY
 * @param aLiList {collection} 选项卡的节点列表
 * @param aDivList {collection} 选项卡内容的节点列表
 * @param evType {string} 事件类型, 可选
 * @param curIndex {number} 当前卡的索引, 可选
 * @param callback {function} 回调函数, 可选
 * @returns null
 * @last modify by: JZY
 */
var tab = (function(){
    // 变量提升
    var params = {};

    // 切换卡的样式
    function cutTabStyle(index){
        // 切换卡的样式, 先移除说有LI标签的class，然后再给指定添加class
        for (var k = 0; k < params.aLiList.length; k++){
            params.aLiList[k].className = '';
        }
        params.aLiList[index].className = 'selected';
    }

    // 切换内容的显示隐藏
    function cutTabContent(index){
        // 切换内容的显示隐藏
        for (var k = 0; k < params.aDivList.length; k++){
            params.aDivList[k].style.display = 'none';
        }
        params.aDivList[index].style.display = 'block';
    }

    // 循环添加事件
    function bindEvent(){
        for (var i = 0; i < params.aLiList.length; i++){
            // 添加索引
            params.aLiList[i].index = i;
            // 事件添加
            params.aLiList[i][params.evType] = function(){
                // 事件处理函数中不要出现过多的业务逻辑代码
                // 获取当前索引
                var v = this.index;
                // 
                cutTabStyle(v);
                // 
                cutTabContent(v);
                // 执行回调
                params.callback && params.callback(v);
            };
        }
    }

    // 参数处理
    function setParams(options){
        params.aLiList  = options.aLiList;
        params.aDivList = options.aDivList;
        // 判断参数
        if (!params.aLiList || !params.aDivList){
            console.error('组件传参有误~~~');
            return;
        }
        // 可选参数 ||
        params.curIndex = options.curIndex || 0;
        // 判断是否越界
        params.curIndex = params.curIndex < 0 ? 0 : params.curIndex;
        params.curIndex = params.curIndex > (params.aLiList.length - 1) ? (params.aLiList.length - 1) : params.curIndex;
        params.evType   = options.evType || 'onclick';
        params.callback = options.callback || null;
    }

    // 组件入口
    function install(options){
        // 里边尽量都是方法的调用
        setParams(options);
        // 组件的初始化
        cutTabStyle(params.curIndex);
        cutTabContent(params.curIndex);
        // 绑定事件
        bindEvent();
    }

    // 公开接口
    return install;
})();
