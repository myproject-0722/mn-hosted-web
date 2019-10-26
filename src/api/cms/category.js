import request from '@/utils/request'

export function getList(param, currPage, pageSize) {
  return request({
    url: '/sys-90/admin/category/Page',
    method: 'get',
    params: {
      param,
      currPage,
      pageSize
    }
  })
}

export function addCategory(data) {
  return request({
    url: '/sys-90/admin/category',
    method: 'post',
    data
  })
}

export function getCategory(id) {
  return request({
    url: '/sys-90/admin/category/' + id,
    method: 'get'
  })
}

export function editCategory(data) {
  return request({
    url: '/sys-90/admin/category',
    method: 'put',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: '/sys-90/admin/category/' + id,
    method: 'delete'
  })
}

export function getCategoryOptions(params) {
  return request({
    url: '/sys-90/admin/category/options',
    method: 'get',
    params: params
  })
}
