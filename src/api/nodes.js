import request from '@/utils/request.js'


export function nodePage (currPage, pageSize, param, status, step) {
  return request({
    url: `/sys-90/admin/nodes/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param,
      status,
      step
    }
  })
}

export function coinPage (currPage, pageSize, param, status, step) {
  return request({
    url: `/node/Masternode/GetCoinList?curpage=${currPage}&pagesize=${pageSize}`,
    params: {
      status,
      step
    }
  })
}

export function nodeDiskPage (currPage, pageSize, param, custId) {
  return request({
    url: `/sys-90/admin/nodeDisk/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param,
      custId
    },
    method: 'get'
  })
}
