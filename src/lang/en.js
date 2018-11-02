
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
    next: 'Next step',
    done: 'Carry out',
    close: 'Close',
    search: 'Search',
    add: 'Add',
    reset: 'Reset',
    loading: 'Loading...',
    netError: 'Net error',
    createSuccess: 'Created successfully',
    updateSuccess: 'Successfully modified',
    opSucc: 'Successful operation',
    opFailed: 'Operation failed',
    operate: 'operation',
    delete: 'Delete',
    look: 'View',
    range: 'Select date range',
    confirm: 'Determine',
    cancel: 'Cancel',
    tip: 'Prompt',
    status: 'Status',
    enable: 'Enable',
    disable: 'Disable',
    startTime: 'Starting time',
    endTime: 'End time',
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
      T2: 'Authority management'
    },
    panel: {
      userName: 'User name',
      roleName: 'Role name',
      state: 'Status',
      open: 'Enable',
      close: 'Disable'
    },
    table: {
      role: 'Role',
      account: 'Account',
      rTime: 'Registration time'
    },
    dialog: {
      title1: 'New users',
      title2: 'User details',
      pwd: 'Password',
      tp1: 'Please enter a username',
      tp2: 'Please enter a role name',
      tp3: 'Please enter an account',
      tp4: 'Enter up to 30 characters',
      tp5: 'Please enter your password',
      tp6: 'Please select a status'
    }
  },
  settleMent: {
    crumbs: {
      T1: 'Clearing details',
      T2: 'Clearing summary',
      T3: 'Clearing template',
      T4: 'Clearing configuration',
      T5: 'Add a clearing template',
      T6: 'Edit clearing template',
      T7: 'Clear template details',
    },
    btn: {
      add: 'Add',
      set: 'Configuration'
    },
    panel: {
      orderNo: 'Order number',
      tradeTime: 'Date of transaction',
      settleType: 'Settlement type',
      settleName: 'Settlement party',
      payType: 'Payment Types',
      settleDetail: 'Settlement account',
      settlePass: 'Settlement channel',
      modeName: 'Template Name',
      createTime: 'Creation time',
      agentName: 'Agency name',
      payPass: 'Payment channel',
      effectTime: 'Effective date',
      passCost: 'Channel cost',
      staticAmount: 'Fixed amount',
      percent: 'Percentage',
      noEffect: 'Not enabled',
      day: 'Day knot',
      week: 'Zhou Jie',
      month: 'Monthly',
      singleAmount: 'Single amount',
      settleCircle: 'Billing cycle',
      floorType: 'Ladder type',
      floorCount: 'Ladder type',
      yes: 'Yes',
      no: 'No'
    },
    table: {
      sNum: 'serial number',
      merName: 'Business Name',
      shopName: 'Store name',
      tradeAmount: 'Amount of the transaction',
      settlePercent: 'Clearing ratio',
      settleAmount: 'Clearing amount',
      count: 'Entries',
      order: 'Sequence',
      passName: 'Channel name',
      tradeNum: 'Number of transactions',
      lastTime: 'Last update time',
      isMode: 'Default template',
      province: 'Province',
      city: 'City',
      address: 'Address',
      phone: 'Telephone number',
      countRules: 'Calculation formula',
      isSettle: 'Yes / no settlement',
      agent: 'Mechanism',
      firstAgent: 'Primary agent',
      secondAgent: 'Secondary agent',
      income: 'Income',
      expend: 'Expenditure',
      merchantRate: 'Merchant rate',
      headCost: 'Headquarters cost',
      firstCost: 'First Level Agent Rate',
      secondCost: 'Second Level Agent Rate',
      startVal: 'Initial Value',
      endVal: 'End Value',
      firstRate: 'First Level Agent Rate',
      secondRate: 'Second Level Agent Rate',
      modeState: 'Status',
      state: 'Status',
      open: 'Enable',
      close: 'Disable'
    },
    dialog: {
      date: 'Configuration date',
      mode: 'Clearing template'
    },
    msg: {
      t1: 'Please enter a template name',
      t2: 'Enter up to 20 characters',
      t3: 'Please enter a single amount',
      t4: 'Please enter a positive number',
      t5: 'Up to two after the decimal point',
      t6: 'Please select a single amount condition',
      t7: 'Please select a payment channel',
      t8: 'Please select a billing cycle',
      t9: 'Please select channel cost',
      t10: 'Please enter the channel cost',
      t11: 'Whether to confirm the deletion of the clearing template?',
      t12: 'Please enter a starting value',
      t13: 'Please enter the termination value',
      t14: 'Please enter a level of agency rate',
      t15: 'Please enter the secondary agent rate',
      t16: 'The number of transactions is a positive integer',
      t17: 'The starting value cannot be greater than the ending value',
      t18: 'Please enter the billing party name',
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
      agent1: 'Agent L1',
      agent2: 'Agent L2',
      ph: 'Please choose the L1 agent first.',
      audit_state: 'Audit State'
    },
    table: {
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      address: 'Address',
      mobile: 'Mobile',
      agent1: 'Agent L1',
      agent2: 'Agent L2',
      account: 'User Name',
      cate_code: 'Category',
      state: 'State'
    },
    detail: {
      cate: {
        merchant: 'Merchant',
        big: 'Big-merchant',
        sub: 'Sub-merchant'
      },
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
        subtitle: 'Rates Info',
        wechat: 'WeChat Pay:',
        ali: 'Alipay:'
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
        type: 'Industry',
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
      rule5: 'Bank card accounts must be number.', // 银行卡账户必须是数字
      rule6: 'Phone numbers must be number.', // 手机号必须是数字
      rule7: 'Please enter business account.', // 请输入业务员账号
      rule8: 'Uploading file must be JPG/PNG format', // 上传凭证必须是jpg、png格式
      rule9: 'Please enter chain store UID', // 请输入连锁店总店UID
      rule10: 'Only 60 characters can be entered at most.'
    }
  },
  shop: {
    title: 'Shop Management',
    create: 'Create',
    query: 'Query',
    reset: 'Reset',
    patchImport: 'Batch Creation',
    form: {
      mchntid: 'Merchant ID',
      mchntname: 'Merchant Name',
      submchntid: 'Shop ID',
      sunmchntname: 'Shop Name'
    },
    table: {
      submchntid: 'Shop ID',
      sunmchntname: 'Shop Name',
      mchntid: 'Merchant ID',
      mchntname: 'Merchant Name',
      address: 'Address',
      telephone: 'Contact Number',
      location: 'Location',
      post: 'Postal Code',
      operating: 'Operating Hours'
    },
    detail: {
      cate: {
        merchant: 'Merchant',
        big: 'Big-merchant',
        sub: 'Sub-merchant'
      },
      basic: {
        title: 'Detail Shop',
        close: 'Close',
        subtitle: 'Basic Information',
        la1: 'Merchant Name:',
        la2: 'Account number:',
        la3: 'Shop Name:',
        la4: 'Contact Number:',
        la5: 'Location:',
        la6: 'Address:',
        la7: 'Postal Code:',
        la8: 'Operating Hours:',
        la9: 'Additional Services:',
        la10: 'Website URL(if available):',
        la11: 'Photograph'
      },
      shop: {
        subtitle: 'Shop Info',
        la1: 'Name of Shop:',
        la2: 'Address:',
        la3: 'Photograph:'
      },
      rates: {
        subtitle: 'Rates Info',
        wechat: 'WeChat Pay:',
        ali: 'Alipay:'
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
        type: 'Industry',
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
      rule5: 'Bank card accounts must be number.', // 银行卡账户必须是数字
      rule6: 'Phone numbers must be number.', // 手机号必须是数字
      rule7: 'Please enter business account.', // 请输入业务员账号
      rule8: 'Uploading file must be JPG/PNG format', // 上传凭证必须是jpg、png格式
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
      inSameMonth: 'Transaction detail can only be queried within the same month',
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
    role: 'Permission',
    roleManage: 'Role management',
    createRole: 'New role',
    editRole: 'Modify role',
    roleDetail: 'Role details',
    roleName: 'Role Name',
    roleStatus: 'Role status',
    pleaseEnter: 'please enter',
    createTime: 'Creation time',
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
