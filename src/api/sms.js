import request from '@/utils/request.js'

export const getUserList = (currPage, pageSize, param) => {
  return request({
    url: `/sys-90/admin/sms/user/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param: param
    }
  })
}

export const changeUserState = (id) => {
  return request({
    url: `/sys-90/admin/sms/user/status/${id}`,
    method: 'put'
  })
}

export const editUserInfo = (data) => {
  return request({
    url: `/sys-90/admin/sms/user/update`,
    method: 'post',
    params: data
  })
}

export const getCustomerList = (currPage, pageSize, param) => {
  return request({
    url: `/sys-90/admin/sms/customer/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      param: param
    }
  })
}

export const changeCustomerState = (id) => {
  return request({
    url: `/sys-90/admin/sms/customer/status/${id}`,
    method: 'put'
  })
}

export const addNewCustomer = (data) => {
  return request({
    url: '/sys-90/admin/sms/customer/create',
    method: 'post',
    params: data
  })
}

export const editCustomerInfo = (data) => {
  return request({
    url: '/sys-90/admin/sms/customer/update',
    method: 'post',
    params: data
  })
}

export function setCustomerParam (custId, code, value, desc) {
  return request({
    url: '/sys-90/admin/sms/parameter/set',
    method: 'post',
    params: {
      custId,
      code,
      value,
      desc
    }
  })
}

export function parameterPage (custId) {
  return request({
    url: '/sys-90/admin/sms/parameter/custParam',
    params: {
      custId
    },
    method: 'get'
  })
}

export function getById (id) {
  return request({
    url: '/sys-90/admin/sms/parameter/' + id,
    method: 'get'
  })
}

export function getByCode (custId, code) {
  return request({
    url: '/sys-90/admin/sms/parameter/' + custId + '/code/' + code,
    method: 'get'
  })
}

export function searchParam (custId, key) {
  return request({
    url: '/sys-90/admin/sms/parameter/searchParam',
    params: {
      custId, key
    },
    method: 'get'
  })
}
