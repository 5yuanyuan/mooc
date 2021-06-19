var util = require('../../utils/util')
var app = getApp();
Page({

  data: {
    url: app.globalData.baseurl,
    videoUrl: "",
    courseId: "",
    courseDetail: {},
    commentList: [],
    article: ""
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

  getComment() {
    wx.request({
      url: `${this.data.url}/api/eduComment/getCommentList/${this.data.courseId}`,
      success: res => {
        res.data.data.forEach(item => {
          var date = new Date(item.gmtCreate);
          item.gmtCreate = util.formatDate(date)
        });
        this.setData({
          commentList: res.data.data
        })
      },

    })
  },

  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this.getCourseInfo();
    this.getComment();

  },

  onShow: function () {
    setTimeout(() => {
      this.getMarkDown();
    }, 1000);

  },
})