var app = getApp();
Page({

  data: {
    code: ''
  },

  onLoad: function (options) {
    // 刚进入页面随机先获取一个
    this.createCode()
  },
  huanyizhang() {
    this.createCode()
  },
  createCode() {
    var code;
    // 首先默认code为空字符串
    code = '';
    // 设置长度
    var codeLength = 4;
    //设置随机字符
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    // 循环codeLength
    for (var i = 0; i < codeLength; i++) {
      // 设置随机数范围,这设置为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      // 字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    // 将拼接好的字符串赋值给展示的code
    this.setData({
      code: code
    })
  },
  submitForm: function (e) {
    console.log(e)
    var tel = e.detail.value.mobile;
    var password = e.detail.value.password;
    var code = e.detail.value.vcode;
    const regu = /^1(3|4|5|7|8|9)\d{9}$/
    if (tel == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (!regu.test(tel)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 1000
      })
    } else {
      if (password == "") {
        wx.showToast({
          title: '密码不能为空',
          icon: 'none',
          duration: 1000
        })
      } else {
        if (code == "") {
          wx.showToast({
            title: '验证码不能为空',
            icon: 'none',
            duration: 1000
          })
        } else if (code != this.data.code) {
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 1000
          })
        } else {
          var url = `${app.globalData.baseurl}/api/member/login`;
          wx.request({
            url: url,
            method: 'POST',
            data: {
              tel: tel,
              password: password
            },
            success: (res) => {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.setStorageSync('token', res.data.data.token)
                wx.switchTab({
                  // url: '../mini-index/mini-index',
                  url: '../../pages/usercenter/usercenter',
                })
              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    }
  },
})