// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [],
    listInfo: {},
  },
  pageLifetimes: {
    show() {
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      // console.log(res)
      const pr = res.result.playlist
      this.setData({
        musiclist: pr.tracks,
        listInfo: {
          coverImgUrl: pr.coverImgUrl,
          name: pr.name,
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },
  // 缓存在本地的方法
  _setMusiclist() {
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
})