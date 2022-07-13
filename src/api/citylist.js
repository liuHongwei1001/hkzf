import request from '@/utils/request'

/** 获取城市列表
 *
 * @returns
 */
export const getCityList = () => {
  return request({
    url: '/area/city?level=1'
  })
}

/** 获取城市列表
 *
 * @returns
 */
export const getHotCityList = () => {
  return request({
    url: '/area/hot'
  })
}
