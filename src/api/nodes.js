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


export function getCoinInfo (coinname) {
  return request({
    url: `/node/Masternode/GetCoinInfo?coinname=${coinname}`,
    params: {
    }
  })
}
