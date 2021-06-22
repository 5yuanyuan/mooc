// 先申明app变量 用于获取全局变量
var app = getApp();
Page({

  data: {
    url: app.globalData.baseurl,
    showKey: '',
    showNum: '',
    searchKey: '',
    findKey: "",
    findNum: 0,
    subjectId: "",
    subjectParentId: "",
    courseList: []
  },

  getCourseList() {
    wx.request({
      url: `${this.data.url}/api/course/getCourse/1/30`,
      data: {
        subjectId: this.data.subjectId,
        subjectParentId: this.data.subjectParentId
      },
      method: "POST",
      success: res => {
        this.setData({
          showKey: this.data.findKey,
          showNum: res.data.data.total,
          courseList: res.data.data.items
        })
      },
    })
  },
  getCourseByText() {
    wx.request({
      url: `${this.data.url}/api/course/getCourseByLike/${this.data.searchKey}/1/30`,
      success: res => {
        this.setData({
          showKey: this.data.searchKey,
          showNum: res.data.data.items.length,
          courseList: res.data.data.items
        })
        // console.log(res);
      },

    })
  },

  onLoad: function (options) {
    this.setData({
      findKey: options.searchName,
      searchId: options.searchId,
      subjectId: options.subjectId,
      subjectParentId: options.subjectParentId,
      searchKey: options.searchKey
    })
    // console.log(this.data.searchKey);

    if (this.data.searchKey == null) {
      this.getCourseList();
    } else {
      this.getCourseByText();
    }
  },
})