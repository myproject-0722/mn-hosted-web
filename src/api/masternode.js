import request from '@/utils/request.js'
import store from '@/store'

export function create (coinname, mnkey, timetype) {
  return request({
    url: `/order/Order/Alipay?userid=${store.state.user.userid}&coinname=${coinname}&mnkey=${mnkey}&timetype=${timetype}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}

export function renew (coinname, mnkey, timetype) {
  return request({
    //url: `/node/Masternode/Renew?userid=${store.state.user.userid}&coinname=${coinname}&mnkey=${mnkey}&externalip=${externalip}&timetype=${timetype}&timenum=1`,
    url: `/order/Order/Alipay?userid=${store.state.user.userid}&coinname=${coinname}&mnkey=${mnkey}&timetype=${timetype}&isrenew=1`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}

export function get () {
  return request({
    url: `/node/Masternode/Get?userid=${store.state.user.userid}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}


export function getcount () {
  return request({
    url: `/node/Masternode/GetCount?userid=${store.state.user.userid}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}