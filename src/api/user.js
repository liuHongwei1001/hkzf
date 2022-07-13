import request from '@/utils/request'

// 登录接口
export const getLoginAPI = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}
