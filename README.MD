## 微信云音乐小程序

### 模块设计 

-  微信端的一个云音乐分享小程序，页面设计上分为**首页歌单列表**、**分享blog展示**、**我的信息**三个主要页面。

### 实现功能 

- **首页歌单列表**: 实现了点击歌单列表歌曲进行播放、展现歌词、拖拽播放进度条实现音乐跳转、上/下一曲播放；

- **分享Blog页面**：(需授权登录微信账号)实现了查看Blog、分享Blog、点赞评论Blog、上传Blog(文字加图片)、搜索框搜索关键字查看Blog

- **我的信息页面**：实现了展示历史播放记录、查看上传的blog、生产小程序二维码

### 使用技术

- **微信云开发** - 云函数、云数据库、云存储、HttpApi

- **前后端交互** - 数据获取使用云函数通过Api获取数据，使用了Promise与async await管理数据的异步请求

### 项目优化处理

- **数据懒加载**：首页歌单信息不会一次性请求展示大量信息(减少加载时间)，首先展示50条歌单列表信息，等用户下滑触底时再去请求数据展示。

- **首页数据更新** - 下拉列表实现数据更新展示

- **图标优化** - 项目中图标都是使用base64或者字体图标，减少网络请求的次数

- **完全的组件化开发** - 对项目中的每一个独立的功能都进行了抽离封装实现了组件化开发，提高代码的复用性与后期的可维护性，体现了高内聚低耦合。

- **项目中的数据隔离、处理** - 项目中通过云函数从后端Api接口获取后，存储到云数据库中，微信小程序端从云数据库中获取数据，这个过程中数据都是会经过处理，防止重复数据或者空白数据的。
### 页面实际展示

#### 首页展示效果

![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130009_com.tencent.mm.md.jpg)

#### 歌单列表展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130028_com.tencent.mm.md.jpg)

#### 播放歌曲页面展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130038_com.tencent.mm.md.jpg)

#### 歌词页面展示
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130051_com.tencent.mm.md.jpg)


### Blog分享展示效果

#### blog展示页面效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130118_com.tencent.mm.md.jpg)

#### 点击查看Blog详情页面效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130214_com.tencent.mm.md.jpg)

#### 获取授权展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130150_com.tencent.mm.md.jpg)

### 我的信息页面展示效果
#### 我的页面展示
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130234_com.tencent.mm.md.jpg)

#### 历史播放展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130241_com.tencent.mm.md.jpg)

#### 我的分享展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130250_com.tencent.mm.md.jpg)

#### 生产小程序二维码展示效果
![WeiChat-CloudMusic](http://imgsever.hxin2020.top/images/2020/06/17/Screenshot_20200617_130303_com.tencent.mm.md.jpg)
