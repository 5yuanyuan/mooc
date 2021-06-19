var app = getApp();
Page({

  data: {
    myCollectUrl: `${app.globalData.baseurl}/api/member/myCollectCourse`,
    myCollectList: [],
  },

  onLoad: function (options) {
    this.getCollectCourse()
  },
  getCollectCourse() {
    wx.request({
      url: this.data.myCollectUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        this.setData({
          myCollectList: res.data.data
        })
      }
    })
  },
})