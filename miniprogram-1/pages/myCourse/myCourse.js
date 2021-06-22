var app = getApp();
Page({

  data: {
    myCourseListUrl: `${app.globalData.baseurl}/api/member/myBuyCourse`,
    myCourseList: [],
    token: ''
  },

  onLoad: function (options) {
    this.token = wx.getStorageSync('token')
    console.log('myCourse : ' + this.token)
    this.getMyCourseList()
  },

  getMyCourseList() {
    if (this.token === '' || this.token === null) {
      console.log('myCourse : ' + this.token)
    } else {
      wx.request({
        url: this.data.myCourseListUrl,
        data: {},
        header: {
          'token': wx.getStorageSync('token')
        },
        success: (res) => {
          console.log(res.data)
          this.setData({
            myCourseList: res.data.data
          })
        }
      })
    }
  },
})