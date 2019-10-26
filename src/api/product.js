import request from '@/utils/request.js'

export const addProduct = (data) => {
  return request({
    url: '/sys-90/admin/product/create',
    method: 'post',
    params: data
  })
}
export const getProductList = (param, currPage, pageSize) => {
  return request({
    url: `/sys-90/admin/product/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param
    }
  })
}

export const getCustomerIdList = () => {
  return request({
    url: '/sys-90/admin/product/list_cust'
  })
}

export const delProduct = (id) => {
  return request({
    url: `/sys-90/admin/product/${id}`,
    method: 'delete'
  })
}

export const getActivityList = () => {
  return request({
    url: '/sys-90/admin/product/list_activity'
  })
}

export const editProductInfo = (data) => {
  return request({
    url: '/sys-90/admin/product/update',
    method: 'post',
    params: data
  })
}
