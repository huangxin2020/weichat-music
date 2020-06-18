// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 初始化云数据库
const db = cloud.database()

// 导入request-promise依赖
const rp = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

// 单次获取的最大数据数
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取云数据库中的所有以后数据 云函数获取数据一般情况下每次最多获取100条 小程序端最多20条
  // const list = await playlistCollection.get()
  // 突破获取限制的方法 每次最多100条 获取多次 把多次的返回结果进行拼接形成一个超过限制的数组
  // 返回的是一个对象
  const countResult = await playlistCollection.count()
  // 从对象中取出我们需要的总的数据的条数 - 数字；类型
  const total = countResult.total
  // 需要获取的次数
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    // 利用promise.all 需要当所有需要的数据都获取成功后才能进行下一步操作
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // 客户端获取的数据
  const playlist = await rp(URL).then((res) => {
    return JSON.parse(res).result
  })

  // 防止从服务端获取到的数据发生重复 进行重复判断
  const newData = []
  for (let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      // 通过比较两者之间的id进行判断是发生重复的现象
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      // 把不重复的数据加入数据库中
      newData.push(playlist[i])
    }
  }

  // 云数据库中只能一条一条的插入数据 通过循环来插入
  for (let i = 0, len = newData.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newData[i],
        // 生成一个创建歌单时间 方便获取的歌单都是最新的
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }
  return newData.length
}