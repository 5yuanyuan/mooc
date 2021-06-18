const app = getApp()
Page({
  data: {
    bannerImages:[],
    productionList:[],
    productionList1:[],
    productionList2:[]
  },
  onLoad(){
    // console.log(app.globalData.url)
    var that = this
    wx.request({
      url:app.globalData.url+'/products/?category=product',
      success:function(res){
        var productionList = res.data.products
          that.setData({
            bannerImages: productionList
          })
          // console.log(that.bannerImages)
      }
    })
    wx.request({
      url: app.globalData.url+ '/products/?category=product',
      success:function(res){
        console.log(res.data)
        that.setData({
          productionList:res.data
        })
        var i =0;
        for (i = 0; i < that.data.productionList.length; i++) { 
          if(i%2==0){
            that.setData({
              productionList1: that.data.productionList1.concat(that.data.productionList1[i])
           }) 
          }
          else{
            that.setData({
              productionList2: that.data.productionList2.concat(that.data.productionList2[i])
           }) 
          }
              
        }
      }
    })
  },
  clickProduct(event){
    wx.navigateTo({
      url: '../detail/detail'
      // ..代表父级目录
    })
  }
})