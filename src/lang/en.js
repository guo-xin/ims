
'use strict';
import enLocale from 'qfpay-element-ui/lib/locale/lang/en'

const en = {
  enLocale,
  common: {
    title: 'Overseas agency service business platform',
    all: 'All',
    create: 'Create',
    export: '导出',
    choose: 'Please choose',
    save: 'Save',
    edit: 'Edit',
    prev: '上一步',
    next: '下一步',
    done: '完成',
    close: 'Close',
    search: 'Search',
    add: '增加',
    reset: 'Reset',
    loading: 'Loading...',
    netError: 'Net error',
    createSuccess: '创建成功',
    updateSuccess: '修改成功',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: 'operation',
    delete: '删除',
    look: '查看',
    range: 'select date range',
    confirm: '确定',
    cancel: '取消',
    tip: '提示',
    status: '状态',
    enable: '启用',
    disable: '停用'
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
      rTime: 'Registration time'
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
      T3: '清分模板',
      T4: '清分配置',
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
      noEffect: '不启用',
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
      secondRate: '二级代理费率',
      modeState: '模板状态',
      state: 'State',
      open: '启用',
      close: '停用'
    },
    dialog: {
      date: '配置日期',
      mode: '清分模板'
    },
    msg: {
      t1: '请输入模板名称',
      t2: '最多输入20个字符',
      t3: '请输入单笔金额',
      t4: '请输入正数',
      t5: '小数点后最多两位',
      t6: '请选择单笔金额条件',
      t7: '请选择支付通道',
      t8: '请选择结算周期',
      t9: '请选择通道成本',
      t10: '请输入通道成本',
      t11: '是否确认删除该清分模板?',
      t12: '请输入起始值',
      t13: '请输入终止值',
      t14: '请输入一级代理费率',
      t15: '请输入二级代理费率',
      t16: '交易笔数为正整数',
      t17: '起始值不能大于终止值',
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
  merchant: {
    title: 'Business Management',
    create: 'Create',
    query: 'Query',
    reset: 'Reset',
    patchImport: 'Batch Creation',
    form: {
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      agent1: 'Agent',
      audit_state: 'Audit State'
    },
    table: {
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      address: 'Address',
      mobile: 'Mobile',
      agent: 'Agent',
      account: 'User Name',
      cate_code: 'Category',
      state: 'State'
    },
    detail: {
      basic: {
        title: 'Detail Info',
        close: 'Close',
        subtitle: 'Basic Information',
        la1: 'Merchant Category:',
        la2: 'Audit Status:',
        la3: 'Name of Merchant:',
        la4: 'Agent:',
        la5: 'Address:',
        la6: 'Contacts:',
        la7: 'Legal Person:',
        la8: 'Contact Telephone:',
        la9: 'Email:',
        la10: 'Engage Time:'
      },
      shop: {
        subtitle: 'Shop Info',
        la1: 'Name of Shop:',
        la2: 'Address:',
        la3: 'Photograph:'
      },
      rates: {
        subtitle: 'Rates Info'
      },
      pay: {
        subtitle: 'Payment Info',
        la1: 'Account Name:',
        la2: 'Bank Account:',
        la3: 'Head Bank:',
        la4: 'Branch Bank:',
        la5: 'Province Bank:',
        la6: 'Bank Code:',
        la7: 'City Bank:',
        la8: 'Mobile:',
        la9: 'Bank Type:',
        la10: 'Photograph:'
      },
      edit: 'Edit'
    },
    newMerchant: {
      title1: 'Create A Merchant',
      title2: 'Modify Merchant',
      step1: 'Basic Info',
      step2: 'Rates Info',
      step3: 'Liquidation Info',
      basic: {
        cap1: 'Basic Info',
        cap2: 'Rates Info'
      }
    }
  },
  audit: {
    title: 'Audit Management',
    form: {
      mchtid: 'Merchant ID',
      audit_state: '',
      memo: ''
    },
    detail: {
      title: 'Audit Log',
      table: {
        creator: 'Operator ID',
        create_date: 'Audit Date',
        result: 'Result',
        memo: 'Memo'
      },
      doit: 'Audit'
    }
  },
  trade: {
    detail: '交易明细',
    total: '交易统计',
    common: {
      tradeDate: '交易日期',
      tradeTime: 'Transaction Time',
      sNum: 'Transaction ID',
      tradeType: 'Transaction Type',
      payPass: 'Payment Gateway',
      merchantName: 'Merchant Name',
      firstAgent: 'First Level Agent',
      secondAgent: 'Second Level Agent',
      wechat: '微信支付',
      alipay: '支付宝',
      success: '成功',
      failed: '失败',
      fee: 'MDR Fee',
      tradeAmount: 'Transaction Amount',
      amount: 'Total Amount',
      count: 'Entries'
    }
  },
  agent: {
    agentName: 'Agent Name',
    agentId: 'Agent ID',
    agentLevel: 'Agent Level',
    level: '等级',
    level1: '一级',
    level2: '二级',
    agentLevel1: '一级代理',
    agentLevel2: '二级代理',
    leaderAgent: 'Superior Agent Name',
    registerTime: 'Registration Time',
    agentNickname: 'Agent Abbreviation',
    agentArea: 'Agent Area',
    address: 'Address',
    contact: '联系人',
    legal: 'Legal Person',
    contactMobile: '联系人电话',
    legalMobile: '法人电话',
    saleMan: '业务员',
    belongSaleMan: '所属业务员',
    username: '登录账号',
    canuse: '可以注册',
    password: '登录密码',
    bankuser: 'Bank Account Name',
    bankaccount: 'Settlement Account',
    headbankname: 'Bank Name',
    bankname: 'Bank Branch Name',
    bankcode: 'Swift Code',
    wechat: 'Wechat',
    alipay: 'Alipay',
    agentDetail: '代理商详情',
    baseInfo: '基本信息',
    settleInfo: '结算信息',
    payRate: '支付费率',
    wechatRate: '微信费率',
    alipayRate: '支付宝费率',
    agentList: '代理商列表',
    agentAdd: '添加代理商',
    agentEdit: '修改代理商',
    agentBelong: '所属代理',
    pleaseEnter: 'Please Enter ',
    pleaseSelect: 'Please Select ',
    onlyLetterNumber: '登录账号只可以输入字母或数字',
    isRegistered: '登录账号已注册'
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
