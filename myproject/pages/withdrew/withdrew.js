const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remain_total_money:0,
    commission_total: 0,
    income_total_money: 0,
    outcome_total_money:0,
    outcome_list:[],
    show:true,
    formData:{
      'num':0,
    },
  },
  updateData(){
    var that =this
    wx.request({
      url: app.globalData.url +'/get_total_remain/'+'?recordId=60bf34bf4ceb0b441685fc66',
      success:function(res){
        // console.log(res)
        that.setData({
          remain_total_money:res.data.remain_total_money,
          commission_total: res.data.commission_total,
          income_total_money: res.data.income_total_money,
          outcome_total_money: res.data.outcome_total_money,
          show:false
        })
      }
    })
    wx.request({
      url: 'http://10.7.189.69:8000/api/get_outcomes/?recordId=60bf34bf4ceb0b441685fc66',
      success:function(res){
        console.log('outcomes=',res)
        that.setData({
          outcome_list:res.data.outcome_list
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateData();
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    console.log('发生改变，携带值为', e.detail.value);
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  isInteger(obj){
    return obj%1 === 0    //是整数，则返回true，否则返回false
  },
  submitForm() {
    var that = this
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
        console.log(this.data)
        console.log(this.data.formData.num)
        if(this.data.formData.num%100==0){
          var num = parseInt(this.data.formData.num)
          console.log(num)
          console.log(this.data.formData.num)
          var that =this
          wx.request({
            url: app.globalData.url + '/send_withdraw/',
            method: 'POST',
            data: {
                money: that.data.formData.num,
                recordId: '60bf34bf4ceb0b441685fc66'
            },
            success: function (res) {
              console.log(res)
              that.updateData()
              wx.showToast({
                title: '已成功提现',
              })
            }
          })
        }
        // if(this.isInteger(this.data.formDate.num)){
        else{
          wx.showToast({
            title: '请输入数字\n且应该是100的整数倍',
            icon: 'none',
          })
        }
      }
  })
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