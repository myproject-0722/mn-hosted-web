import request from '@/utils/request.js'

export const getProductActivityList = (param, currPage, pageSize) => {
  return request({
    url: `/sys-90/admin/productActivity/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param
    }
  })
}

export const addProductActivity = (data) => {
  return request({
    url: `/sys-90/admin/productActivity/create`,
    params: data,
    method: 'post'
  })
}

export const editProductActivity = (data) => {
  return request({
    url: `/sys-90/admin/productActivity/update`,
    params: data,
    method: 'post'
  })
}

export const delProductActivity = (id) => {
  return request({
    url: `/sys-90/admin/productActivity/${id}`,
    method: 'delete'
  })
}
