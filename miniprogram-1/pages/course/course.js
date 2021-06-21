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
    chapterList: []
  },

  getCourseChapter() {
    wx.request({
      url: `${this.data.url}/api/eduChapter/getChapterVideo/${this.data.courseId}`,
      data: {},
      success: res => {
        console.log(res.data.data.allVideos)
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
    const _ts = this;
    let data = app.towxml.toJson(this.data.courseDetail.description, 'markdown')
    data.theme = 'dark';
    _ts.setData({
      article: data
    });
  },

  buy() {
    console.log('buy')
  },

  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this.getCourseInfo()
    this.getCourseChapter()
  },

  onShow: function () {
    setTimeout(() => {
      this.getMarkDown()
    }, 1000)
  },
})