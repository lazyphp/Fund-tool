/**
 * 实时更新基金
 */
var refreshFund = function () {
    var time = moment().format('H');

    if(parseInt(time) < 8 || parseInt(time) > 17 ){
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
 * 消息提醒
 */
var notifications = function(){
    var saveNotice = {}
    var date = moment().format('YYYY-MM-DD');
    var time = moment().format('H:mm').split(':');
    if(parseInt(time[0]) != 14 || parseInt(time[1]) < 30 ){
        return false;
    }
    var getNoticeLocalStorage = JSON.parse(localStorage.getItem('saveNotice'));

    for(var i in localStorage) {
        if (isNumeric(i)) {
            var content = localStorage.getItem(i);
            if(content != '') {
                var json_str = JSON.parse(content);

                var msg = json_str.name + ' '+i;
                var icon = '';



                if (parseFloat(json_str.now) >= parseFloat(json_str.sell)) {
                    msg += ' 基金涨幅已达到可卖出价格，请及时处理';
                    icon = 'sell.png';
                    saveNotice[i] = getNoticeLocalStorage == null || !getNoticeLocalStorage[date][i] ? 11 : getNoticeLocalStorage[date][i] + 1;

                } else if (parseFloat(json_str.adding) >= parseFloat(json_str.now)) {
                    msg += ' 基金跌幅已达到补仓价格，请及时处理';
                    icon = 'adding.png';
                    saveNotice[i] = getNoticeLocalStorage == null || !getNoticeLocalStorage[date][i] ? 11 : getNoticeLocalStorage[date][i] + 1;
                }

                if(getNoticeLocalStorage == null || getNoticeLocalStorage[date][i] % 10 == 0){
                    chrome.notifications.create(null, {
                        type: 'basic',
                        iconUrl: 'img/'+icon,
                        title: '基金定投提醒',
                        message: msg
                    });
                }
            }
        }
    }
    localStorage.setItem("saveNotice", JSON.stringify({[date] : saveNotice}));
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    refreshFund()
    notifications();
});
//創造定時器
chrome.alarms.create('testAlarm',{periodInMinutes: 1});