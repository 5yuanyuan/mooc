var app = getApp();
Page({

  data: {
    bannerUrl: `${app.globalData.baseurl}/api/eduBanner`,
    CourseUrl: `${app.globalData.baseurl}/api/index`,
    bannerList: [],
    payCourseList: [],
    freeCourseList: [],
    searchText: ""
  },
  //获取轮播图
  getbannerList() {
    wx.request({
      url: this.data.bannerUrl,
      data: {},
      success: (res) => {
        this.setData({
          bannerList: res.data.data
        })
        //console.log(res)
      }
    })
  },
  //获取付费课程
  getCourse() {
    wx.request({
      url: this.data.CourseUrl,
      data: {},
      success: (res) => {
        this.setData({
          //获取付费课程
          payCourseList: res.data.data.vipCourseList,
          //获取免费课程
          freeCourseList: res.data.data.freeCourseList
        })
      }
    })
  },
  check(id) {
    wx.navigateTo({
      url: '/pages/course/course?courseId=' + id.target.dataset.id,
    })
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      this.setData({
        searchText: value
      })
      setTimeout(() => {
        resolve([{ text: '搜索', value: 1 }])
      }, 200)
    })

  },
  selectResult: function (e) {
    console.log('select result', e)
    console.log(this.data.searchText);
    wx.navigateTo({
      url: '/pages/search/search?searchKey=' + this.data.searchText,
    })
  },
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
    this.getbannerList()
    this.getCourse()
  },
})