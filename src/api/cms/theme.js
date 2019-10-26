import request from '@/utils/request.js'

export function getList(param, currPage, pageSize) {
  return request({
    url: '/sys-90/admin/cms/theme/page',
    method: 'get',
    params: {
      param,
      currPage,
      pageSize
    }
  })
}

export function getThemeCategory(){
  return request({
    url: '/sys-90/admin/cms/theme/getThemeCategory',
    method: 'get'
  })
}

export function addTheme(data) {
  return request({
    url: '/sys-90/admin/cms/theme',
    method: 'post',
    data
  })
}

export function getTheme(id) {
  return request({
    url: '/sys-90/admin/cms/theme/' + id,
    method: 'get'
  })
}

export function editTheme(data) {
  return request({
    url: '/sys-90/admin/cms/theme',
    method: 'put',
    data
  })
}

export function deleteTheme(id) {
  return request({
    url: '/sys-90/admin/cms/theme/' + id,
    method: 'delete'
  })
}

export function getThemeOptions(name) {
  return request({
    url: '/sys-90/admin/cms/theme/options',
    method: 'get',
    params: {
      name
    }
  })
}
