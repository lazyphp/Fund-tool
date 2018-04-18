/**
 * 还原数据
 * @param json 需要还原的数据
 * @returns {boolean}
 */
var restore_data = function (json) {
    try{
        for(var i in localStorage) {
            if (isNumeric(i)) {
                localStorage.removeItem(i);
            }
        }

        var json_content = JSON.parse(json)
        for(var i in json_content){
            localStorage.setItem(i, JSON.stringify(json_content[i]));
        }

        alert('数据还原成功!');
        window.location.reload();
    }catch (error){
        alert('备份数据存在异常,程序无法解包');
        return false;
    }
}

$(function(){

    //清空预览数据
    localStorage.setItem('preview', '');

    /**
     * 在页面列出手动备份的JSON
     */
    var print_bak_json = function(){
        var bak = {};

        for(var i in localStorage) {
            if (isNumeric(i)) {
                var content = localStorage.getItem(i);
                if (content != '') {
                    bak[i] = JSON.parse( content );
                }
            }
        }

        $('.am-pre-scrollable').html(JSON.stringify(bak))
    }();

    /**
     * 点击还原按钮
     */
    $('.restore').on('click', function () {
        if(!confirm('确认要还原数据?已有数据将被覆写!')){
            return false;
        }

        var content = $('.restore-content').val();
        if(isBlank(content)){
            alert('请输入您要还原的备份数据');
            return false;
        }

        restore_data(content)

    });

    /**
     * 通过API还原数据 或者 预览备份内容
     */
    $('body').on('click', '.restore-api, .preview', function () {
        var preview = $(this).hasClass('preview');
        var restore = $(this).attr('data');

        if(preview == false){
            if(!confirm('确认要还原数据?已有数据将被覆写!') ){
                return false;
            }
        }


        var apikey = localStorage.getItem('apikey');
        if(isBlank(apikey)){
            return true;
        }

        var param = {
            url : API_URL+'/Api/Backup/restore/'+Math.random(),
            data : {
                apikey : apikey,
                restore : $(this).attr('data'),
                method : 'GET'
            },
            dialog : false
        };
        $ajax(param, function (content) {
            if(content.status == 200){
                if(preview){
                    localStorage.setItem('preview', content['data'][0]['json']);
                    chrome.tabs.create({url: 'popup.html?preview=true&restore='+restore});
                }else{
                    restore_data(content['data'][0]['json'])
                }

            }
        })

    });

    /**
     * 读取APIKEY内容，并列出服务器中的备份数据
     */
    var loadApiKeyContent = function(){
        var apikey = localStorage.getItem('apikey');
        if(isBlank(apikey)){
            return true;
        }
        $('.am-backup-hide').show();
        
        var param = {
            url : API_URL+'/Api/Backup/'+Math.random(),
            data : {
                apikey : apikey,
                method : 'GET'
            },
            dialog : false
        };
        
        $ajax(param, function (content) {
            var str = '';
            if(content.status == 200){
                for(var i in content.data){
                    var param = content.data[i];
                    str += '<li>' +
                        '<div class="am-g">' +
                        '<div class="am-u-sm-2">'+param['no']+' </div>' +
                        '<div class="am-u-sm-2">'+param['date']+' </div>' +
                        '<div class="am-u-sm-2">' +
                        '<span class="am-btn list-btn am-btn-primary restore-api" data="'+param['no']+'">还原</span> ' +
                        '<span class="am-btn list-btn am-btn-danger delete-api" data="'+param['no']+'">删除</span> ' +
                        ' <span class="am-btn list-btn am-btn-warning preview" data="'+param['no']+'">预览</span>' +
                        '</div>' +
                        '<div class="am-u-sm-3"></div>' +

                        '</div>' +
                        '</li>';
                }
            }else{
                str = '<li>'+content.msg+'</li>';
            }

            $('.backup-list').html(str);
        })

        $('.apikey').val(apikey);
    }();

    /**
     * 保存API并验证是否有效
     */
    $('.record-api').on('click', function(){
        var apikey = $('.apikey').val();
        if(isBlank(apikey)){
            alert('请输入API密钥')
            return false;
        }

        var param = {
            url : API_URL+'/Api/Backup/check/'+Math.random(),
            data: {apikey:apikey},
            dialog: false
        };

        $ajax(param, function(data, d){
            console.dir(data)
            if(data.status == 200){
                var msg = '接口APIKEY已更新'
                localStorage.setItem('apikey', apikey);
            }else{
                var msg = data.msg;
            }
            d.content(msg).showModal();
            setTimeout(function () {
                d.close();
                window.location.reload();
            }, 3000);
        });
    })

    /**
     * 跳转到借口申请页
     */
    $('.signup').on('click', function(){
        chrome.tabs.create({url: API_URL+'/login.html'});
    })

    /**
     * 删除备份
     */
    $('body').on('click', '.delete-api', function(){
        if(!confirm('确定要删除备份吗?')){
            return false;
        }

        var apikey = localStorage.getItem('apikey');
        var no = $(this).attr('data');
        var param = {
            url : API_URL+'/Api/Backup/'+Math.random(),
            data : {
                apikey: apikey,
                method: 'DELETE',
                no : no
            }
        }
        $ajax(param, function(data){
            setTimeout(function () {
                window.location.reload();
            }, 2500)
        })
    })

})