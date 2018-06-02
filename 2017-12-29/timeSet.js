;var timeRun = (function(){

        function timeSet(){
            var oDate = new Date(),
                h = oDate.getHours(),
                m = oDate.getMinutes(),
                s = oDate.getSeconds(),
                str = addO(h)+':'+addO(m)+':'+addO(s)
            document.body.innerHTML = ''
            document.write(str)
        }

        function addO(num){
            if(num<10){
                return  '0' + num
            }else{
                return num
            }
        }

        function install(){
            timeSet()
            var timer = setInterval(timeSet,1000)
        }

        return install
})()