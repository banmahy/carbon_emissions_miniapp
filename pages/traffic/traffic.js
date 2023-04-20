// pages/traffic.js
import {
  calculate
} from '../../api/traffic/traffic'
import userUtils from '../../utils/userUtils.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trafficType: [{
        value: 0,
        label: '汽车'
      },
      {
        value: 1,
        label: '高铁'
      },
      {
        value: 2,
        label: '飞机'
      }
    ],
    traffic: null,
    distance: null,
    population: null,
    userId: userUtils.getUserId() || '',
    index: null,
    carbonEmission: '',
    flag: false,
    hasMenu: wx.getStorageSync('menuList').split(',').indexOf('10') > -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(wx.getStorageSync('menuList').split(',').indexOf('10') > -1)
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
      traffic: this.data.trafficType[e.detail.value].value
    })
  },
  calculate() {
    let _this = this.data
    if (_this.traffic === '' || _this.traffic === null) {
      wx.showToast({
        title: '请选择交通方式',
      })
      return
    }
    if (_this.distance === '' || _this.distance === null) {
      wx.showToast({
        title: '请输入里程',
      })
      return
    }
    if (_this.population === '' || _this.population === null) {
      wx.showToast({
        title: '请输入人数',
      })
      return
    }
    calculate(_this.traffic, _this.distance, _this.population,_this.userId).then(res => {
      this.setData({
        flag: true,
        carbonEmission: res.carbonEmission.toFixed(3)
      })
    })
  },
  distanceInput(e) {
    this.setData({
      distance: e.detail.value,
    })
  },
  populationInput(e) {
    this.setData({
      population: e.detail.value,
    })
  }
})