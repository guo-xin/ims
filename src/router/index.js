import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login/login'
import main from 'components/main/main'
import home from 'components/home/home'
import agencyList from 'components/agency/list'
import agencyDetail from 'components/agency/detail'
import agencyModify from 'components/agency/modify'
import tradeList from 'components/trade/list'
import tradeTotal from 'components/trade/total'
import refundManage from 'components/trade/refund'
import refundCheck from 'components/trade/check'
import roleList from 'components/authority/roleList'
import roleModify from 'components/authority/modify'
import userList from 'components/authority/userList'
import forgetPassword from 'components/forgetPassword'
import bussinessList from 'components/merchant/bussinessList'
import merchantList from 'components/merchant/merchantList'
import batchImport from 'components/merchant/batchImport'
import auditList from 'components/merchant/auditList'
import mchntDetail from 'components/merchant/detail'
import auditDetail from 'components/merchant/auditDetail'
import createMerchant from 'components/merchant/createMerchant'
import createStore from 'components/merchant/createStore'
import apiList from 'components/merchant/apiList'
import settleDetail from 'components/settlement/settleDetail'
import settleMode from 'components/settlement/settleMode'
import settleTotal from 'components/settlement/settleTotal'
import settleSet from 'components/settlement/settleSet'
import modCreate from 'components/settlement/modCreate'
import modDetail from 'components/settlement/modDetail'
import shopDetail from 'components/merchant/bussDetail'
import salesList from 'components/salesman/salesList'
import createSalesman from 'components/salesman/createSalesman'
import salesDetail from 'components/salesman/salesDetail'
import logList from 'components/system/logList'
import tradeLimit from 'components/system/tradeLimit'
import whiteList from 'components/system/whiteList'

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
          path: 'shop_manage_list/shop_detail',
          name: 'shopDetail',
          component: shopDetail
        },
        {
          path: 'shop_manage_list/shop_create',
          name: 'createStore',
          component: createStore
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
          path: 'mchnt_manage_list/batch_import',
          name: 'batchImport',
          component: batchImport
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
          path: 'api_manage_list',
          name: 'apiList',
          component: apiList
        },

        {
          path: 'agent_manage_list',
          name: 'agencyList',
          component: agencyList
        },
        {
          path: 'agent_manage_list/agent_detail/:id',
          name: 'agencyDetail',
          component: agencyDetail
        },
        {
          path: 'agent_manage_list/agent_create',
          name: 'agencyCreate',
          component: agencyModify
        },
        {
          path: 'agent_manage_list/agent_edit/:id',
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
          path: 'refund_list',
          name: 'refundManage',
          component: refundManage
        },
        {
          path: 'refund_audit_list',
          name: 'refundCheck',
          component: refundCheck
        },

        {
          path: 'perm_role_list',
          name: 'roleList',
          component: roleList
        },
        {
          path: 'perm_role_list/perm_role_create',
          name: 'roleCreate',
          component: roleModify
        },
        {
          path: 'perm_role_list/perm_role_edit/:code',
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
        },
        {
          path: 'salesman_manage_list',
          name: 'salesList',
          component: salesList
        },
        {
          path: 'salesman_manage_list/sales_create',
          name: 'salesCreate',
          component: createSalesman
        },
        {
          path: 'salesman_manage_list/sales_detail',
          name: 'salesDetail',
          component: salesDetail
        },
        {
          path: 'operation_logs_list',
          name: 'logList',
          component: logList
        },
        {
          path: 'transaction_limit_list',
          name: 'tradeLimit',
          component: tradeLimit
        },

        {
          path: 'refund_white_list',
          name: 'whiteList',
          component: whiteList
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
