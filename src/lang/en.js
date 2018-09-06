
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
    add: '增加',
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
      T5: '新增清分模板',
      T6: '编辑清分模板',
      T7: '清分模板详情',
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
      staticAmount: '固定金额',
      percent: '百分比',
      day: '日结',
      week: '周结',
      month: '月结',
      singleAmount: 'Single sum of money',
      settleCircle: 'Settlement cycle',
      floorType: 'Ladder type',
      floorCount: '分阶梯计算',
      yes: 'Yes',
      no: 'No'
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
      isSettle: 'Yes / no settlement',
      agent: '机构',
      firstAgent: '一级代理',
      secondAgent: '二级代理',
      income: '收入',
      expend: '支出',
      merchantRate: '商户费率',
      headCost: '总部成本',
      firstCost: '一级代理成本',
      secondCost: '二级代理成本',
      startVal: '起始值',
      endVal: '终止值',
      firstRate: '一级代理费率',
      secondRate: '二级代理费率'
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
