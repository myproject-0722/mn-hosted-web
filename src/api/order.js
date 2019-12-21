import request from '@/utils/request.js'
import store from '@/store'

export function getorderinfo () {
  return request({
    url: `/order/Order/GetOrderInfo?userid=${store.state.user.userid}`,
    params: {
    }
  })
}

export function getorderlist (currPage, pageSize, param, status, step) {
  return request({
    url: `/order/Order/GetOrderList?userid=${store.state.user.userid}`,
    params: {
    }
  })
}