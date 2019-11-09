import request from '@/utils/request.js'
import store from '@/store'

export function create (coinname, mnkey, timetype, externalip) {
  return request({
    url: `/node/Masternode/New?userid=${store.state.user.userid}&token=${store.state.user.token}&coinname=${coinname}&mnkey=${mnkey}&externalip=${externalip}&timetype=${timetype}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}

export function renew (coinname, mnkey, timetype, externalip) {
  return request({
    url: `/node/Masternode/Renew?userid=${store.state.user.userid}&token=${store.state.user.token}&coinname=${coinname}&mnkey=${mnkey}&externalip=${externalip}&timetype=${timetype}&timenum=1`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}

export function get () {
  return request({
    url: `/node/Masternode/Get?userid=${store.state.user.userid}&token=${store.state.user.token}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}