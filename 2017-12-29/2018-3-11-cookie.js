function setCookie(name, val, iTime){
    if (typeof iTime == 'undefined'){ // 会话级的
        document.cookie = name + '=' + val;
    } else {
        var oDate = new Date();
        oDate.setTime(oDate.getTime() + iTime * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + val + ';expires=' + oDate;
    }
}

function getCookie(name){
    var arr = document.cookie.split('; ')
    for(var i = 0 ; i<arr.length; i++){
        var arr2 = arr[i].split('=')
        if(arr2[0] == name){
            return arr2[1]
        }
    }
    
}

function deleteCookie(name){
    setCookie(name,'',-1)
}