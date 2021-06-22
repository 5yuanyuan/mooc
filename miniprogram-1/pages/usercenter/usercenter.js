var app = getApp();
Page({

  onShareAppMessage() {
    return {
      title: 'tabs'
    }
  },

  data: {
    loginUrl: `${app.globalData.baseurl}/api/member/login`,
    userInfoUrl: `${app.globalData.baseurl}/api/member/auth/getMemberInfo`,
    token: '',
    // 获取用户信息
    userInfo: {},
    userImg: '',
    userName: '',
    userTel: '',
    actionSheetHidden: true, // 是否显示底部可选菜单
    actionSheetItems: [{
      bindtap: 'changeImage',
      txt: '修改头像'
    },
    {
      bindtap: 'viewImage',
      txt: '查看头像'
    }
    ], // 底部可选菜单
    tabs: [],
    activeTab: 0,
  },

  onLoad: function (options) {
    console.log('usercenter : ' + wx.getStorageSync('token'))
    this.getUserInfo()
  },

  // 获取用户信息
  getUserInfo() {
    wx.request({
      url: this.data.userInfoUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          token: wx.getStorageSync('token'),
          userInfo: res.data.data.item
        })
      }
    })
  },

  // 点击头像 显示底部菜单
  clickImage: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },

  hide: function () {
    var that = this;
    that.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
  },

  // 上传头像
  changeImage() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          actionSheetHidden: !this.data.actionSheetHidden
        })

        // 上传
        wx.uploadFile({
          url: `${app.globalData.baseurl}/api/oss/uploadAvatar`,
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            this.setData({
              userImg: JSON.parse(res.data).data.url
            })
            this.getUserInfo()
            // 修改用户信息
            wx.request({
              url: `${app.globalData.baseurl}/api/member/update`,
              data: {
                'id': this.data.userId,
                'avatar': this.data.userImg,
                'name': this.data.userName,
                'tel': this.data.userTel
              },
              header: {
                'token': wx.getStorageSync('token')
              },
              method: 'POST',
              success: (res) => {
                console.log(res)
              }
            })
          }
        })
      }
    })
  },
  // 查看原图
  viewImage: function () {
    var that = this;
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [that.data.userImg] // 需要预览的图片http链接列表
    })
  },

  exit() {
    console.log('exit')
    wx.setStorageSync('token', null)
    this.onLoad()
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