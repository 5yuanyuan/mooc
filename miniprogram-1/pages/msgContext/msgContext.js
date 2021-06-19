var app = getApp();
Page({

  data: {
    id: '',
    form: {}
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.showMsg()
  },
  showMsg() {
    wx.request({
      url: `${app.globalData.baseurl}/api/webMessage/getMessage/` + this.data.id,
      success: (res) => {
        console.log(res)
        this.setData({
          form: res.data.data
        })
      }
    })
  },
})