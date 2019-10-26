let Base64 = require('js-base64').Base64

const KONG_AUTH = {
  username: 'admin',
  secret: '999000'
}

/**
 * 生成认证信息
 */
export function _kongAuth (headers) {
  let encodeStr = Base64.encode(KONG_AUTH.username + ':' + KONG_AUTH.secret)

  headers['Authorization'] = 'Basic ' + encodeStr

  return headers
}
