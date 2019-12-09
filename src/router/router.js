import Vue from 'vue'
import Vuerouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Forget from '@/views/Forget.vue'
import Reset from '@/views/Reset.vue'
import Home from '@/views/Home.vue'
import wel from '@/views/welcome.vue'
import user from '@/views/user/index.vue'
import customer from '@/views/user/customer.vue'
import customerParameter from '@/views/user/customerParameter'
import product from '@/views/product/index.vue'
import productActivity from '@/views/productActivity/index.vue'
import content from '@/views/cms/index.vue'
import theme from '@/views/cms/theme.vue'
import model from '@/views/cms/category.vue'
import log from '@/views/log/index.vue'
import fundAccount from '@/views/fundAccount/index.vue'
import fundDealDetails from '@/views/fundAccount/dealDetails.vue'
import fundPerformanceDetails from '@/views/fundAccount/performanceDetails.vue'
import fundList from '@/views/fundAccount/fundList'
import contentEdit from '@/views/cms/contentEdit.vue'

import sysParameter from '@/views/sys/sysParameter'

import coinsList from '@/views/node/coinsList'
import masternodeList from '@/views/node/masternodeList'
import dashcore from '@/views/node/dashcore'
import dash from '@/views/node/dash'
import vds from '@/views/node/vds'
import snowgem from '@/views/node/snowgem'
import alipay from '@/views/node/alipay'

import orderList from '@/views/sale/orderList'

Vue.use(Vuerouter)

// 解决点击路由跳转相同地址 会有报错的问题，ui组件版本问题
const originalPush = Vuerouter.prototype.push
Vuerouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

var router = new Vuerouter({
  mode: 'history',
  routes: [
    {
      path: '/'//,
      //redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'forget',
      path: '/forget',
      component: Forget
    },
    {
      name: 'reset',
      path: '/reset',
      component: Reset
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { name: 'wel' },
      children: [
        {
          name: 'wel',
          path: 'wel',
          component: wel
        },
        {
          name: 'user',
          path: 'user',
          component: user
        },
        {
          name: 'customer',
          path: 'customer',
          component: customer
        },
        {
          name: 'customerParameter',
          path: '/home/customerParameter',
          component: customerParameter
        },
        {
          name: 'product',
          path: 'product',
          component: product
        },
        {
          name: 'productActivity',
          path: 'productActivity',
          component: productActivity
        },
        {
          name: 'content',
          path: '/home/content',
          component: content
        },
        {
          name: 'theme',
          path: '/home/theme',
          component: theme
        },
        {
          name: 'model',
          path: '/home/model',
          component: model
        },
        {
          name: 'sysParameter',
          path: '/home/sysParameter',
          component: sysParameter
        },
        {
          name: 'log',
          path: '/home/log',
          component: log
        },
        {
          name: 'coinsList',
          path: '/home/coinsList',
          component: coinsList
        },
        {
          name: 'dashcore',
          path: '/home/dashcore',
          component: dashcore
        },
        {
          name: 'dash',
          path: '/home/dash',
          component: dash
        },
        {
          name: 'vds',
          path: '/home/vds',
          component: vds
        },
        {
          name: 'snowgem',
          path: '/home/snowgem',
          component: snowgem
        },
        {
          name: 'alipay',
          path: '/home/alipay',
          component: alipay
        },
        {
          name: 'masternodeList',
          path: '/home/masternodeList',
          component: masternodeList
        },
        {
          name: 'orderList',
          path: '/home/orderList',
          component: orderList
        },
        {
          name: 'fundAccount',
          path: '/home/fundAccount',
          component: fundAccount
        },
        {
          name: 'fundDealDetails',
          path: '/home/fundDealDetails',
          component: fundDealDetails
        },
        {
          name: 'fundPerformanceDetails',
          path: '/home/fundPerformanceDetails',
          component: fundPerformanceDetails
        },
        {
          name: 'fundList',
          path: '/home/fundList',
          component: fundList
        },
        {
          name: 'contentEdit',
          path: '/home/contentEdit',
          component: contentEdit
        }
      ]
    }
  ]
})

export default router
