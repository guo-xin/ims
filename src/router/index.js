import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
// import main from 'components/mian/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
