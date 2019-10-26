import request from '@/utils/request.js'

export const getThemeList = () => {
  return request({
    url: `/theme/page?currPage=1&pageSize=5`
  })
}
