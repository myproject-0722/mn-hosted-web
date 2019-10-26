import axios from 'axios'
import store from '@/store'
import router from '@/router/router'
import { _kongAuth } from './kongAuth'
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.API,
  // baseURL: 'http://192.168.0.157:8000/', // url = base url + request url
  // baseURL: 'http://192.168.0.124:8080/',
  // baseURL: 'https://open.vpubchain.info/', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config)
    config.headers['adminToken'] = store.getters.token
    // config.headers['adminToken'] = '2191941b86c745e8bec75ca833202dbc';
    config.headers = _kongAuth(config.headers)
    config.headers['Access-Control-Allow-Origin'] = 'http://192.168.0.157:8000/'
    console.log(config)
    // console.log(JSON.parse(sessionStorage.getItem('store')).user.token)
    // config.headers.adminToken = JSON.parse(sessionStorage.getItem('store')).user.token;
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    //const res = response
    const res = response.data
    
    return res
  },
  error => {
    console.log(error)
    // error.config，error.code，error.message，error.response
    // console.log(error.config)
    // console.log(error.code)
    // console.log(error.message)
    console.log(error.response.data.code)
    if(error.response.data.code == 302){
      Message.error('登录过期，请重新登录');
      router.push({name: 'login'});
    }
    return Promise.reject(error)
  }
)

export default service
