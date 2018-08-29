import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/agencyList'
import userList from 'components/authority/userList'
import agencyCreate from 'components/agency/agencyCreate'
import forgetPassword from 'components/forgetPassword'
import bussiness from 'components/merchant/bussinessList'
import mchnt from 'components/merchant/merchantList'

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
      path: '/main',
      component: main,
      children: [
        {
          path: 'shop_manage_index',
          name: 'shop_manage_index',
          component: bussiness
        },
        {
          path: 'mchnt_manage_index',
          name: 'mchnt_manage_index',
          component: mchnt
        },
        {
          path: 'agencyList',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agencyCreate',
          name: 'agencyCreate',
          component: agencyCreate
        },
        {
          path: 'userList',
          name: 'userList',
          component: userList
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
