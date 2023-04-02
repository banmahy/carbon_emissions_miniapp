//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 导航栏颜色
    customBgColor: 'bg-gradual-blue',
    userInfo: {},
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 导航栏标题
    customTitle: '碳足迹',
    // 是否系统登录
    // hasLogin: userUtil.checkLogin(),
    // 是否用户授权登录
    // hasAuth: false,
    // 内容Node信息
    // contentNode: null,
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
    // 是否关联用户
    // hasStoreUserRel: false
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
    // 设置是否授权
    // this.setHasAuth()
    // 获取主要内容node信息（缓存获取）
    // this.getStoreMainContengInfo()

    // 由于 用户授权登录 是网络请求，可能会在 Page.onLoad 之后才返回
    // app.userInfoReadyCallback = res => {
    //   console.log('callback user info')
    //   console.log(res)
    //   this.setData({
    //     hasLogin: userUtil.checkLogin(),
    //     userInfo: res || {},
    //     hasStoreUserRel: hasStoreUserRel()
    //   })
    //   this.setHasAuth()
    //   console.log('权限')
    //   console.log(permisAccessUtil.getPermissionList())
    //   this.validActionPermis()
    // }

    // this.getUserInfo()
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  /**
   * 生命周期 -> 页面显示/切入前台时触发。
   */
  onShow: function () {
    // this.setData({
    //   canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //   hasLogin: userUtil.checkLogin()
    // })
    // this.getUserInfo()
  },
  /**
   * 生命周期 -> 页面初次渲染完成时触发
   */
  onReady: function () {
    // 获取最新主要内容信息（宽高等）（无缓存是获取）
    // !this.data.contentNode && this.getNewMainContengInfo()
  },

  /**
   * 分享给朋友
   */
  onShareAppMessage: function () {
    // return this.selectComponent('#same-city').shareToFriend();
  },
  /**
   * 获取用户信息
   */
  // getUserInfo: function () {
  //   console.log('index, get user info')
  //   if (!userUtil.checkLogin()) {
  //     this.setData({
  //       userInfo: {}
  //     })
  //   } else {
  //     this.setData({
  //       userInfo: userUtil.getUserInfo()
  //     })
  //     // 设置是否授权
  //     this.setHasAuth()
  //   }
  //   console.log(this.data.userInfo)
  // },
  /**
   * 设置是否授权
   */
  // setHasAuth() {
  //   userUtil.checkUserAuth().then(flag => {
  //     // 获取用户信息
  //     this.setData({
  //       hasAuth: flag
  //     })
  //   })
  // },
  openCom() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 获取缓存主要内容信息（宽高等）
   */
  // getStoreMainContengInfo() {
  //   const contentNode = wx.getStorageSync(store_content_node_key)
  //   contentNode && this.setData({
  //     contentNode: contentNode
  //   })
  // },
  /**
   * 验证功能权限
   */
  // validActionPermis() {
  // let { validRegionlist, actionList } = this.data
  // validRegionlist.forEach(e => (e.permisFlag = permisAccessUtil.$Permis_Access(e.permis)))
  // actionList.forEach(e => (e.permisFlag = permisAccessUtil.$Permis_Access(e.permis)))
  // this.setData({
  //   validRegionlist,
  //   actionList
  // })
  // },
  /**
   * go 用户信息
   */
  goMine() {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  goByUrl(e) {
    let {
      url,
      valid
    } = e.currentTarget.dataset
    // 需要验证 && 用户不为门店相关人员
    if (valid && !hasStoreUserRel()) {
      // if (!this.selectComponent("#region-search-form").valid(true)) return
      if (!regionValid(true)) {
        return
      }
      console.log('通过')
    }
    url && wx.navigateTo({
      url: url,
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
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
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
  },
  getInfo() {
    getInfo().then(res => {
      console.log(res)
    })
  }
})