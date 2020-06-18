// pages/playlist/playlist.js
// 初始化云数据库
const db = wx.cloud.database()
// 每次从数据库中获取的限制总条数
const MAX_LIMIT = 15
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperImagUrls: [
      // {
      //   url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      // },
      // {
      //   url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      // },
      // {
      //   url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      // }
    ],
    playlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
    this._getSwiper()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 清空列表 在请求数据
    this.setData({
      playlist: []
    })
    this._getPlaylist()
    this._getSwiper()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取歌单列表的函数
  _getPlaylist() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      // console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data) // 拼接操作
      })
      wx.stopPullDownRefresh() //停止下拉刷新的方法
      wx.hideLoading()
    })
  },
  // 动态获取轮播图数据 因为一般录播图的数据不会太多 所以可以直接从小程序端获取
  _getSwiper() {
    db.collection('swiper').get().then((res) => {
      this.setData({
        swiperImagUrls: res.data
      })
    })
  }
})