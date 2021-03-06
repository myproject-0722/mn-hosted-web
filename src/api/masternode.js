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

export function createVds (name, mnkey, txid, txindex, timetype) {
  return request({
    url: `/order/Order/Alipay?userid=${store.state.user.userid}&coinname=vds&mnname=${name}&mnkey=${mnkey}&txid=${txid}&txindex=${txindex}&timetype=${timetype}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}


export function createSnowgem (name, mnkey, txid, txindex, timetype) {
  return request({
    url: `/order/Order/Alipay?userid=${store.state.user.userid}&coinname=snowgem&mnname=${name}&mnkey=${mnkey}&txid=${txid}&txindex=${txindex}&timetype=${timetype}`,
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

export function get (currPage, pageSize) {
  return request({
    url: `/node/Masternode/Get?userid=${store.state.user.userid}&curpage=${currPage}&pagesize=${pageSize}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}


export function getrewardslist () {
  return request({
    url: `/node/Masternode/GetCoinRewards?userid=${store.state.user.userid}`,
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

export function changeNotify (mnid, isnotify) {
  return request({
    url: `/node/Masternode/ChangeNotify?userid=${store.state.user.userid}&mnid=${mnid}&isnotify=${isnotify}`,
    params: {
    }
  })
}

export function modifyDash (mnid, mnkey) {
  return request({
    url: `/node/Masternode/Modify?userid=${store.state.user.userid}&mnid=${mnid}&mnkey=${mnkey}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}


export function modifyVds (mnid, name, mnkey, txid, txindex) {
  return request({
    url: `/node/Masternode/Modify?userid=${store.state.user.userid}&mnid=${mnid}&name=${name}&mnkey=${mnkey}&txid=${txid}&txindex=${txindex}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}


export function modifySnowgem (mnid, name, mnkey, txid, txindex) {
  return request({
    url: `/node/Masternode/Modify?userid=${store.state.user.userid}&mnid=${mnid}&name=${name}&mnkey=${mnkey}&txid=${txid}&txindex=${txindex}`,
    params: {
      /*coinname,
      mnkey,
      externalip*/
    }
  })
}