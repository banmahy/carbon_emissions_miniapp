//index.js
//获取应用实例
const app = getApp()
import userUtils from '../../utils/userUtils.js'
Page({
  data: {
    // 导航栏颜色
    customBgColor: 'bg-gradual-blue',
    userInfo: {},
    // 导航栏标题
    customTitle: '碳足迹',
    // 是否系统登录
    hasLogin: userUtils.checkIsLogin(),
    // 动画执行
    toggleDelay: false,
    validRegionlist: [],
    actionList: [{
        name: '交通',
        desc: '交通碳足迹',
        color: 'black',
        url: '/pages/traffic/traffic'
      },
      {
        name: '住宿',
        desc: '住宿碳足迹',
        color: 'olive',
        url: '/pages/accommodation/accommodation'
      },
      {
        name: '活动',
        desc: '活动碳足迹',
        color: 'purple',
        url: '/pages/activity/activity'
      },
      {
        name: '总汇',
        desc: '碳足迹总汇',
        color: 'cyan',
        url: '/pages/confluence/confluence'
      },
    ],
    swiperList: [
     {
      id: 1,
      url: '/images/swiper/sw1.jpg'
    }, {
      id: 2,
      url: '/images/swiper/sw2.jpg'
    }],
    // 当前轮播
    curSwiper: 0,
    pageCur: 'homePage'
  },
  /**
   * 生命周期 -> 页面加载时触发
   */
  onLoad: function () {
    setTimeout(() => {
      this.setData({
        toggleDelay: true
      })
    }, 1000)
  },
  /**
   * 生命周期 -> 页面显示/切入前台时触发。
   */
  onShow: function () {

  },
  /**
   * 生命周期 -> 页面初次渲染完成时触发
   */
  onReady: function () {

  },

  /**
   * 分享给朋友
   */
  onShareAppMessage: function () {
  },
  openCom() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 轮播图变化
   */
  swiperChange(e) {
    this.setData({
      curSwiper: e.detail.current
    })
  },
  /**
   * 导航栏变化 
   */
  navChange(e) {
    this.setData({
      pageCur: e.currentTarget.dataset.cur
    })
    if (this.pageCur === 'mine') {
      this.setData({
        customTitle: '我的'
      })
    }
  }
})