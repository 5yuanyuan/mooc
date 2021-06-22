var util = require('../../utils/util')
var app = getApp();
Page({

  data: {
    url: app.globalData.baseurl,
    videoUrl: "",
    courseId: "",
    courseDetail: {},
    commentList: [],
    article: "",
    chapterList: [],
    buyCourse: false,
    orderId: "",
    canNotBuy: 0,
    canBuy: 1,
    buttons: [{ text: '取消' }, { text: '确定' }],
    dialogShow: false
  },

  getCourseChapter() {
    wx.request({
      url: `${this.data.url}/api/eduChapter/getChapterVideo/${this.data.courseId}`,
      data: {},
      success: res => {
        // console.log(res.data.data.allVideos)
        this.setData({
          chapterList: res.data.data.allVideos
        })
      }
    })
  },

  openConfirm: function () {
    console.log(this.orderId)
    this.setData({
      dialogShow: true
    })
  },

  tapDialogButton(e) {
    console.log(e.detail.index)
    if (e.detail.index == 1) {
      wx.request({
        url: `${this.data.url}/api/tPayLog/queryPayStatus/${this.orderId}`,
        header: {
          'token': wx.getStorageSync('token')
        },
        success: res => {
          console.log(res.data)
          this.canNotBuy = true
        }
      })
    }
    this.setData({
      dialogShow: false,
    })
  },

  getCourseInfo() {
    wx.request({
      url: `${this.data.url}/api/course/getCourseInfo/${this.data.courseId}`,
      data: {},
      success: res => {
        this.setData({
          courseDetail: res.data.data
        })
      },
    })
  },

  getMarkDown() {
    const _ts = this
    let data = app.towxml.toJson(this.data.courseDetail.description, 'markdown')
    data.theme = 'dark'
    _ts.setData({
      article: data
    })
  },

  buy() {
    wx.request({
      url: `${this.data.url}/api/tOrder/createOrder/${this.data.courseId}`,
      header: {
        'token': wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
        this.orderId = res.data.data.orderId
        this.setData({
          orderId: res.data.data.orderId
        })
        this.openConfirm()
      }
    })
  },

  isBuy() {
    wx.request({
      url: `${this.data.url}/api/tOrder/isBuyCourse/${this.data.courseId}`,
      data: {},
      header: {
        'token': wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
        if (res.data == false) {
          this.setData({
            canBuy: 1,
            canNotBuy: 0
          })
        } else {
          this.setData({
            canBuy: 0,
            canNotBuy: 1
          })
        }
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this.getCourseInfo()
    this.getCourseChapter()
    this.isBuy()
  },

  onShow: function () {
    setTimeout(() => {
      this.getMarkDown()
    }, 1000)
  },
})