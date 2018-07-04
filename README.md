# Fund-tool  
![mahua](https://img.shields.io/github/tag/lazyphp/Fund-tool.svg) ![mahua](https://img.shields.io/github/license/lazyphp/Fund-tool.svg)

基金定投助手使用MIT开源协议发布，是一款基于Chrome开发的扩展程序。通过使用本扩展，可以帮助大家及时对持有的基金进行查询、补仓（定投）、卖出（盈利）。  

## 扩展下载与安装

谷歌网上应用店地址（推荐）：[通过官方渠道安装 ](https://chrome.google.com/webstore/detail/%E5%9F%BA%E9%87%91%E5%AE%9A%E6%8A%95%E5%8A%A9%E6%89%8B/bipnngiflpojfmfcpdngilmohjopbdhl?hl=zh-CN)

GITHUB源码：[https://github.com/lazyphp/Fund-tool](https://github.com/lazyphp/Fund-tool) 

网盘下载：[https://pan.baidu.com/s/1Z0zwbC4sdgm36KtFQQ31xg](https://pan.baidu.com/s/1Z0zwbC4sdgm36KtFQQ31xg) 

若您会科学的方式访问到谷歌网上应用店，那么我们强烈推荐您通过官方的渠道进行安装。若您无法通过官方渠道安装，在本源码根目录下，将Fund-tool.crx拖动至浏览器扩展页即可安装，并存放至硬盘任意路径。具体流程如下：  
  
  
-   1.打开下载Fund-tool.crx所在的目录。  
![mahua](http://wx2.sinaimg.cn/large/d2d33fbfgy1fpyd3vt12yj20b20733yo.jpg)    
-   2.依次如下图方式，找到浏览器的扩展菜单。当前截图的浏览器版本为：版本 65.0.3325.181（正式版本） （64 位）  
![mahua](http://wx4.sinaimg.cn/mw690/d2d33fbfgy1fprf1jsxsoj20gd0e20uc.jpg)    
-   3.将扩展Fund-tool.crx文件拖动到浏览器。如下图：  
![mahua](http://wx2.sinaimg.cn/large/d2d33fbfgy1fpyd3w7dx8j21400lt0uq.jpg)    
-   4.在弹出的对话框中，选择 添加扩展程序。如下图  
![mahua](http://wx2.sinaimg.cn/mw690/d2d33fbfgy1fpyd3wli4nj20bc05tjrh.jpg)    
至此，我们已经成功安装了 基金定投助手 扩展，可以开始我们的理财之旅。 

## 使用扩展

扩展安装完毕后，在浏览器菜单栏找到本扩展的图表，点击之。在弹出的对话框中，按照对应列标题填写自己持有的基金信息就可以了。  
![mahua](http://wx1.sinaimg.cn/large/d2d33fbfgy1fpuy8j7655j20zk0m8wfs.jpg)  
![mahua](http://wx2.sinaimg.cn/large/d2d33fbfgy1fpuy8jmex9j20xc0m80ub.jpg)  

## 基金价格抓取与提醒

本扩展会在每天早上8点到下午17点之间，实时抓取您所填写的基金信息。鼠标移动至对应的基金代码和最新价格，会显示该基金的中文名称和最后一次获取实时数据的时间。若您在扩展非运行抓取时间内，需要获取最新的数据。可以点击 扩展顶部的 刷新按钮。  
 
提醒通知方面，本扩展目前设定为每天下午2点30分起，每隔10分钟提醒一次。主要提醒内容为：  

-   实时价格 大于等于 预设的卖出价格。  

-   实时价格 少于等于 预设的补仓价格。  

除了提醒方面，每次查看列表时，当实时价格符合 （大于等于）卖出价格 或者 （少于等于）补仓价格 。会依次对该行基金 标记为：红色 和 绿色。  

## TODO

- [ ] 自定义设置通知时间。目前为2点30分起，每隔10分钟提醒一次。  