import request from '@/utils/request'

/** 轮播图
 *
 * @returns
 */
export const getBanner = () => {
  return request({
    url: '/home/swiper'
  })
}

/** 租房小组
 *
 * @returns
 */
export const getRentalGroup = () => {
  return request({
    url: '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
  })
}
