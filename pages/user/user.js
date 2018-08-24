//index.js
var conf = require('../../config.js')
import getData from '../../utils/DataURL.js'
Page({
  data: {
    userInfo: {},
  },
  onLoad: function () {
    this.getConfig()
  },
  getConfig: function () {
    let that = this;
    let param = {
      API_URL: conf.bigCode,
    };

    getData.result(param).then(res => {
      if (res.statusCode == 200) {
        that.setData({
          userInfo: res.data.data,
        });
        console.log(res.data)
      }
    })
  },
  makePhoneCall: function () {
    let self = this;
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.newsTitle
    })
  },
  openAddress: function () {
    console.log(111)
    let self = this;
    let lat = this.data.userInfo.header_circular
    let log = this.data.userInfo.shop_indicator_dots
    wx.openLocation({
      latitude: Number(lat),
      longitude: Number(log),
      scale: 17,
      name: this.data.userInfo.notice,
      address: this.data.userInfo.admission
    })
  },
  saveImgToPhotosAlbumTap: function (e) {
    console.log(e)
    wx.downloadFile({
      url: 'https://images.veg.kim/pc/home-code.png',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '请授权保存到相册',
              content: this.data.userInfo.header_indicator_dots,
            })
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  toPic2(e) {
    let self = this;
    let current = self.data.userInfo.slide;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  onShareAppMessage: function () {

  }
})