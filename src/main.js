// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import http from '@/coms/http'
import store from '@/coms/store'
import { getCookie } from './coms/server_func'
//引入iview的样式
import '@/assets/less/index.less'
import '@/assets/css/common.css'

Vue.use(iview)

Vue.config.productionTip = false

Vue.prototype.$http = http;

//全局路由守卫,用于登录验证
router.beforeEach( (to, from, next) => {

  //页面不存在则跳转到404
  if ( to.matched.length <= 0 ) {
    next({
      path: '/404',
      query: { redirect: to.fullPath}
    })
  }

  if ( to.matched.some( (record) => { return record.meta.requireAuth } ) ) {
      const userId = getCookie('user_id');
      if (!userId) {
        next({
          path: '/',
          query: { redirect: to.fullPath}
        })
      } else {
        next()
      }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
