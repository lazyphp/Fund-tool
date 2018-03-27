

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

    var BadgeNumber = 0;

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
                }else{
                    continue;
                }

                if(getNoticeLocalStorage == null || getNoticeLocalStorage[date][i] % 10 == 0){
                    chrome.notifications.create(null, {
                        type: 'basic',
                        iconUrl: 'img/'+icon,
                        title: '基金定投提醒',
                        message: msg
                    });
                    BadgeNumber++;
                }
            }
        }
    }

    //添加通知图标数字提醒
    if(BadgeNumber > 0){
        chrome.browserAction.setBadgeText({text: String(BadgeNumber)});
    }
    localStorage.setItem("saveNotice", JSON.stringify({[date] : saveNotice}));
}

chrome.alarms.onAlarm.addListener(function(alarm) {
    refreshFund(false)
    notifications();
});
//創造定時器
chrome.alarms.create('testAlarm',{periodInMinutes: 1});