// pages/confluence/confluence.js
import {
  getInfo
} from '../../api/confluence/confluence.js'
import userUtils from '../../utils/userUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: userUtils.getUserId() || '',
    accommodationEmission: 0,
    activityEmission: 0,
    trafficEmission: 0,
    menuList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      menuList: userUtils.getMenuList().split(',')
    })
    this.getRecord()
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
  getRecord () {
    let _this = this.data
    getInfo(this.data.userId).then(res => {
      this.setData({
        accommodationEmission: res.accommodation.carbonEmission ? res.accommodation.carbonEmission.toFixed(3) : 0,
        activityEmission: res.activity.carbonEmission ? res.activity.carbonEmission.toFixed(3) : 0,
        trafficEmission: res.traffic.carbonEmission ? res.traffic.carbonEmission.toFixed(3) : 0
      })
    })
  }
})