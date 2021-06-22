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
    canNotBuy: false,
    canBuy: true
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
    console.log('buy')
    wx.request({
      url: `${this.data.url}/api/tOrder/createOrder/${this.data.courseId}`,
      header: {
        'token': wx.getStorageSync('token')
      },
      success: res => {
        console.log(res.data)
        this.orderId = res.data.data.orderId
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
          this.canBuy = true
          this.canNotBuy = false
        } else {
          this.canBuy = false
          this.canNotBuy = true
        }
        console.log(this.canNotBuy)
        console.log(this.canBuy)
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