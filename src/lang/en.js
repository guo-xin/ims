
'use strict';
import enLocale from 'qfpay-element-ui/lib/locale/lang/en'

const en = {
  ...enLocale,
  common: {
    title: 'Overseas agency service business platform',
    all: 'All',
    create: 'Create',
    export: 'Export',
    choose: 'Please choose',
    save: 'Save',
    submit: 'Submit',
    edit: 'Edit',
    prev: 'Previous',
    next: 'Next',
    done: 'Done',
    close: 'Close',
    search: 'Search',
    add: 'Add',
    reset: 'Reset',
    loading: 'Loading...',
    netError: 'Net error',
    createSuccess: 'Creation succeeded',
    updateSuccess: 'Modification succeeded',
    opSucc: 'Operation succeeded',
    opFailed: 'Operation Failed',
    operate: 'operation',
    delete: 'Delete',
    look: 'View',
    range: 'select date range',
    confirm: 'Confirm',
    cancel: 'Cancel',
    tip: 'Tip',
    status: 'Status',
    enable: 'Activate',
    disable: 'Deactivate',
    startTime: 'start time',
    endTime: 'end time',
    privata: 'Private',
    pub: 'Public',
    reupload: 'Re-Upload',
    format: 'Support JPG / PNG format',
    uploadSucc: 'Upload success',
    uploadFailed: 'Upload failure'
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
      count: '笔',
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
      t18: '请输入结算方名称',
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
    forgetPass: 'Forget password',
    msg: {
      m1: 'Please enter the account.',
      m2: 'Please enter the password.',
      m3: 'Failed to login.'
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
      step3: 'Settlement Info',
      basic: {
        cap1: 'Basic Info',
        cap2: 'Rates Info',
      },
      form: {
        account: 'Account',
        shopname: 'Store Name',
        name: 'Merchant Name',
        legal: 'Enterprise Legal Person',
        storeaddr: 'Store Address',
        email: 'Contact Email Address',
        cate: 'Merchant Type',
        scale: 'Merchant Scale',
        type: 'Type',
        sub: 'Sub Merchant',
        big: 'Big Merchant',
        chain: 'Chain Store',
        micro: 'Small and micro enterprises',
        geti: 'Individual Company',
        ent: 'Enterprises',
        main: 'Main Store UID',
        contact: 'Contact Name',
        cell: 'Contact Number',
        wei: 'WeChat Pay:',
        ali: 'Alipay:',
        rate: 'Merchant Rate',
        bankuser: 'User Account Name',
        bankaccount: 'Bank Account',
        hbank: 'Bank Name',
        bbank: 'Bank Branch Name',
        bankProvice: 'Provice',
        bankCity: 'City',
        code: 'Swift Code',
        mobile: 'Mobile Number',
        banktype: 'Account Type',
        doc: 'Documents', // 上传凭证，
        idfront: 'Click to add a legal person id card frontage.',
        idback: 'Click to add a legal person id card backside.',
        oper: 'Click to add business license photos.', // 点击添加营业执照照片
        lic: 'Click to add license photos.', // 点击添加开户许可照片
        org: 'Click to add organization photos.', // 点击添加组织机构照片
        protocol: 'Click Add merchant agreement photos', // 点击添加商户协议照片
        warmfront: '* Second-generation ID cards must be used within the validity period. ID card numbers and avatars are clearly visible and full ID cards are photographed.', // 必须使用有效期内的二代身份证，身份证号码及头像清晰可见，完整身份证正面照
        warmback: '* It is necessary to use the two generation ID card within the validity period. The validity period is clearly visible. The reverse of the complete identity card is used.', // 必须使用有效期内的二代身份证，有效期清晰可见，完整身份证反面照
        warmoper: '* It is necessary to use the business license within the validity period. The documents need to be complete and clearly visible.', // 必须使用有效期之内的营业执照，需要证件完整且文字清晰可见
        warmlic: '* Please upload valid license photos to ensure that the picture is clear and content is complete.', // 请上传有效的开户许可证照片，保证画面清晰，内容完整
        warmorg: '* Please upload valid organization photos to ensure that the picture is clear and content is complete.', // 请上传有效的组织机构照片，保证画面清晰，内容完整
        warmproto: '* Please upload valid business agreement photos to ensure that the picture is clear and content is complete.', // 请上传有效的商户协议照片，保证画面清晰，内容完整
      },
      rule1: 'Please choose registered merchants.', // 请选择注册商户
      rule2: 'Please enter the name of the merchant.', // 请输入商户名称
      rule3: 'Please enter company name.', // 请输入公司名称
      rule4: 'Please input the correct email address.', // 请输入正确的邮箱地址
      rule5: 'Bank card accounts must be numbers.', // 银行卡账户必须是数字
      rule6: 'Phone numbers must be numbers.', // 手机号必须是数字
      rule7: 'Please enter business account number.', // 请输入业务员账号
      rule8: 'Uploading avatars must be JPG / PNG format', // 上传头像必须是jpg、png格式
      rule9: 'Please enter chain store UID', // 请输入连锁店总店UID
      rule10: 'Only 60 characters can be entered at most.'
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
      doit: 'Audit',
      pass: 'Pass',
      re: 'Reject',
      msg1: 'Please input audit notes.'
    }
  },
  trade: {
    detail: 'Transaction details',
    total: 'Transaction statistics',
    common: {
      tradeDate: 'Transaction Date',
      tradeTime: 'Transaction Time',
      sNum: 'Transaction ID',
      tradeType: 'Transaction Type',
      payPass: 'Payment Gateway',
      merchantName: 'Merchant Name',
      firstAgent: 'First Level Agent',
      secondAgent: 'Second Level Agent',
      wechat: 'WeChat pay',
      alipay: 'Alipay',
      pay: 'Payment',
      refund: 'Refund',
      success: 'Success',
      failed: 'Fail',
      fee: 'MDR Fee',
      payTrade: 'Payment',
      refundTrade: 'Refund',
      tradeAmount: 'Transaction Amount',
      tradeCount: 'Entries',
      refundAmount: 'Total Amount',
      refundCount: 'Entries',
      amount: 'Total Amount',
      count: 'Entries',
      pleaseSelect: 'Please choose',
      noData: 'No data'
    }
  },
  agent: {
    agentName: 'Agent Name',
    agentId: 'Agent ID',
    agentLevel: 'Agent Level',
    level: 'Level',
    level1: 'Class A',
    level2: 'Second level',
    agentLevel1: 'First level agent',
    agentLevel2: 'Two level agent',
    leaderAgent: 'Superior Agent Name',
    registerTime: 'Registration Time',
    agentNickname: 'Enterprise Abbreviation',
    agentArea: 'Area',
    address: 'Enterprise Address',
    contact: 'Business Contact',
    legal: 'Enterprise Legal Person',
    contactMobile: 'Contact Number',
    legalMobile: 'Legal person phone',
    saleMan: 'Salesman',
    belongSaleMan: 'Salesman',
    username: 'Login account',
    canuse: 'Can be registered',
    password: 'Login password',
    bankuser: 'Bank Account Name',
    bankaccount: 'Settlement Account',
    headbankname: 'Bank Name',
    bankname: 'Bank Branch Name',
    bankcode: 'Swift Code',
    wechat: 'Wechat',
    alipay: 'Alipay',
    agentDetail: 'Agent details',
    baseInfo: 'Essential information',
    settleInfo: 'Clearing information',
    payRate: 'Payment rate',
    wechatRate: 'WeChat rate',
    alipayRate: 'Alipay rates',
    agentList: 'List of agents',
    agentAdd: 'Add agent',
    agentEdit: 'Modifying agents',
    agentBelong: 'Subordinate agent',
    pleaseEnter: 'Please Enter ',
    pleaseSelect: 'Please choose ',
    onlyLetterNumber: 'Numeric and alphabet only',
    isRegistered: 'This account has been registered'
  },
  role: {
    role: '权限',
    roleManage: '角色管理',
    createRole: '新建角色',
    editRole: '修改角色',
    roleDetail: '角色详情',
    roleName: '角色名称',
    roleStatus: '角色状态',
    pleaseEnter: '请输入',
    createTime: '创建时间',
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
