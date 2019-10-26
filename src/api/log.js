import request from '@/utils/request.js'

export const getLogList = (data) => {
  return request({
    url: '/sys-90/admin/logs/list',
    params: data
  })
}

export const delLogsById = (data) => {
  return request({
    url: '/sys-90/admin/logs/deleteBatch',
    method: 'DELETE',
    params: {
      idList: data
    }
  })
}
