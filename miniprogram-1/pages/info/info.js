var util = require('../../utils/upload');
var app = getApp();
Page({

  data: {
    //获取用户信息
    userInfoUrl: `${app.globalData.baseurl}/api/member/auth/getMemberInfo`,
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
    ] // 底部可选菜单

  },

  onLoad: function (options) {
    this.getUserInfo()
  },
  
  //获取用户信息
  getUserInfo() {
    wx.request({
      url: this.data.userInfoUrl,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.data.data.item,
          userImg: res.data.data.item.avatar,
          userName: res.data.data.item.name,
          userId: res.data.data.item.id,
          userTel: res.data.data.item.tel
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
        wx.uploadFile({
          url: `${app.globalData.baseurl}/api/oss/uploadAvatar`,
          filePath: tempFilePaths[0],
          name: 'file',
          success: (res) => {
            this.setData({
              userImg: JSON.parse(res.data).data.url
            })

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
})