// components/musiclist/musiclist.js
// 自带的函数 - 获取全局属性
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1
  },
  // 组件所在页面的生命周期
  pageLifetimes: {
    // 页面展示后执行
    show() {
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击选中效果
    onSelect(event) {
      // 事件源 - 事件处理函数 事件对象 事件类型
      // console.log('被选中')
      const ds = event.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`,
      })
    }
  }
})
