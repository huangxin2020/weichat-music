// components/search/search.js
// 关键字
let keyword = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '大家都在搜'
    }
  },
  // 接收父组件传递过来的css样式
  externalClasses: [
    'iconfont',
    'icon-sousuo',
  ],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      keyword = event.detail.value
    },

    onSearch() {
      // console.log(keyword)
      // blog
      this.triggerEvent('search', {
        keyword
      })
    },
  }
})
