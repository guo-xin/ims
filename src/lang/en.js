
'use strict';
import enLocale from 'qfpay-element-ui/lib/locale/lang/en'

const en = {
  ...enLocale,
  common: {
    title: 'Overseas agency service business platform',
    all: 'All',
    create: 'Create',
    export: '导出',
    choose: 'Please choose',
    save: 'Save',
    edit: 'Edit',
    close: 'Close',
    search: 'Search',
    reset: 'Reset',
    loading: 'Loading...',
    netError: 'Net error',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: 'operation',
    delete: '删除',
    look: '查看',
    range: 'select date range',
  },
  authority: {
    crumbs: {
      T1: 'User management',
      T2: 'Role management'
    },
    panel: {
      userName: 'User name',
      roleName: 'Role name',
      state: 'State',
      open: '启用',
      close: '停用'
    },
    table: {
      role: 'Role',
      account: 'Account',
      rTime: 'Registration time',
      lTime: 'Last landing time'
    },
    dialog: {
      title1: '新增用户',
      title2: '用户详情',
      pwd: '密码',
      tp1: '请输入用户名称',
      tp2: '请输入角色名称',
      tp3: '请输入账户',
      tp4: '最多输入30个字符',
      tp5: '请输入密码',
      tp6: '请选择状态'
    }
  },
  settleMent: {
    crumbs: {
      T1: '清分明细',
      T2: '清分汇总',
      T3: '清分模板管理',
      T4: '清分配置管理',
    },
    btn: {
      add: '新增',
      set: '配置'
    },
    panel: {
      orderNo: '订单号',
      tradeTime: 'Date of transaction',
      settleType: '结算方类型',
      settleName: 'Settlement party',
      payType: '支付类型',
      settleDetail: 'Settlement subject',
      settlePass: '结算通道',
      modeName: 'Template name',
      createTime: '创建时间',
      agentName: '代理商名称',
      payPass: 'Payment channel',
      effectTime: 'Effective date',
      passCost: 'Channel cost',
      singleAmount: 'Single sum of money',
      settleCircle: 'Settlement cycle',
      floorType: 'Ladder type'
    },
    table: {
      sNum: 'Flow number',
      merName: 'Name of the merchant',
      shopName: 'Store name',
      dealer: 'First level agent',
      tradeAmount: 'Transaction amount',
      settlePercent: 'Proportion of clearing',
      settleAmount: 'Amount of clearing',
      order: '序列',
      passName: '通道名称',
      tradeNum: 'Number of pens',
      payGoods: 'Payment of products',
      lastTime: 'Update time',
      isMode: '是否默认模板',
      province: '省',
      city: '市',
      address: '地址',
      phone: '电话',
      countRules: 'Calculation formula',
      isSettle: 'Yes / no settlement'
    }
  },
  login: {
    nameph: 'Enter your phone number or E-mail',
    passph: 'Password',
    desc: 'We handle billions of dollars every year for forward-thinking businesses in the world',
    cap1: 'MOBILE PAYMENT',
    cap2: ' MANAGEMENT SYSTEM',
    checkbox: 'Remember the password',
    btn: 'Login',
    forgetPass: 'Forget the password',
    msg: {
      m1: 'Please enter the account.',
      m2: 'Please enter the password.',
      m3: 'Failed to log in.'
    }
  },
  main: {
    desc: 'MOBILE PAYMENT MANAGEMENT SYSTEM',
    roles: [
      ''
    ],
    logout: 'Logout'
  }
}
export default en;
