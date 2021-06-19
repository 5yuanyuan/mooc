var app = getApp();
Page({

  data: {
    myCourseListUrl: `${app.globalData.baseurl}/api/member/myBuyCourse`,
    myCourseList: [],
  },

  onLoad: function (options) {
    this.getMyCourseList()
  },
  getMyCourseList() {
    wx.request({
      url: this.data.myCourseListUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        this.setData({
          myCourseList: res.data.data
        })
      }
    })
  },
})