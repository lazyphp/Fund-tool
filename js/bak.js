$(function(){

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

        try{
            var json_content = JSON.parse(content)
            for(var i in json_content){
                localStorage.setItem(i, JSON.stringify(json_content[i]));
            }

            alert('数据还原成功!');
        }catch (error){
            alert('无法还原输入的备份数据');
            return false;
        }

    })

})