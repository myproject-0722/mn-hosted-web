import request from '@/utils/request.js'
import store from '@/store'

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
}

export function register (account, passwd) {
  const data = {
    'account': account,
    'passwd': passwd
  };

  return request({
    url: 'user/User/SignUp',
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

export function getinfo () {
  const data = {
    'userid': store.state.user.userid,
    'token': store.state.user.token
  };

  return request({
    url: 'user/User/GetInfo',
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
