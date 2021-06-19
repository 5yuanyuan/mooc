var app = getApp();
Page({


  data: {
    url: `${app.globalData.baseUrl}/api/eduSubject/getSubject/list`,
    subjectList: [],
    searchText: ""
  },

  // 查询搜索的接口方法
  handleSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search?searchKey=' + this.data.searchText,
    })

  },
  getSubjectList() {
    wx.request({
      url: this.data.url,
      data: {},
      success: res => {
        console.log(res)
        this.setData({
          subjectList: res.data.data
        })
      }
    })
  },

  onLoad: function (options) {
    this.getSubjectList()
  },
})