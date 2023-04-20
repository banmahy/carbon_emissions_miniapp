// pages/accommodation.js
import {
  calculate
} from '../../api/accommodation/accommodation'
import userUtils from '../../utils/userUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelType: [{
        value: 0,
        label: '低价'
      },
      {
        value: 1,
        label: '普通'
      },
      {
        value: 2,
        label: '高级'
      }
    ],
    priceLevel: null,
    population: null,
    userId: userUtils.getUserId() || '',
    index: null,
    carbonEmission: '',
    flag: false,
    menuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      menuList: userUtils.getMenuList().split(',')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  pickerChange(e) {
    this.setData({
      index: e.detail.value,
      priceLevel: this.data.hotelType[e.detail.value].value
    })
  },
  calculate() {
    let _this = this.data
    if (_this.priceLevel === '' || _this.priceLevel === null) {
      wx.showToast({
        title: '请选择酒店等级',
      })
      return
    }
    if (_this.population === '' || _this.population === null) {
      wx.showToast({
        title: '请输入人数',
      })
      return
    }
    calculate(_this.priceLevel,_this.population,_this.userId).then(res => {
      this.setData({
        flag: true,
        carbonEmission: res.carbonEmission.toFixed(3)
      })
    })
  },
  populationInput(e) {
    this.setData({
      population: e.detail.value,
    })
  }
})