import request from '@/utils/request.js'

export function orderPage (currPage, pageSize, param, type, payWay, status) {
  return request({
    url: `/sys-90/admin/sale/order/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param,
      type,
      payWay,
      status
    }
  })
}
