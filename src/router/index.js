import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import agencyList from 'components/agency/list'
import agencyDetail from 'components/agency/detail'
import agencyModify from 'components/agency/modify'
import tradeList from 'components/trade/list'
import tradeTotal from 'components/trade/total'
import roleList from 'components/authority/roleList'
import roleModify from 'components/authority/modify'
import userList from 'components/authority/userList'
import forgetPassword from 'components/forgetPassword'
import bussinessList from 'components/merchant/bussinessList'
import merchantList from 'components/merchant/merchantList'
import auditList from 'components/merchant/auditList'
import mchntDetail from 'components/merchant/detail'
import auditDetail from 'components/merchant/auditDetail'
import createMerchant from 'components/merchant/createMerchant'
import settleDetail from 'components/settlement/settleDetail'
import settleMode from 'components/settlement/settleMode'
import settleTotal from 'components/settlement/settleTotal'
import settleSet from 'components/settlement/settleSet'
import modCreate from 'components/settlement/modCreate'
import modDetail from 'components/settlement/modDetail'
import home from 'components/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
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
      redirect: '/main/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'shop_manage_list',
          name: 'shop_manage_list',
          component: bussinessList
        },
        {
          path: 'mchnt_manage_list',
          name: 'mchnt_manage_list',
          component: merchantList
        },
        {
          path: 'mchnt_manage_list/mchnt_create',
          name: 'mchntCreate',
          component: createMerchant
        },
        {
          path: 'mchnt_manage_list/mchnt_detail',
          name: 'mchntDetail',
          component: mchntDetail
        },
        {
          path: 'mchnt_audit_list',
          name: 'mchnt_audit_list',
          component: auditList
        },
        {
          path: 'mchnt_audit_list/audit_detail',
          name: 'auditDetail',
          component: auditDetail
        },

        {
          path: 'agent_manage_list',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agent_detail/:id',
          name: 'agencyDetail',
          component: agencyDetail
        },
        {
          path: 'agent_create',
          name: 'agencyCreate',
          component: agencyModify
        },
        {
          path: 'agent_edit/:id',
          name: 'agencyEdit',
          component: agencyModify
        },
        {
          path: 'trade_detail_list',
          name: 'tradeList',
          component: tradeList
        },
        {
          path: 'trade_summary_list',
          name: 'tradeTotal',
          component: tradeTotal
        },
        {
          path: 'perm_role_list',
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
        },
        {
          path: 'perm_user_list',
          name: 'userList',
          component: userList
        },
        {
          path: 'clearing_detail_list',
          name: 'settleDetail',
          component: settleDetail
        },
        {
          path: 'clearing_template_list',
          name: 'settleMode',
          component: settleMode
        },
        {
          path: 'clearing_template_list/modCreate',
          name: 'modCreate',
          component: modCreate
        },
        {
          path: 'clearing_template_list/modDetail',
          name: 'modDetail',
          component: modDetail
        },
        {
          path: 'clearing_template_list/settleSet',
          name: 'settleSet',
          component: settleSet
        },
        {
          path: 'clearing_summary_list',
          name: 'settleTotal',
          component: settleTotal
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
