# Fund-tool  
![mahua](https://img.shields.io/github/tag/lazyphp/Fund-tool.svg) ![mahua](https://img.shields.io/github/license/lazyphp/Fund-tool.svg)

基金定投助手使用MIT开源协议发布，是一款基于Chrome开发的扩展程序。通过使用本扩展，可以帮助大家及时对持有的基金进行查询、补仓（定投）、卖出（盈利）。  

## 扩展下载与安装

谷歌网上应用店地址（推荐）：[通过官方渠道安装 ](https://chrome.google.com/webstore/detail/%E5%9F%BA%E9%87%91%E5%AE%9A%E6%8A%95%E5%8A%A9%E6%89%8B/bipnngiflpojfmfcpdngilmohjopbdhl?hl=zh-CN)

GITHUB源码：[https://github.com/lazyphp/Fund-tool](https://github.com/lazyphp/Fund-tool) 

网盘下载：[https://pan.baidu.com/s/1Z0zwbC4sdgm36KtFQQ31xg](https://pan.baidu.com/s/1Z0zwbC4sdgm36KtFQQ31xg) 

若您会科学的方式访问到谷歌网上应用店，那么我们强烈推荐您通过官方的渠道进行安装。若您无法通过官方渠道安装，那么烦请您将本源码下载，并解压至硬盘任意路径。具体流程如下：  
  
  
-   1.将下载到的源码解压至任何目录。  
![mahua](http://wx3.sinaimg.cn/mw690/d2d33fbfgy1fprf1j6k06j20r70gxjtd.jpg)    
-   2.打开Chrome浏览器（谷歌浏览器）。依次如下图方式，找到浏览器的扩展菜单。当前截图的浏览器版本为：版本 65.0.3325.181（正式版本） （64 位）  
![mahua](http://wx4.sinaimg.cn/mw690/d2d33fbfgy1fprf1jsxsoj20gd0e20uc.jpg)    
-   3.打开扩展程序 菜单页面后，在当前页面找到 开发者模式，并勾选。如下图：  
![mahua](http://wx4.sinaimg.cn/mw690/d2d33fbfgy1fprf1k9o86j20pl0a2tad.jpg)    
-   4.打开开发者模式后，选择 加载已解压的扩展程序 选项。并在弹窗窗口中，找到并选择 基金定投助手 所在的目录。如下图  
![mahua](http://wx3.sinaimg.cn/mw690/d2d33fbfgy1fprf1km9ybj20u60butbd.jpg)    
至此，我们已经成功安装了 基金定投助手 扩展，可以开始我们的理财之旅。最后，官方还是推荐大家通过 网上应用商店安装本扩展。通过开发者模式安装，可能会存在扩展突然无法使用的问题。  

## 使用扩展

扩展安装完毕后，在浏览器菜单栏找到本扩展的图表，点击之。在弹出的对话框中，按照对应列标题填写自己持有的基金信息就可以了。  
![mahua](http://wx1.sinaimg.cn/mw690/d2d33fbfgy1fprf1l53pmj20jq0c7my8.jpg)  

## 基金价格抓取与提醒

本扩展会在每天早上8点到下午17点之间，实时抓取您所填写的基金信息。鼠标移动至对应的基金代码和最新价格，会显示该基金的中文名称和最后一次获取实时数据的时间。若您在扩展非运行抓取时间内，需要获取最新的数据。可以点击 扩展顶部的 刷新按钮。  
 
提醒通知方面，本扩展目前设定为每天下午2点30分起，每隔10分钟提醒一次。主要提醒内容为：  

-   实时价格 大于等于 预设的卖出价格。  

-   实时价格 少于等于 预设的补仓价格。  

除了提醒方面，每次查看列表时，当实时价格符合 （大于等于）卖出价格 或者 （少于等于）补仓价格 。会依次对该行基金 标记为：红色 和 绿色。  