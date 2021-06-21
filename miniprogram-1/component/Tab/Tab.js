var app = getApp();

Page({
  data: {
    registBtnTxt: '注册',
    registDisabled: true,
    registBtnBgBgColor: '',
    btnLoading: true,
    phoneNum: '',
    password: '',
    getSmsCodeBtnTxt: '获取验证码',
    getSmsCodeBtnColor: '#008000',
    smsCodeDisabled: false,
    sendCodeUrl: `${app.globalData.baseurl}/api/msm/send/`,
    registUrl: `${app.globalData.baseurl}/api/member/register`,
    code: '',
    window_width: 375,// 单位是px
    tab_config: {
      tabs: ['登录', '注册'],// tabs
      fixed: false, // tabbar是否固定宽度
      active_tab: 0, //当前激活的tab
      item_width: 100,// 单位是px
      tab_left: 0, // 如果tabbar不是固定宽度，则目前左移的位置
      underline: {
        offset: 0 //下划线的位移
      }
    },

    swipe_config: {
      swipes: ['demo-text-1', 'demo-text-2'],// 不同面板的内容
      indicator_dots: false, // 不显示小圆点
      autoplay: false,// 自动切换
      interval: 2000,// 自动切换频率
      duration: 500, // 切换时间
      current: 0 // 当前激活的panel
    }
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    // 刚进入页面随机先获取一个
    this.createCode()
    this.setregistData2()
    try {
      let { window_width, tab_config } = that.data
      var res = wx.getSystemInfoSync()
      window_width = res.windowWidth
      if (tab_config.fixed) {
        tab_config.item_width = window_width / tab_config.tabs.length
      }
      that.setData({ "window_width": window_width, "tab_config": tab_config })
    } catch (e) {

    }
  },

  // 更换页面到指定page ，从0开始
  updateSelectedPage(page) {
    let that = this
    let { window_width, tab_config, swipe_config } = this.data
    let underline_offset = tab_config.item_width * page
    tab_config.active_tab = page
    swipe_config.current = page
    tab_config.underline.offset = underline_offset
    if (!tab_config.fixed) {
      // 如果tab不是固定的 就要 检测tab是否被遮挡
      let show_item_num = Math.floor(window_width / tab_config.item_width) // 一个界面完整显示的tab item个数
      let min_left_item = tab_config.item_width * (page - show_item_num + 1) // 最小scroll-left 
      let max_left_item = tab_config.item_width * page; //  最大scroll-left
      if (tab_config.tab_left < min_left_item || tab_config.tab_left > max_left_item) {
        // 如果被遮挡，则要移到当前元素居中位置
        tab_config.tab_left = max_left_item - (window_width - tab_config.item_width) / 2
      }
    }
    that.setData({
      "tab_config": tab_config,
      "swipe_config": swipe_config
    })
  },

  handlerTabTap(e) {
    let that = this
    that.updateSelectedPage(e.currentTarget.dataset.index)
  },

  swiperChange(e) {
    let that = this
    that.updateSelectedPage(e.detail.current)
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

  // 注册中
  setregistData1: function () {
    this.setData({
      registBtnTxt: "注册中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },

  // 未注册
  setregistData2: function () {
    this.setData({
      registBtnTxt: "注册",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#008000",
      btnLoading: !this.data.btnLoading
    })
  },

  // 检查手机号
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

  // 检查密码
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

  // 获取验证码
  getSmsCode: function () {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {
      // 发送验证码
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

  mysubmit: function (param) {
    var that = this
    var flag = that.checkUserName(param.username) && this.checkPassword(param)
    var that = that
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
              url: '../../pages/usercenter/usercenter',
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

  // 获取输入的手机号
  getPhoneNum: function (e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    })
  },

  // 获取验证码
  getCode: function (e) {
    var value = e.detail.value;
    this.setData({
      code: value
    })
  },

  // 获取密码
  getPassword: function (e) {
    var value = e.detail.value;
    this.setData({
      password: value
    })
  },

  // 提交表单
  formSubmit: function (e) {
    var that = this
    console.log(e)
    var param = e.detail.value
    that.mysubmit(param)
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
              console.log(res.data)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.setStorageSync('token', res.data.data.token)
                wx.switchTab({
                  url: '../../pages/usercenter/usercenter',
                  success: function () {
                    var page = getCurrentPages().pop()
                    if (page == undefined || page == null) return
                    page.onLoad()
                  }
                })
              }
            },
            error: (res) => {
              wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 2000
              })
              console.log(res)
            }
          })
        }
      }
    }
  }
})