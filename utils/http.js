/**
 * 请求工具类
 * 
 * @author
 * @date
 */


import { BASE_URL } from '../config'
import userUtils from '../utils/userUtils.js'

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
        'Authorization': userUtils.getUserToken()
      },
      success(res) {
        let { data } = res
        if (res.statusCode === 200) {
          resolve(data)
        } else {
          if (res.statusCode === 401) {
            // 未授权的错误，跳转到登陆页面
            unauthorized_handle()
          }
          reject(data)
        }
      },
      fail(error) {
        reject(error)
        // console.log('fail' + error);
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
      }
    }
  })
}


module.exports = {
  _get,
  _post
}