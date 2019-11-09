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

export function logout (userid, token) {
  const data = {
    'userid': userid,
    'token': token
  };
  return request({
    url: 'user/User/SignOut',
    method: 'post',
    params: data,
    transformRequest: [function () {
      return JSON.stringify(data)
    }],
    headers: {
      'Content-Type': 'application/json;'
    }
  })
}
