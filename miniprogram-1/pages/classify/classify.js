var app = getApp();
Page({

  data: {
    url: `${app.globalData.baseurl}/api/eduSubject/getSubject/list`,
    subjectList: [],
    searchText: ""
  },

  // 查询搜索的接口方法
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

  getSubjectList() {
    wx.request({
      url: this.data.url,
      data: {
      },
      success: res => {
        this.setData({
          subjectList: res.data.data
        })
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
    this.getSubjectList()
  },
})