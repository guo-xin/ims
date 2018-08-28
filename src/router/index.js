import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/list'
import agencyCreate from 'components/agency/create'
import tradeList from 'components/trade/list'
import forgetPassword from 'components/forgetPassword'

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
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
        component: forgetPassword
    },
    {
      path: '/main/main',
      name: 'main',
      component: main
    },
    {
      path: '/agencyList',
      name: 'agencyList',
      component: agencyList
    },
    {
      path: '/agencyCreate',
      name: 'agencyCreate',
      component: agencyCreate
    },
    {
      path: '/tradeList',
      name: 'tradeList',
      component: tradeList
    }
  ]
})
