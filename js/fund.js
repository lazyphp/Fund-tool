document.addEventListener('DOMContentLoaded', function()
{
    sendMessageToBackground();
});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage({greeting: 'aa'}, function(response) {

    });
}


$(function () {
    var extension_id = chrome.runtime.id;
    $('.fund-tool').removeClass('no-tool');

    $('body').on('click', '.fund-tool', function(){
        sendMessageToBackground('test');
        return false;
    })

})