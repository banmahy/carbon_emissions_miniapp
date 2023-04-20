const checkIsLogin = () => {
  return wx.getStorageSync('userInfo') === ''
}

const getUserToken = () => {
  return wx.getStorageSync('token')
}

const getUserId = () => {
  return wx.getStorageSync('userId')
}

const getMenuList = () => {
  return wx.getStorageSync('menuList')
}

module.exports = {
  checkIsLogin,
  getUserToken,
  getUserId,
  getMenuList
}