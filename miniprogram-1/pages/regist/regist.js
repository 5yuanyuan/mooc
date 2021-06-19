var app = getApp();
Page({

  data: {
    registBtnTxt: '',
    registDisabled: true,
    registBtnBgBgColor: '',
    btnLoading: true,
    phoneNum: '',
    code: '',
    password: '',
    getSmsCodeBtnTxt: '获取验证码',
    getSmsCodeBtnColor: '#008000',
    smsCodeDisabled: false,
    sendCodeUrl: `${app.globalData.baseurl}/api/msm/send/`,
    registUrl: `${app.globalData.baseurl}/api/member/register`
  },
  //注册中
  setregistData1: function () {
    this.setData({
      registBtnTxt: "注册中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  //未注册
  setregistData2: function () {
    this.setData({
      registBtnTxt: "注册",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#008000",
      btnLoading: !this.data.btnLoading
    });
  },
  //检查手机号
  checkUserName: function (param) {
    const regu = /^1(3|4|5|7|8)\d{9}$/;
    var inputUserName = param;
    if (regu.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  //检查密码
  checkPassword: function (param) {
    var password = param.password;
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    } else {
      return true;
    }
  },
  //获取验证码
  getSmsCode: function () {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {
      //发送验证码
      wx.request({
        url: that.data.sendCodeUrl + phoneNum,
        data: {},
        success: (res) => {
          console.log(res)
          var si = setInterval(function () {
            if (count > 0) {
              count--;
              that.setData({
                getSmsCodeBtnTxt: count + ' s',
                getSmsCodeBtnColor: "#999",
                smsCodeDisabled: true
              });
            } else {
              that.setData({
                getSmsCodeBtnTxt: "获取验证码",
                getSmsCodeBtnColor: "#ff9900",
                smsCodeDisabled: false
              });
              count = 60;
              clearInterval(si);
            }
          }, 1000);
        }
      })
    }
  },

  //获取输入的手机号
  getPhoneNum: function (e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });
  },
  //获取验证码
  getCode: function (e) {
    var value = e.detail.value;
    this.setData({
      code: value
    });
  },
  //获取密码
  getPassword: function (e) {
    var value = e.detail.value;
    this.setData({
      password: value
    });
  },
  //提交表单
  formSubmit: function (e) {
    console.log(e)
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = this.checkUserName(param.username) && this.checkPassword(param)
    var that = this;
    if (flag) {
      wx.request({
        url: that.data.registUrl,
        data: {
          tel: that.data.phoneNum,
          code: that.data.code,
          password: that.data.password
        },
        method: 'POST',
        success: (res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.setregistData1();
            setTimeout(function () {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1500
              });
              that.setregistData2();
            }, 2000);
            wx.navigateTo({
              url: '../login/login',
            })
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 1500
            });
          }
        }
      })

    }
  },
  onLoad: function (options) {
    this.setregistData2()
  },
})