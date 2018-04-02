

var _list = function(){
	$('.fund_list').remove();
    var total = 0;
    var total_jingzhi = 0;
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

				//由于新版没有这个变量，需要手动判断是否为空
				var fene = isBlank(json_str.fene) ? '' : parseFloat(json_str.fene);
				var jingzhi = isBlank(json_str.jingzhi) ? '' : parseFloat(json_str.jingzhi);
				var jingzhi_time = isBlank(json_str.jingzhi_time) ? '' : '( '+json_str.jingzhi_time+' )';
				//盈亏估算 = 持有份额 * 最新价格 - 成本价 * 持有份额
				var yingkui = fene == '' || isBlank(json_str.now) ? '-' : (fene * parseFloat(json_str.now) - json_str.buy * fene).toFixed(2) ;
                if(isNumeric(yingkui)){
                    total += parseFloat(yingkui);
                }

                //持有收益 = 持有份额 * 单位净值 - 成本价 * 持有份额
				var yingkui_jingzhi = fene == '' || jingzhi == '' ? '-' : (fene * parseFloat(jingzhi) - json_str.buy * fene).toFixed(2) ;
                if(isNumeric(yingkui_jingzhi)){
                    total_jingzhi += parseFloat(yingkui_jingzhi);
                }


				var append_str = '' +
					'<tr class="fund_list '+json_str.code+' '+light+' ">' +
						'<td class="am-text-middle am-show-lg-only">'+json_str.name+'</td>' +
						'<td class="am-text-middle" title="'+json_str.name+'">'+json_str.code+'</td>' +
						'<td class="am-text-middle"><input type="text" class="am-text-center input-size" value="'+json_str.buy+'"  placeholder-text="购入价格"  name="buy" /></td>' +
						'<td class="am-text-middle">' +
							'<input type="text" class="am-text-center input-size" value="'+json_str.adding+'"  placeholder-text="补仓价格提醒" name="adding" />' +
						'</td>' +
						'<td class="am-text-middle">' +
							'<input type="text" class="am-text-center input-size" value="'+json_str.sell+'"  placeholder-text="卖出价格提醒" name="sell" />' +
						'</td>' +
                    '<td class="am-text-middle">' +
                    '<input type="text" class="am-text-center input-size" value="'+fene+'" placeholder-text="持有份额" name="fene" />' +
                    '</td>' +
						'<td class="am-text-middle" title="最后更新时间: '+json_str.gztime+'">'+json_str.now+'</td>' +
						'<td class="am-text-middle">'+yingkui+'</td>' +
						'<td class="am-text-middle am-show-lg-only">'+jingzhi+'<span class="am-text-xs am-block">'+jingzhi_time+'</span></td>' +
						'<td class="am-text-middle am-show-lg-only">'+yingkui_jingzhi+'</td>' +
						'<td class="am-text-middle">' +
							'<span class="am-btn am-btn-xs am-btn-primary" data="'+json_str.code+'">修改</span>' +
							'<span class="am-btn am-btn-xs am-btn-danger" data="'+json_str.code+'">删除</span>' +
						'</td>' +
                    '</tr>';
				$('#add').after(append_str);
			}
		}
	}

	$('.total').html(total.toFixed(2))
	$('.total_jingzhi').html(total_jingzhi.toFixed(2))

}

$(function() {
	//清空图表下方的数字提醒
    chrome.browserAction.setBadgeText({text: ""});

	//新增基金
	$('#add .am-btn-success').on('click', function(){
		var input_content = $('#add input').serializeArray();
		var item = {
			now : '',
            gztime : '',
            fene : '',
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
		setTimeout(function () {
			_list();
        }, 2500)
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
        chrome.tabs.create({url: 'https://www.pescms.com/d/v/32/84.html'});
    })

    /**
	 * 赞赏弹窗
     */
    $('.zan').on('click', function(){
        var d = dialog({
            title: '打赏给本扩展',
            content: $('.zan-img')[0],
            padding: 0
        })
        d.showModal();
    })

    /**
	 * 刷新列表和获取最新价格
     */
	$('.refresh').on('click', function(){
		var d = dialog({
			title:'刷新中...',
			id: 'refresh_fund'
		}).showModal()

        refreshFund(true);
        refreshJingzhi(true)
        setTimeout(function () {
            _list();
            d.close().remove();
        }, 2000)

	})

    /**
	 * 全屏按钮
     */
    $('.popup').on('click', function(){
        chrome.tabs.create({url: 'popup.html'});
	})

    /**
	 * 数据来源
     */
    $('.fund-source').on('click', function(){
        chrome.tabs.create({url: 'http://fund.eastmoney.com/'});
	})
    /**
	 * 备份
     */
    $('.bak').on('click', function(){
        chrome.tabs.create({url: 'bak.html'});
	})

	_list();

    //引导页
    if(!localStorage.getItem('help_dialog')){

        var help_dialog_2 = dialog({
            align: 'right',
            content: '列表可以看到详尽的内容',
            zIndex : 1
        })
        help_dialog_2.show($('.popup')[0])

        var help_dialog_zan = dialog({
            align: 'bottom',
            content: '若觉得本扩展有用，捐赠可以使它持续更新',
            zIndex : 1
        })

        setTimeout(function () {
            help_dialog_2.close().remove();
            help_dialog_zan.show($('.zan ')[0])
        }, 5010)

        var help_dialog = dialog({
            title: '欢迎使用基金定投助手',
            align: 'bottom left',
            width : '350px',
            content: $('.help_content'),
            padding:0,
            cancelDisplay: false,
            cancel: function () {
                localStorage.setItem('help_dialog', 1)
            }
        })
        setTimeout(function () {
            help_dialog_zan.close().remove();
            help_dialog.show($('.document')[0])
        }, 10010)


    }



});