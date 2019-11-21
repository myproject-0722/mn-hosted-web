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

export function mailcode (account) {
  const data = {
    'account': account
  };

  return request({
    url: 'user/User/MailCode',
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

export function reset (account, passwd, authcode) {
  const data = {
    'account': account,
    'password': passwd,
    'authcode': authcode
  };

  return request({
    url: 'user/User/Reset',
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

export function logout () {
  const data = {
    'userid': store.state.user.userid
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
