var app = getApp();
Page({

  data: {
    loginUrl: `${app.globalData.baseurl}/api/member/login`,
    userInfoUrl: `${app.globalData.baseurl}/api/member/auth/getMemberInfo`,
    user: {},
    token: ''
  },

  test() {
    console.log(wx.getStorageSync('token'))
  },

  onLoad: function (options) {
    this.showUser()
  },

  //显示用户信息和头像
  showUser() {
    wx.request({
      url: this.data.userInfoUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        wx.setStorageSync('info', res.data.data.item)
        this.setData({
          user: res.data.data.item,
          token: wx.getStorageSync('token')
        })
      }
    })
  },
  exit() {
    wx.setStorageSync('token', null)
    wx.switchTab({
      url: '../mini-index/mini-index',
    })
  },
  login() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  regist() {
    wx.navigateTo({
      url: '../regist/regist',
    })
  },
})