const app = getApp()
Page({

  data: {
    first_list:[],
    second_list:[],
    show:true,
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      // wx.getStorageSync('record_id')
      url:app.globalData.url + '/get_friends/?recordId='+'60bf34bf4ceb0b441685fc66',
      success: function (res) {
        console.log(res)
        that.setData({
          first_list:res.data.first_list,
          second_list:res.data.second_list,
          show:false
        })
      },
      fail: function (res) {
        wx.showToast({  
        'title': 'request fail'
        })
      }
     })
  },

  onReady: function () {

  },

  onShow: function () {

  },
})