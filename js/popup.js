

var _list = function(){
	$('.fund_list').remove();
	for(var i in localStorage){
		if(isNumeric(i)){
			var content = localStorage.getItem(i);
			if(content != ''){
				var json_str = JSON.parse( content );

				var light = '';

				if(parseFloat(json_str.now) >= parseFloat(json_str.sell)){
					light = 'am-danger';
				}else if(parseFloat(json_str.adding) >= parseFloat(json_str.now)){
					light = 'am-success';
				}

				var append_str = '' +
					'<tr class="fund_list '+json_str.code+' '+light+' ">' +
						'<td class="am-text-middle" title="'+json_str.name+'">'+json_str.code+'</td>' +
						'<td class="am-text-middle"><input type="text" class="am-text-center" value="'+json_str.buy+'" size="5" placeholder-text="购入价格"  name="buy" /></td>' +
						'<td class="am-text-middle">' +
							'<input type="text" class="am-text-center" value="'+json_str.adding+'" size="5" placeholder-text="补仓价格提醒" name="adding" />' +
						'</td>' +
						'<td class="am-text-middle">' +
							'<input type="text" class="am-text-center" value="'+json_str.sell+'" size="5" placeholder-text="卖出价格提醒" name="sell" />' +
						'</td>' +
						'<td class="am-text-middle" title="最后更新时间: '+json_str.gztime+'">'+json_str.now+'</td>' +
						'<td class="am-text-middle">' +
							'<span class="am-btn am-btn-xs am-btn-primary" data="'+json_str.code+'">修改</span>' +
							'<span class="am-btn am-btn-xs am-btn-danger" data="'+json_str.code+'">删除</span>' +
						'</td>' +
                    '</tr>';
				$('#add').after(append_str);
			}
		}
	}
}

$(function() {

	// 加载设置
	var defaultConfig = {color: 'white'}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(items) {
		document.body.style.backgroundColor = items.color;
	});

	//新增基金
	$('#add .am-btn-success').on('click', function(){
		var input_content = $('#add input').serializeArray();
		var item = {
			now : '',
            gztime : '',
            name:''
		}
		for(var i in input_content){
			var value = input_content[i]['value'];

			var msg = $('input[name='+input_content[i]['name']+']').attr('placeholder-text');
			if(isBlank(value)){
				_alert('请输入'+msg);
				return false;
			}

			if(isNumeric(value) == false){
				_alert(msg+'仅限输入数字');
                return false;
			}
			item[input_content[i]['name']] = input_content[i]['value']
		}

        localStorage.setItem(input_content[0]['value'], JSON.stringify(item));
        $('#add input').val('');
        _alert('新增基金成功');
        _list();

	});

    /**
     * 修改基金信息
     */
    $('body').on('click', '.am-btn-primary', function(){
        var code = $(this).attr('data');
        var inputDom = $(this).parent().parent().find('input');
        var input_content = inputDom.serializeArray();

        var fund = JSON.parse(localStorage.getItem(code));

        for(var i in input_content){
            var value = input_content[i]['value'];
            var msg = $('input[name='+input_content[i]['name']+']').attr('placeholder-text');
            if(isBlank(value)){
            	_alert('请输入'+msg);
                return false;
            }

            if(isNumeric(value) == false){
                _alert(msg+'仅限输入数字');
                return false;
            }
            fund[input_content[i]['name']] = input_content[i]['value']
        }

        localStorage.setItem(code, JSON.stringify(fund));
        _alert('修改 '+code+' 基金成功');
        inputDom.addClass('am-text-primary')
    })

	//删除基金
	$('body').on('click', '.am-btn-danger', function(){
        var id = $(this).attr('data');
		if(confirm('您确定要删除 '+id+' 基金吗？')){
            localStorage.removeItem(id);
            _list();
		}

	})

    //帮助文档
    $('.document').on('click', function(){
        chrome.tabs.create({url: 'https://www.pescms.com/d/index/32.html'});
    })

    $('.zan').on('click', function(){
        var d = dialog({
            title: '打赏给本扩展',
            content: $('.zan-img')[0],
            padding: 0
        })
        d.showModal();
    })

	$('.refresh').on('click', function(){
		var d = dialog({
			title:'刷新中...',
			id: 'refresh_fund'
		}).showModal()
        refreshFund();
        setTimeout(function () {
            _list();
            d.close().remove();
        }, 2000)

	})

	_list();


});