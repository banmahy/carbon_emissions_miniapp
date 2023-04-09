// pages/mine/mine.js
import {
  login
} from '../../api/mine/mine.js'
import userUtils from '../../utils/userUtils.js'

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    token: '',
    isLogin: userUtils.checkIsLogin(),
    imgUrl: '../../images/no_head.png'
  },
  attached() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  methods: {
    /**
     * 登录
     */
    login(userInfo) {
      let self = this
      wx.login({
        success: res => {
          login(res.code, userInfo).then(res => {
            if (res) {
              // 将用户信息存到缓存中
              wx.setStorageSync('userInfo', self.data.userInfo)
              wx.showToast({
                title: '登录成功'
              })
              self.setData({
                token: res
              })
            }
          })
        },
      })
    },
    /**
     * 获取用户信息
     */
    getUserProfile() {
      let self = this
      wx.getUserProfile({
        desc: 'desc',
        success: res => {
          self.setData({
            userInfo: res.userInfo
          })
          self.login(res.userInfo ? JSON.stringify(res.userInfo) : '')
        },
        fail: res => {
          wx.showToast({
            title: '登陆失败，请联系管理员'
          })
        },
        completed: () => {}
      })
    },
    /**
     * 退出登录
     */
    logOut () {
      //清除缓存
      this.setData({
        userInfo: ''
      })
      wx.setStorageSync('userInfo','')
      wx.showToast({
        title: '已退出'
      })
    }
  }
})