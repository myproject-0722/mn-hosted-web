import request from '@/utils/request.js'

// DOTC
export function selectDataCount () {
  return request({
    url: '/sys-90/admin/dotc/dataCount',
    method: 'get'
  })
}

export function blockDataUploadCharts (beginDate, endDate) {
  return request({
    url: '/sys-90/admin/dotc/dataCountCharts',
    params: {
      beginDate,
      endDate
    },
    method: 'get'
  })
}

export function blockDataCountByType (custId) {
  return request({
    url: '/sys-90/admin/dotc/dataCountByType',
    params: {
      custId
    },
    method: 'get'
  })
}

// SALE
export function selectOrderCount () {
  return request({
    url: '/sys-90/admin/sale/order/orderCount',
    method: 'get'
  })
}

export function selectOrderCountByDay (beginDate, endDate) {
  return request({
    url: '/sys-90/admin/sale/order/orderCountByDay',
    params: {
      beginDate,
      endDate
    },
    method: 'get'
  })
}

// NODES
export function selectNodeCount () {
  return request({
    url: '/sys-90/admin/nodes/nodeCount',
    method: 'get'
  })
}

export function nodesCreateCharts (beginDate, endDate) {
  return request({
    url: '/sys-90/admin/nodes/nodesCreateCharts',
    params: {
      beginDate,
      endDate
    },
    method: 'get'
  })
}

// SMS
export function selectUserCount () {
  return request({
    url: '/sys-90/admin/sms/user/userCount',
    method: 'get'
  })
}

export function selectUserCountByDay (beginDate, endDate) {
  return request({
    url: '/sys-90/admin/sms/user/userCountByDay',
    params: {
      beginDate,
      endDate
    },
    method: 'get'
  })
}
