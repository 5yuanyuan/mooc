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
    this.getUserInfo()
    const tabs = [
      {
        title: '登录',
        title2: '小程序开发进阶',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_jpg/GEWVeJPFkSEV5QjxLDJaL6ibHLSZ02TIcve0ocPXrdTVqGGbqAmh5Mw9V7504dlEiatSvnyibibHCrVQO2GEYsJicPA/0?wx_fmt=jpeg',
        desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。',
      },
      {
        title: '注册',
        title2: '微信小程序直播',
        img: 'http://mmbiz.qpic.cn/sz_mmbiz_png/GEWVeJPFkSHALb0g5rCc4Jf5IqDfdwhWJ43I1IvriaV5uFr9fLAuv3uxHR7DQstbIxhNXFoQEcxGzWwzQUDBd6Q/0?wx_fmt=png',
        desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。',
      }
    ]
    this.setData({ tabs })
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
        console.log(res.data.data)
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

  // 点击其他区域 隐藏底部菜单
  actionSheetbindchange: function () {
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
    wx.switchTab({
      // url: '../mini-index/mini-index',
      url: '../usercenter/usercenter',
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

  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },

  handleClick(e) {
    wx.navigateTo({
      url: './webview',
    })
  }
})