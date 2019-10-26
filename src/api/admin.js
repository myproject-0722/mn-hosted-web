import request from '@/utils/request.js'

export function login (account, passwd) {
  const data = {
    'account': account,
    'passwd': passwd
  };

  return request({
    url: 'user/User/SignIn',
    method: 'post',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json;'
    }
  })
  /* return request({
    url: '/user/User/SignIn',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json;'
    },
    method: 'post'
  }) */
}

export function logout (id) {
  return request({
    url: '/sys-90/admin/sms/user/userstaus/' + id,
    method: 'post'
  })
}
