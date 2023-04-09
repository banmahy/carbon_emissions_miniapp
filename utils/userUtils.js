const checkIsLogin = () => {
  return wx.getStorageSync('userInfo') === ''
}

module.exports = {
  checkIsLogin
}