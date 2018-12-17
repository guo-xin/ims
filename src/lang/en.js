
'use strict';
import enLocale from 'qfpay-element-ui/lib/locale/lang/en'

const en = {
  ...enLocale,
  common: {
    title: 'INSTITUTION MANAGEMENT SYSTEM',
    all: 'All',
    create: 'Create',
    export: 'Export',
    choose: 'Please choose',
    save: 'Save',
    submit: 'Submit',
    MINRatio: 'Minimum rate is ',
    edit: 'Edit',
    prev: 'Previous',
    next: 'Next step',
    done: 'Carry out',
    close: 'Close',
    search: 'Search',
    audit: 'Under Approval',
    refuse: 'Reject',
    add: 'Add',
    reset: 'Reset',
    loading: 'Loading...',
    netError: 'Net error',
    createSuccess: 'Created successfully',
    updateSuccess: 'Successfully modified',
    opSucc: 'Successful operation',
    opFailed: 'Operation failed',
    operate: 'Operation',
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
    uploadFailed: 'Upload failure',
    CLOSE: 'CLOSE',
    SAVE: 'SAVE',
    EDIT: 'EDIT'
  },
    home: {
      all: 'All',
      title: 'Homepage',
      amt: 'Transaction Amount',
      cnt: 'Total Transactions',
      curamt: 'Current Transaction Amount',
      curcnt: 'Current Total Transactions',
      curnewmchnt: 'Current New Merchants',
      curnewstore: 'Current New Stores',
      nodata: 'No Data Available',
      curve: {
        title: 'Trend Chart Of Transaction',
      },
      bar: {
        title: 'Trend Chart Of Merchants Trading',
        legend: {
          mer: 'merchant',
          submer: 'submerchant'
        }
      },
      pie: {
        title: 'Analysis Of Channel Trading'
      },
      cumu: {
        title: 'Analysis oOff The Accumulated Data',
        totle_mount: 'Total Transaction Amount',
        totle_count: 'Total Transactions',
        totle_mchnt_num: 'Total Number Of Merchants',
        totle_store_num: 'Total Number Of Stores',
        totle_agent_num: 'Total Number Of Agents'
      }
    },
  authority: {
    crumbs: {
      T1: 'Account Management',
      T2: 'Authority Management'
    },
    panel: {
      userName: 'User Name',
      roleName: 'Role Name',
      state: 'Status',
      open: 'Enable',
      close: 'Disable'
    },
    table: {
      role: 'Role',
      account: 'Account',
      rTime: 'Registration Time'
    },
    dialog: {
      title1: 'New Users',
      title2: 'User Details',
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
      T1: 'Clearing Detail',
      T2: 'Clearing Summary',
      T3: 'Clearing Template',
      T4: 'Clearing Tonfiguration',
      T5: 'Add a clearing template',
      T6: 'Edit clearing template',
      T7: 'Clear template details',
    },
    btn: {
      add: 'Add',
      set: 'Configuration'
    },
    panel: {
      orderNo: 'Order Number',
      tradeTime: 'Transaction Date',
      settleType: 'Settlement Type',
      settleName: 'Settlement Party',
      payType: 'Payment Types',
      settleDetail: 'Settlement Account',
      settlePass: 'Settlement Channel',
      modeName: 'Template Name',
      createTime: 'Creation Time',
      agentName: 'Agency Name',
      payPass: 'Payment Channel',
      effectTime: 'Effective Date',
      passCost: 'Channel Cost',
      staticAmount: 'Fixed Amount',
      percent: 'Percentage',
      noEffect: 'Not enabled',
      day: 'Daily',
      week: 'Weekly',
      month: 'Monthly',
      singleAmount: 'Single Amount',
      settleCircle: 'Billing Cycle',
      floorType: 'Ladder Type',
      floorCount: 'Ladder Type',
      yes: 'Yes',
      no: 'No'
    },
    table: {
      sNum: 'Serial Number',
      merName: 'Business Name',
      shopName: 'Store Name',
      tradeAmount: 'Trans Amount',
      settlePercent: 'Clearing Ratio',
      settleAmount: 'Clearing Amount',
      count: 'Entries',
      order: 'Seq',
      passName: 'Channel Name',
      tradeNum: 'Number Of Transactions',
      lastTime: 'Last Update Time',
      isMode: 'Default Template',
      province: 'Province',
      city: 'City',
      address: 'Address',
      phone: 'Telephone Number',
      countRules: 'Calculation Formula',
      isSettle: 'Yes / No Settlement',
      agent: 'Mechanism',
      firstAgent: 'Primary Agent',
      secondAgent: 'Secondary Agent',
      income: 'Income',
      expend: 'Expenditure',
      merchantRate: 'Merchant Rate',
      headCost: 'Headquarters Cost',
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
      date: 'Configuration Date',
      mode: 'Clearing Template'
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
    nameph: 'UserName Or E-mail',
    passph: 'Password',
    desc: 'We handle billions of dollars every year for forward-thinking businesses in the world',
    cap1: 'INSTITUTION',
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
      detail: 'Detail',
      mchtid: 'Merchant ID',
      mchtname: 'Merchant Name',
      address: 'Address',
      mobile: 'Contact Number',
      agent1: 'Agent Name',
      agent2: '2nd-tier Agent',
      account: 'Account Name',
      industry: 'Industry',
      merstatus: 'Merchant Status',
      state: 'Status',
      store: 'Store',
      payment: 'Payment Setting',
      pid: 'Alipay service provider ID',
      wechatM: 'WeChat official account ID',
      wechatpay: 'WeChat Pay'
    },
    payment: {
      configured: "Configured",
      nonconfigured: "Non-configured",
      radio1: 'First clean',
      radio2: 'Second clean',
      merchantID2: 'Trade Name of Service',
      merchChildID2: 'Channel Sub-Merchant No.',
      merchantID1: 'Merchant No.',
      merchChildID1: 'Sub-Merchant No.',
      merchantPass1: 'Merchant key'

    },
    detail: {
      up: 'Activate',
      down: 'Deactivate',
      refuse: 'Reject',
      audit: 'Under Approval',
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
        paymenttitle: 'Payment Channels Info',
        bd: 'Description:',
        la1: 'Channels Belongs:',
        la2: 'Agent Name:',
        la3: 'Merchant Name:',
        la4: 'Merchant Category:',
        la5: 'Industry:',
        la6: 'Status:',
        la7: 'Contact Name:',
        la8: 'Telephone:',
        la9: 'Certificate Type:',
        la10: 'Certificate Number:',
        la11: 'Post Code:',
        la12: 'Address:',
        la13: 'BR Number:',
        la14: 'BR Validity:',
        la15: 'CI Number:',
        la16: 'CI Validity:',
        la17: 'Account Name:',
        la18: 'Bank Name:',
        la19: 'Bank Account:',
        la20: 'Bank Address:',
        la21: 'Starting Point of Settlement Fund:'
      },
      shop: {
        subtitle: 'Shop Info',
        la1: 'Merchant Name:',
        la2: 'Address:',
        la3: 'Uploaded Photos:'
      },
      rates: {
        setitle: 'Billing Info',
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
      edit: 'Edit',
      document: {
        doctitle: 'Licence Info'
      },
    },
    newMerchant: {
      title1: 'Create Merchant',
      title2: 'Modify Merchant',
      step1: 'Basic Info',
      step2: 'MDR Info',
      step3: 'Company Info',
      basic: {
        cap1: 'Basic Info',
        cap2: 'Payment Channels Info',
        cap3: 'Billing Info',
        cap4: 'Store license'
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
        chain: 'Branch Store',
        micro: 'Small and micro enterprises',
        geti: 'Individual Company',
        ent: 'Enterprises',
        main: 'Main Store UID',
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
        status: 'Status',
        sub: 'Merchant',
        big: 'Big Merchant',
        saleMan: 'Agent Name',
        channel: '1st-tier Agent',
        channel2: '2st-tier Agent',
        mertype: 'Merchant Category',
        meiname: 'Merchant Name',
        contact: 'Agent Name',
        postT: 'Post Code',
        concatName: 'Contact Name',
        concatNumber: 'Telephone',
        documentType: 'Certificate Type',
        doucumentNum: 'Certificate Number',
        industry: 'Industry',
        addressT: 'Address',
        accountName: 'Account Name',
        accountType: 'Bank Name',
        accountH: 'Bank Account',
        accountAddress: 'Bank Address',
        moneySettment: 'Starting Point of Settlement Fund',
        storeAddress: 'Address',
        storephone: 'Store Contact Number',
        BRnumber: 'BR Number',
        BRvality: 'BR Validity',
        CInumber: 'CI Number',
        CIvality: 'CI Validity',
      },
      requiredRule: {
        rule1: 'Please select Agent Name',
        rule2: 'Please input Merchant Category',
        rule3: 'Please input Merchant Name',
        rule4: 'Please input Post Code',
        rule5: 'Please input Contact Name',
        rule6: 'Please input Telephone',
        rule7: 'Please select Certificate Type',
        rule8: 'Please input Certificate Number',
        rule9: 'Please select Industry',
        rule10: 'Please input Merchant Adress',
        rule11: 'Please input BR Number',
        rule12: 'Please input BR Validity',
        rule13: 'Please input CI Number',
        rule14: 'Please input CI Validity',
        rule15: 'Please input Bank Name',
        rule16: 'Please input Account Name',
        rule17: 'Please input Bank Account',
        rule18: 'Please input Bank Address',
        rule19: 'Please input Starting Point of Settlement Fund',
        rule20: 'Please input Store Name',
        rule21: 'Please input Store Address',
        rule22: 'Please input Store Telephone',
        rule23: 'Please input Store Hours',
      },
      lengthRule: {
        rule1: 'The maxlength is 4',
        rule2: 'The maxlength is 5',
        rule3: 'The maxlength is 8',
        rule4: 'The maxlength is 10',
        rule5: 'The maxlength is 12',
        rule6: 'The maxlength is 15',
        rule7: 'The maxlength is 25',
        rule8: 'The maxlength is 50'
      },
      specialRule: {
        rule1: 'Incorrect format',
        rule2: 'Type is required number'
      },
      doctype: {
        type1: 'Passport',
        type2: 'Hong Kong and Macao pass',
        type3: 'Hong Kong Resident Card'
      },
      picture: {
        idcardfront: 'Front of ID Card',
        licensephoto: 'Business license',
        goodsphoto: 'Inside-view Photos of Business Premises',
        shopphoto: 'Outdoor Photos of Business Places',
        paypoint: 'Cashier Photo',
        otherphoto: 'Other Photos'
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
      rule42: 'Please input a valid website',
      rule43: 'Please select salesperson'
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
        la11: 'Photograph:'
      },
      edit: 'Edit'
    },
    newStore: {
      title1: 'Create Store',
      title2: 'Edit Store',
      model: {
        storename: 'Store Name',
        storeaddress: 'Store Address',
        mobile: 'Contact Number',
        operation: 'Business Hours'
      },
      rule1: 'Please input the name of store',
      rule2: 'Please input the address of store',
      rule3: 'Please input contact number',
      rule4: 'Please input the business hours',
      casher: 'Click to add a photo of the checkout counter',
      warmcasher: 'Please upload a photo of the checkout counter',
      mustcasher: '* You must upload a photo of the checkout counter',
      other: 'Click to add a photo of supplementary information',
      warmother: ''
    }
  },
  audit: {
    title: 'Audit Management',
    form: {
      mchtid: 'Merchant ID',
      audit_state: 'Audit Status',
      memo: 'Remark'
    },
    table: {
      cate: 'Type of Merchants',
      status: 'Audit Status'
    },
    deny: 'Rejection',
    succ: 'Success',
    fail: 'Failure',
    going: 'Under Approval',
    detail: {
      title: 'Approved Memo',
      storeInfo: {
        title: 'License of Store',
        storename: 'Store Name',
        storeaddr: 'Store Address',
        storetel: 'Contact Number',
        opertime: 'Business Hours'
      },
      table: {
        creator: 'Operator ID',
        create_date: 'Audit Date',
        result: 'Audit Result',
        memo: 'Remark'
      },
      doit: 'Audit',
      pass: 'Pass',
      re: 'Reject',
      msg1: 'Please input audit comments.',
      done: 'Audit Completion.'
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
      cap1: 'Merchant\'s Data',
      cap2: 'Merchant\'s Photo'
    },
    up: {
      excel: 'Upload Excel',
      zip: 'Upload Photo Zip'
    },
    commit: 'Commit',
    rule1: 'Please upload merchant\'s data.',
    rule2: 'Please upload merchant\'s photo.',
    manual1: '1. Please download template《batch merchants on-boarding.xlsx》and fill in all necessary infos of on-boarding merchants.',
    manual2: '2. There are two photo attachments one is for inner goods another for outside shop each need to be stored in a separated folder. The photo attachments need to be uploaded on folder level through compression mode individually. The criteria of photo naming is: contact number-goodsphoto.jpg and contact number-shopphoto.jpg as a example in template, it should be 18203556822-goodsphoto.jpg and 18203556822-shopphoto.jpg.',
    manual3: '3. The folder naming should be the same as before and after compression, please revise the folder naming after then compress again if it is necessary to revise the compressed file name.'
  },
  trade: {
    detail: 'Transaction Detail',
    total: 'Transaction Summary',
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
      wechat: 'WeChat Pay',
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
    level1: '1st-tier Agent',
    level2: '2nd-tier Agent',
    agentLevel1: '1st-tier Agent',
    agentLevel2: '2nd-tier Agent',
    leaderAgent: 'Superior Agent Name',
    registerTime: 'Registration Time',
    agentNickname: 'Enterprise Abbreviation',
    agentArea: 'Area',
    address: 'Enterprise Address',
    contact: 'Business Contact',
    legal: 'Enterprise Legal Person',
    contactMobile: 'Contact Number',
    legalMobile: 'Legal Person Phone',
    saleMan: 'Salesman',
    belongSaleMan: 'Salesman',
    username: 'Login Account',
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
    agentList: 'Agent List',
    agentAdd: 'Add Agent',
    agentEdit: 'Modifying Agents',
    agentBelong: 'Subordinate Agent',
    pleaseEnter: 'Please Enter ',
    pleaseSelect: 'Please Choose ',
    onlyLetterNumber: 'Numeric and alphabet only',
    isRegistered: 'This account has been registered'
  },
  role: {
    role: 'Permission',
    roleManage: 'Label Management',
    createRole: 'New Role',
    editRole: 'Modify Role',
    roleDetail: 'Role Details',
    roleName: 'Role Name',
    roleStatus: 'Role Status',
    pleaseEnter: 'please enter',
    createTime: 'Creation Time',
  },
  main: {
    desc: 'INSTITUTION MANAGEMENT SYSTEM',
    roles: [
      ''
    ],
    logout: 'Logout'
  }
}
export default en;
