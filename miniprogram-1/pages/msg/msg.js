var util = require('../../utils/util')
var app = getApp();
Page({

  data: {
    msgUrl: `${app.globalData.baseurl}/api/webMessage/getMessageList/1/8`,
    unmsgList: [],
    msgList: []
  },

  onLoad: function (options) {
    this.getMsgList()
  },
  getMsgList() {
    wx.request({
      url: this.data.msgUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res);
        res.data.data.readMap.items.forEach(item => {
          var time = new Date(item.gmtCreate);
          item.gmtCreate = util.formatTime(time)
        })
        res.data.data.unreadMap.items.forEach(item => {
          var time = new Date(item.gmtCreate);
          item.gmtCreate = util.formatTime(time)
        })
        this.setData({
          unmsgList: res.data.data.readMap.items,
          msgList: res.data.data.unreadMap.items
        })
        console.log(res);
      }
    })
  },
  check(id) {
    var vid = id.currentTarget.dataset.id;
    console.log(vid)
    if (vid) {
      wx.navigateTo({
        url: '../msgContext/msgContext?id=' + vid,
      })
    }
  },
})