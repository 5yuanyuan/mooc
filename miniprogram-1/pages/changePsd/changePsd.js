const app = getApp();
Page({

  data: {

  },
  formSubmit: function (e) {
    // console.log(e);
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
    var no = wx.getStorageSync('info').id;
    var name = wx.getStorageSync('info').name;
    var tel = wx.getStorageSync('info').tel;
    var avatar = wx.getStorageSync('info').avatar;
    // console.log(no);
    if (newpwd == '' || newpwd2 == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (newpwd != newpwd2) {
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
      var url = `${app.globalData.baseurl}/api/member/changePassword`;
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          id: no,
          password: newpwd,
          avatar: avatar,
          name: name,
          tel: tel
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.error) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '../info/info',
            })
          }
        }
      })
    }

  },
})