const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canUseGetUserProfile:false,//能否调用微信getUserProfile方法，版本支持检测
    avatarUrl:'',//头像
    nickname:'',//昵称
    member_type:'',
    record_id:'',
    remain_total_money:0,
    dialogShow:true,
    // buttons: [{text: '取消'}, {text: '确定'}],
    buttons: [{text: '确定'}],
  },
  tapDialogButton(){
    this.setData({
      dialogShow:false
    })
    this.getUserProfile();
  },
  getRecordId(that,res){
    wx.request({
      url: app.globalData.url+'/getuserinfo',
      data:{
        code:res.code,
        app_id:'wx781c63fd3e588ad2',
        app_secret:'7ce9441a690ddaa535b1ffc5ae9a97ad'
      },
      success:function(res){
        console.log('调用成功')
        console.log(res.data)
        that.setData({
          member_type:res.data.member_type,
          remain_total_money:res.data.remain_total_money,
          record_id:res.data.record_id,
          seq_number:res.data.seq_number
        })
        wx.setStorageSync('record_id', res.data.record_id)
        wx.setStorageSync('seq_number', res.data.seq_number)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success(res){
        if(res.code){
          console.log('登录成功')
          console.log(res.code)
          that.getRecordId(that,res)
        }else{
          console.log('登录失败')
        }
      }
    })
    //判断wx.getUserProfile
    if(wx.getUserProfile){
      this.setData({
        canUseGetUserProfile:true
      })
    }
  },
  goto_friends(){
    wx.navigateTo({
      url: '../friends/friends',
    })
  },
  goto_income(){
    wx.navigateTo({
      url: '../income/income',
    })
  },
  goto_withdrew(){
    wx.navigateTo({
      url: '../withdrew/withdrew',
    })
  },
  goto_outcome(){
    wx.navigateTo({
      url: '../outcome/outcome',
    })
  },
  registerUser(){
    console.log('注册用户')
    wx.navigateTo({
      url: '../apply/apply',
    })
  },
  // 老版本调用用户信息
  // getUserInfo(e){
  //   console.log("老版本调用");
  //   this.setData({
  //     avatarUrl：e.detail.userInfo.avatarUrl
  //   })
  // },
  // 在取头像之前需要调用wx.login方法
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that =this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        that.setData({
          avatarUrl:res.userInfo.avatarUrl,
          nickname:res.userInfo.nickName,
          // userInfo: res.userInfo,
          // hasUserInfo: true
        })
        wx.request({
          url: app.globalData.url+'/update_wechat/',
          method:"POST",
          data:{
            avatarUrl:res.userInfo.avatarUrl,
            nickName:res.userInfo.nickName,
            record_id:wx.getStorageSync('record_id')
          },
          success(){
            console.log('getUserProfile success')
          }
        })

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