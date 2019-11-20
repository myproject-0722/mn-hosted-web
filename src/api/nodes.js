import request from '@/utils/request.js'


export function coinPage (currPage, pageSize, param, status, step) {
  return request({
    url: `/node/Masternode/GetCoinList?curpage=${currPage}&pagesize=${pageSize}`,
    params: {
      status,
      step
    }
  })
}
