function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * 用于判断空，Undefined String Array Object
 */
function isBlank(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
        return true
    } else if (
        Object.prototype.toString.call(str) === '[object String]' ||
        Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
        return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
        return JSON.stringify(str) == '{}' ? true : false
    } else {
        return true
    }

}

/**
 * 弹窗提醒
 * @param msg 提示信息
 * @private
 */
var _alert = function (msg) {
    console.log(msg)
    var d = dialog({
        title : 'Tips',
        content : msg,
        id : '_alert'
    });
    d.showModal();
    setTimeout(function(){
        d.close().remove();
    }, 1500)

}

/**
 * 实时更新基金
 */
var refreshFund = function (user) {
    var time = moment().format('H');

    if( (parseInt(time) < 8 || parseInt(time) > 17) && user == false ){
        return false;
    }

    var xhr = [];
    for(var key in localStorage) {
        if (isNumeric(key)) {
            (function(key){
                xhr[key] = new XMLHttpRequest();
                xhr[key].open("GET", 'http://fundgz.1234567.com.cn/js/'+key+'.js?rt='+Date.parse(new Date()), true);
                xhr[key].onreadystatechange = function() {
                    if (xhr[key].readyState == 4) {
                        var result = xhr[key].responseText;
                        if(result){
                            //将JSONP格式手动解析为JSON字符串
                            try{
                                var fund = JSON.parse(result.match(/[a-z]+\((.*)\)/)[1]);
                                if(fund){
                                    //查找本地存储的基金数据
                                    var record = JSON.parse(localStorage.getItem(fund['fundcode']))
                                    if(record){
                                        //组装并更新对应基金的实时估算值
                                        record['now'] = fund['gsz'];
                                        record['gztime'] = fund['gztime'];
                                        record['name'] = fund['name'];
                                        localStorage.setItem(fund['fundcode'], JSON.stringify(record));
                                    }
                                }
                            }catch (err){
                                console.log('获取'+key+' 基金信息失败');
                            }
                        }
                    }

                }
                xhr[key].send();
            })(key)

        }
    }
}

/**
 * 更新单位净值
 * @param user
 * @returns {boolean}
 */
var refreshJingzhi = function (user) {
    var time = moment().format('H');

    if( (parseInt(time) > 9 && parseInt(time) < 19) && user == false ){
        return false;
    }

    var xhr = [];
    for(var key in localStorage) {
        if (isNumeric(key)) {
            (function(key){
                xhr[key] = new XMLHttpRequest();
                xhr[key].open("GET", 'http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz&code='+key+'&page=1&per=1&sdate=&edate=&rt='+Date.parse(new Date()), true);
                xhr[key].onreadystatechange = function() {
                    if (xhr[key].readyState == 4) {
                        var result = xhr[key].responseText;
                        if(result){
                            //将JSONP格式手动解析为JSON字符串

                            try{

                                var result_match = result.match(/<tbody.*>.*?<\/tbody>/);
                                if(result_match){
                                    var jingzhi = $(result_match[0]).find('.tor.bold').html();
                                    var jingzhi_time = $(result_match[0]).find('td').html();
                                    var record = JSON.parse(localStorage.getItem(key))
                                    if(!isBlank(jingzhi) && !isBlank(jingzhi_time) && !isBlank(record) ){
                                        record['jingzhi'] = jingzhi;
                                        record['jingzhi_time'] = jingzhi_time;
                                        localStorage.setItem(key, JSON.stringify(record));
                                    }
                                }
                            }catch (err){
                                console.log('获取'+key+' 基金单位净值失败');
                            }
                        }
                    }

                }
                xhr[key].send();
            })(key)

        }
    }
}