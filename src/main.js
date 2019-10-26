import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router.js'
import store from './store'
import '@/styles/index.css'
import '@/styles/icon/iconfont.css'
// import '@/styles/icon.less'

import * as filters from './filters'
Vue.use(ElementUI) // global filters

import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

Vue.use(FormMaking)

Vue.config.productionTip = false

if (sessionStorage.getItem('store')) {
  store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
}

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('store', JSON.stringify(store.state))
})

router.beforeEach((to, from, next) => {
  var token = store.state.user.token
  // console.log(token)
  // console.log(store.state)
  if (token || to.path === '/login') {
    next()
  } else if (!token && to.path !== '/login') {
    next({ name: 'login' })
  }
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
