import request from '@/utils/request.js'

export const getTxDetailBy_PerformanceId = (id) =>{
    return request({
        url:`/sys-90/admin/fund/performance/getTxDetailByPerformanceId`,
        params : {
            id
        }
    })
}

export const fundPerformanceList = (id,currPage,pageSize) =>{
    return request({
        url:'/sys-90/admin/fund/performance/list',
        params:{
            param:id,
            currPage,
            pageSize
        }
    })
}

export const performanceDetailById = (id) =>{
    return request({
        url:`/sys-90/admin/fund/performance/performanceDetail`,
        params:{
            performanceId:id
        }
    })
}

export const performanceFundGran = (ids,id) =>{
    return request({
        url:`/sys-90/admin/fund/account/issueFund`,
        method: 'post',
        params:{
            performanceId:id,
            txIdList:ids
        }
    })
}
// export const getTxDetailByPerformanceId = (id) => {
//   return request({
//     url: '/admin/fund/account/getTxDetailByPerformanceId',
//     params: {
//       id
//     }
//   })
// }

// export const fundPerformanceList = () => {
//   return request({
//     url: '/admin/fund/performance/list'
//   })
// }

export function selectAccountList (currPage, pageSize, key) {
  return request({
    url: `/sys-90/admin/fund/account/list?currPage=${currPage}&pageSize=${pageSize}`,
    params: {
      key
    }
  })
}

export function changeAccountStatus (id) {
  return request({
    url: `/sys-90/admin/fund/account/status/${id}`,
    method: 'put'
  })
}

export function deleteAccountById (id) {
  return request({
    url: `/sys-90/admin/fund/account/${id}`,
    method: 'delete'
  })
}

export function createOrUpdateAccount (account) {
  return request({
    url: `/sys-90/admin/fund/account/createOrUpdate`,
    params: account,
    method: 'post'
  })
}