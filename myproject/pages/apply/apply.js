// pages/apply/apply.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      'mobile':'',
      'fullname':''
    },
    rules: [
      {
        name: 'mobile',
        rules: [{required: true, message: '手机号必填'}, {mobile: true, message: '手机格式不对'}],
      },
      {
        name: 'fullname',
        rules: {required: true, message: '姓名必填'},
      } 
    ]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    console.log('发生改变，携带值为', e.detail.value);
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors)
        if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
                this.setData({
                    error: errors[firstError[0]].message
                })

            }
        } else {
            wx.showToast({
                title: '校验通过'
            })
            console.log('提交用户信息到服务器')
            var that = this
            console.log(that.data.formData.mobile)
            console.log(that.data.formData.fullname)
            console.log('record_id=',wx.getStorageSync('record_id'))
            console.log('seq_number=',wx.getStorageSync('seq_number'))
            wx.request({
              url: app.globalData.url + '/update_customer/',
              method: 'POST',
              data: {
                  mobile: that.data.formData.mobile,
                  fullname: that.data.formData.fullname,
                  recordId:wx.getStorageSync('record_id')
                  // recordId: that.data.recordId
              },
              success: function (res) {
                console.log(res.statusCode)
              }
            })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})