import request from '@/utils/request'

/** 根据城市名称查询该城市信息
 *
 * @param {城市名称} name
 * @returns
 */
export const getAreaInfo = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}

/** 获取房屋查询条件
 *
 * @param {城市id} id
 * @returns
 */
export const getHouseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

// 根据条件查询房屋所需要的各种数据
export const getHouseData = (params) => {
  return request({
    url: '/houses',
    params
  })
}
