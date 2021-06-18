const app = getApp()
Page({

  data: {
    income_total_money:0,
    month_list:[],
    income_dict:{}
  },

  onLoad: function (options) {
    var that =this
    wx.request({
      // url:app.globalData.url +'/get_incomes/?recordId='+wx.getStorageSync('record_id'),
      url:app.globalData.url +'/get_incomes/?recordId='+'60bf34bf4ceb0b441685fc66',
      success: function (res) {
        console.log(res)
        that.setData({
          income_total_money:res.data.income_total_money,
          month_list:res.data.month_list,
          income_dict:res.data.income_dict
        })
        // that.setData({
        //   first_list:res.data.first_list,
        //   second_list:res.data.second_list
        // })
      },
      fail: function (res) {
        wx.showToast({  
        'title': 'request fail'
        })
      }
    })
  },
})