
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
      sNum: 'Serial number',
      merName: 'Business name',
      shopName: 'Store name',
      tradeAmount: 'Trans amount',
      settlePercent: 'Clearing ratio',
      settleAmount: 'Clearing amount',
      count: 'Entries',
      order: 'Seq',
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
    title: 'Merchant Management',
    create: 'Create',
    query: 'Query',
    reset: 'Reset',
    patchImport: 'Batch Create',
    form: {
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      agent1: '1st-tier Agent',
      agent2: '2nd-tier Agent',
      ph: 'Please select 1st-tier agent first.',
      audit_state: 'Merchant Status'
    },
    table: {
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      address: 'Address',
      mobile: 'Contact Number',
      agent1: 'Agent Name',
      agent2: '2nd-tier Agent',
      account: 'Account Name',
      industry: 'Industry',
      state: 'Status',
      store: 'Shop'
    },
    detail: {
      up: 'Activate',
      down: 'Deactivate',
      redit: 'Continue To Edit',
      cate: {
        merchant: 'Merchant',
        big: 'Chain Merchant',
        sub: 'Sub-merchant'
      },
      signed: {
        yes: 'Yes',
        no: 'No'
      },
      p: {
        m: 'Monthly',
        w: 'Weekly',
        d: 'Daily'
      },
      basic: {
        title: 'Detail Info',
        close: 'Close',
        subtitle: 'Basic Info',
        bd: 'Description',
        la1: 'Merchant Category:',
        la2: 'Industry:',
        la3: 'Merchant Name:',
        la4: 'Agent Name:',
        la5: 'Address:',
        la6: 'Sales Rep.:',
        la7: 'Contact Name:',
        la8: 'E-mail Address:',
        la9: 'Status:',
        la10: 'Established Date:',
        la11: 'Company Name:',
        la12: 'Address:',
        la13: 'Area:',
        la14: 'Post Code:',
        la15: 'Agreement Signed (Yes/No):',
        la16: 'Settlement Period:',
        la17: 'Sales Contact Number:',
        la18: 'Contact Number:',
        la19: 'Business Registration Number (UEN):'
      },
      shop: {
        subtitle: 'Shop Info',
        la1: 'Merchant Name:',
        la2: 'Address:',
        la3: 'Uploaded Photos:'
      },
      rates: {
        subtitle: 'MDR Info',
        wechat: 'MDR:',
        ali: 'Alipay:'
      },
      pay: {
        subtitle: 'Company Info',
        la1: 'Bank Account Name:',
        la2: 'Bank Account Number:',
        la3: 'Bank Name:',
        la4: 'Branch Name:',
        la5: 'Province Bank:',
        la6: 'Swift Code:',
        la7: 'City Bank:',
        la8: 'Contact Number:',
        la9: 'Account Type:',
        la10: 'Uploaded Photos:'
      },
      edit: 'Edit'
    },
    newMerchant: {
      title1: 'Create Merchant',
      title2: 'Modify Merchant',
      step1: 'Basic Info',
      step2: 'MDR Info',
      step3: 'Company Info',
      basic: {
        cap1: 'Basic Info',
        cap2: 'MDR Info',
      },
      form: {
        escrow: 'Agent',
        address: 'Address',
        timeformat: 'HH:MM - HH:MM',
        is_contract: 'Agreement Signed (Yes/No)',
        cf: 'Please confirm',
        period: 'Settlement Period',
        ratio: 'MDR',
        account: 'Account',
        shopname: 'Merchant Name',
        name: 'Company Name',
        licensenumber: 'Business Registration Number',
        legal: 'Contact Name',
        location: 'Area',
        loc1: 'Singapore',
        loc2: 'Malaysia',
        storeaddr: 'Store Address',
        email: 'E-mail Address',
        post: 'Post Code',
        cate: 'Merchant Category',
        scale: 'Store Type',
        type1: 'Industry',
        type2: 'Merchant Status',
        bd: 'Description',
        sub: 'Merchant',
        big: 'Chain Merchant',
        chain: 'Branch Store',
        micro: 'Small and micro enterprises',
        geti: 'Individual Company',
        ent: 'Enterprises',
        main: 'Main Store UID',
        contact: 'Sales Rep.',
        storephone: 'Store Contact Number',
        storelocation: 'Store Area',
        storeaddress: 'Store Address',
        storepost: 'Store Post Code',
        storename: 'Store Name',
        addition: 'Additional Services',
        storeoperating: 'Business Hours',
        website: 'Website',
        cell: 'Contact Number',
        wei: 'WeChat Pay:',
        ali: 'Alipay:',
        rate: 'MDR',
        bankuser: 'Bank Account Name',
        bankaccount: 'Bank Account Number',
        hbank: 'Bank Name',
        bbank: 'Branch Name',
        bankProvice: 'Provice',
        bankCity: 'City',
        code: 'Swift Code',
        mobile: 'Mobile Number',
        banktype: 'Account Type',
        doc: 'Store Info', // 店铺信息
        idfront: 'Click to add store photo (indoor).',
        idback: 'Click to add store photo (outdoor).',
        warmfront: '* The photo has to be from inside of the store.', // 必须使用所售商品/经营场所内景照片
        warmback: '* The photo has to be from outside of the store.', // 必须使用经营场所/经营场所外景照片
      },
      rule1: 'Please select merchant category', // 请选择注册商户
      rule2: 'Please input merchant name', // 请输入商户名称
      rule3: 'Please input company name', // 请输入公司名称
      rule4: 'Please input a valid e-mail address', // 请输入正确的邮箱地址
      rule5: 'Numbers only for bank account', // 银行卡账户必须是数字
      rule6: 'Numbers only for mobile number', // 手机号必须是数字
      rule7: 'Please input sales rep. account', // 请输入业务员账号
      rule8: 'Uploaded files should be JPG/PNG format', // 上传凭证必须是jpg、png格式
      rule9: 'Please input master merchant UID', // 请输入连锁店总店UID
      rule10: 'Please input 60 characters at most.', // 最多输入60个字符
      rule11: 'Please select sales rep', // 请选择业务员
      rule12: 'Please input account', // 请输入账号
      rule13: 'MDR should be larger than ',
      rule14: 'Please input business registration number', // 请输入营业执照号
      rule15: 'Please select area', // 请选择公司所属地区
      rule16: 'Please input company address', // 请输入公司地址
      rule17: 'Please input company contact name', // 请输入公司联系人
      rule18: 'Please input bank name', // 请输入总行名称
      rule19: 'Please input SWIFT code', // 请输入SWIFT代码
      rule20: 'Please input bank account name', // 请输入银行帐户名称
      rule21: 'Please input store name', // 请输入店铺名称
      rule22: 'Please input store contact number', // 请输入店铺联系电话
      rule23: 'Please select area', // 请选择店铺所属地区
      rule24: 'Please input store address', // 请输入店铺地址
      rule25: 'Please input post code', // 请输入店铺邮编
      rule26: 'Please input store services', // 请输入店铺附加服务
      rule27: 'Please input business hours', // 请输入店铺营业时间
      rule28: 'Please upload photos from inside of store', // 请上传所售商品/经营场所内景照片
      rule29: 'Please upload photos from outside of store', // 请上传经营场所/经营场所外景照片
      rule30: 'Please input e-mail address', // 请输入邮箱
      rule31: 'Uploaded file must be Excel format',
      rule32: 'Please input bank account number',
      rule33: 'Uploaded file must be ZIP package',
      rule34: 'Please input description',
      rule35: 'Please input contact number',
      rule36: 'Please input postal code',
      rule37: 'Please input branch bank name',
      rule38: 'Please select industry',
      rule39: 'Please confirm whether the agreement was signed',
      rule40: 'Please select settlement period',
      rule41: 'Please input website',
      rule42: 'Please input a valid website'
    }
  },
  shop: {
    title: 'Store Management',
    create: 'Create',
    query: 'Query',
    reset: 'Reset',
    patchImport: 'Batch Creation',
    form: {
      mchntid: 'Merchant ID',
      mchntname: 'Merchant Name',
      submchntid: 'Store ID',
      sunmchntname: 'Store Name'
    },
    table: {
      submchntid: 'Store ID',
      sunmchntname: 'Store Name',
      mchntid: 'Merchant ID',
      mchntname: 'Merchant Name',
      address: 'Address',
      telephone: 'Contact Number',
      location: 'Area',
      post: 'Store Post Code',
      operating: 'Business Hours'
    },
    detail: {
      cate: {
        merchant: 'Merchant',
        big: 'Chain Merchant',
        sub: 'Branch Merchant'
      },
      basic: {
        title: 'Store Detail',
        close: 'Close',
        subtitle: 'Basic Info',
        la1: 'Merchant Name:',
        la2: 'Account Number:',
        la3: 'Store Name:',
        la4: 'Store Contact Number:',
        la5: 'Store Area:',
        la6: 'Store Address:',
        la7: 'Store Post Code:',
        la8: 'Business Hours:',
        la9: 'Additional Services:',
        la10: 'Website:',
        la11: 'Photograph'
      },
      shop: {
        subtitle: 'Store Info',
        la1: 'Store Name:',
        la2: 'Address:',
        la3: 'Photograph:'
      },
      rates: {
        subtitle: 'MDR Info',
        wechat: 'WeChat Pay:',
        ali: 'Alipay:'
      },
      pay: {
        subtitle: 'Payment Info',
        la1: 'Bank Account Name:',
        la2: 'Bank Account Number:',
        la3: 'Bank Name:',
        la4: 'Branch Bank Name:',
        la5: 'Province Bank:',
        la6: 'Swift Code:',
        la7: 'City Bank:',
        la8: 'Mobile:',
        la9: 'Bank Type:',
        la10: 'Photograph:'
      },
      edit: 'Edit'
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
  batch: {
    title: 'Batch Creation',
    t1: 'Batch Creation',
    tip: {
      txt: '* Please follow up the template to upload merchants data to take',
      ins: '《batch registration procedure》',
      template: '《batch merchants on-boarding.xlsx》',
      and: 'and',
      title: 'Tip',
      close: 'Close'
    },
    cap: 'Batch Creation',
    input: {
      cap1: 'Merchants Data',
      cap2: 'Merchant\'s Photo'
    },
    up: {
      excel: 'Upload Excel',
      zip: 'Upload Photo Zip'
    },
    commit: 'Commit',
    rule1: 'Please upload necessary information.',
    rule2: 'Please upload auxiliary information.',
    manual1: '1. Please download template《batch merchants on-boarding.xlsx》and fill in all necessary infos of on-boarding merchants.',
    manual2: '2. There are two photo attachments one is for inner goods another for outside shop each need to be stored in a separated folder. The photo attachments need to be uploaded on folder level through compression mode individually. The criteria of photo naming is: contact number-goodsphoto.jpg and contact number-shopphoto.jpg as a example in template, it should be 18203556822-goodsphoto.jpg and 18203556822-shopphoto.jpg.',
    manual3: '3. The folder naming should be the same as before and after compression, please revise the folder naming after then compress again if it is necessary to revise the compressed file name.'
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
