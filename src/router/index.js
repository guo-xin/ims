import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/list'
import agencyCreate from 'components/agency/create'
// import tradeList from 'components/trade/list'
import roleList from 'components/role/list'
import roleModify from 'components/role/modify'
import forgetPassword from 'components/forgetPassword'
import bussiness from 'components/merchant/bussinessList'

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
          path: 'storeManage',
          name: 'storeManage',
          component: bussiness
        },
        {
          path: 'agent_manage_index',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agencyCreate',
          name: 'agencyCreate',
          component: agencyCreate
        },
        {
          path: 'perm_role_index',
          name: 'roleList',
          component: roleList
        },
        {
          path: 'perm_role_create',
          name: 'roleCreate',
          component: roleModify
        },
        {
          path: 'perm_role_edit/:code',
          name: 'roleEdit',
          component: roleModify
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
