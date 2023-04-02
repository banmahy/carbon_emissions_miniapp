/**
 * 请求工具类
 * 
 * @author
 * @date
 */

import { BASE_URL } from '../config'
// import userUtil from './core/userUtil'
// import promptUtil from './promptUtil'

/**
 * GET 请求
 * 
 * @param {String} url 请求地址
 * @param {Object} request_params 请求参数
 */
const _get = (url, request_params) => _request(url, request_params)

/**
 * POST 请求
 *
 * @param {String} url 请求地址
 * @param {Object} request_params 请求参数
 */
const _post = (url, request_params) => _request(url, request_params, 'POST')

/**
 * 统一请求处理
 * 
 * @param {String} url 请求地址
 * @param {Object} request_params 请求参数
 * @param {String} http_Methd 请求方法 default:'GET'
 */
const _request = (url, request_params, http_Methd = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: http_Methd,
      data: request_params,
      header: {
        // 'X-AUTH-TOKEN': userUtil.getUserToken()
      },
      success(res) {
        let { data } = res
        if (res.statusCode === 200) {
          resolve(data)
        } else {
          if (data.errorType === 'Business') {
            resolve(data)
            // 业务类型的错误，开发人员自己处理
          } else if (data.errorType === 'System') {
            // 系统的错误，拦截处理
            error_handle(data)
          } else if (data.errorType === 'Authentication') {
            // 未授权的错误，跳转到登陆页面
            unauthorized_handle()
          } else if (data.errorType === 'Authorization') {
            // 权限不足，拦截处理
            insufficient_authority_handle(data)
          }
          else if (data.errorType === 'OffsiteAuthentication') {
            wx.clearStorage()
            wx.showModal({
              // title: '测试过程中出问题请往下阅读：',
              content: '账号在其他设备中登录',
              showCancel: false,
              confirmColor: '#4aa7fa'
            })
          }
          reject(data)
        }
      },
      fail(error) {
        reject(error)
        console.log('fail' + error);
      }
    })
  })
}
/**
 * 未授权 统一处理
 */
const unauthorized_handle = () => {
  wx.showModal({
    title: '未登录',
    content: '请先登录',
    success: (res) => {
      if (res.confirm) {
        // wx.navigateTo({
        //   url: '../login/login'
        // })
      }
    }
  })
}

/**
 * 权限不足 统一处理
 */
const insufficient_authority_handle = res => {
  console.log(res)
  // promptUtil.showPrompt(res.msg)
}

/**
 * 错误 统一处理
 * @param {Object} res 返回结果
 */
const error_handle = res => {
  wx.showModal({
    title: '发现问题了',
    content: res.msg + ':' + res.data,
    showCancel: false,
    confirmColor: '#4aa7fa'
  })
}


module.exports = {
  _get,
  _post
}