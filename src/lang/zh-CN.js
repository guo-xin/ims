'use strict';
import zhLocale from 'qfpay-element-ui/lib/locale/lang/zh-CN'

const zh = {
  ...zhLocale,
  common: {
    all: '全部',
    create: '创建',
    export: '导出',
    choose: '请选择',
    submit: '提交',
    MINRatio: '最低费率',
    save: '保存',
    edit: '修改',
    prev: '上一步',
    next: '下一步',
    done: '完成',
    close: '关闭',
    search: '查找',
    add: '增加',
    reset: '重置',
    loading: '拼命加载中',
    netError: '请求失败',
    createSuccess: '创建成功',
    updateSuccess: '修改成功',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: '操作',
    delete: '删除',
    look: '查看',
    detail: '详情',
    range: '选择时间范围',
    chooseDate: '选择日期',
    sure: '请确定是否当前操作？',
    confirm: '确定',
    cancel: '取消',
    tip: '提示',
    status: '状态',
    enable: '启用',
    disable: '停用',
    audit: '待审核',
    toSubmit: '待提交',
    refuse: '驳回',
    agree: '通过',
    startTime: '开始时间',
    endTime: '结束时间',
    privata: '对私',
    pub: '对公',
    reupload: '重新上传',
    format: '支持 JPG / PNG 格式',
    uploadSucc: '上传成功',
    uploadFailed: '上传失败',
    noEmpty: '该字段不可为空',
    SAVE: '保存',
    CLOSE: '关闭',
    EDIT: '编辑',
    SWIFT: 'SWIFT',
    remark: '备注'
  },
  home: {
    all: '全部',
    title: '首页',
    amt: '交易金额',
    cnt: '交易笔数',
    curamt: '当日交易金额',
    curcnt: '当日交易笔数',
    curnewmchnt: '当日新增商户',
    curnewstore: '当日新增店铺',
    nodata: '没有可用数据',
    curve: {
      title: '交易趋势图',
    },
    bar: {
      title: '商户交易趋势图',
      legend: {
        mer: '商户',
        submer: '店铺'
      }
    },
    pie: {
      title: '通道交易分析'
    },
    cumu: {
      title: '累计数据分析',
      totle_mount: '总交易金额',
      totle_count: '总交易笔数',
      totle_mchnt_num: '总商户数量',
      totle_store_num: '总店铺数量',
      totle_agent_num: '总代理商数量'
    }
  },
  authority: {
    crumbs: {
      T1: '用户管理',
      T2: '权限管理'
    },
    panel: {
      userName: '用户名称',
      roleName: '角色名称',
      state: '状态',
      open: '启用',
      close: '停用'
    },
    table: {
      role: '角色',
      account: '账户',
      rTime: '注册时间'
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
      tradeTime: '交易时间',
      settleType: '结算方类型',
      settleName: '结算方',
      payType: '支付类型',
      settleDetail: '结算科目',
      settlePass: '结算通道',
      modeName: '模板名称',
      createTime: '创建时间',
      agentName: '代理商名称',
      payPass: '支付通道',
      effectTime: '生效时间',
      passCost: '通道成本',
      staticAmount: '固定金额',
      percent: '百分比',
      noEffect: '不启用',
      day: '日结',
      week: '周结',
      month: '月结',
      singleAmount: '单笔金额',
      settleCircle: '结算周期',
      floorType: '阶梯类型',
      floorCount: '分阶梯计算',
      yes: '是',
      no: '否'
    },
    table: {
      sNum: '流水号',
      merName: '商户名称',
      shopName: '店铺名称',
      tradeAmount: '交易金额',
      settlePercent: '清分比例',
      settleAmount: '清分金额',
      count: '笔',
      order: '序列',
      passName: '通道名称',
      tradeNum: '交易笔数',
      lastTime: '最后更新时间',
      isMode: '是否默认模板',
      province: '省',
      city: '市',
      address: '地址',
      phone: '电话',
      countRules: '计算公式',
      isSettle: '是/否结算',
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
      state: '状态',
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
    nameph: '用户名或邮箱',
    passph: '密码',
    desc: '文案待定',
    cap1: '机构',
    cap2: '管理系统',
    checkbox: '记住密码',
    btn: '登录',
    forgetPass: '忘记密码？',
    msg: {
      m1: '请输入账号',
      m2: '请输入密码.',
      m3: '登录失败.'
    }
  },
  merchant: {
    title: '商户管理',
    create: '创建',
    query: '查询',
    reset: '重置',
    patchImport: '批量创建',
    form: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      agent1: '一级代理',
      agent2: '二级代理',
      ph: '请先选择一级代理',
      audit_state: '商户状态'
    },
    payment: {
      title: '支付通道',
      configured: "已配置",
      nonconfigured: "未配置",
      merchantID1: '商户号',
      merchChildID1: '子商户号',
      merchantPass1: '商户秘钥',
      merchantID2: '通道商号',
      merchChildID2: '通道子商户号',
      type: '接入类型/应用类型',
      desc: '进件状态/描述',
      radio1: '一清',
      radio2: '二清',
      rule1: "请选择商户号",
      rule2: "请输入子商户号",
      rule3: "请输入商户秘钥"
    },
    table: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      address: '商户地址',
      mobile: '联系电话',
      source: '商户来源',
      type: '单店／连锁',
      agent1: '所属机构',
      account: '账户名称',
      industry: '行业',
      store: '店铺',
      detail: '详情',
      merstatus: '商户状态',
      payment: '支付配置',
      pid: '服务商号',
      wechatM: '微信商户号',
      wechatpay: '微信支付',

    },
    detail: {
      up: '启用',
      down: '停用',
      audit: '待审核',
      refuse: '驳回',
      redit: '继续编辑',
      createShop: '创建店铺',
      cate: {
        merchant: '单店',
        big: '连锁店',
        sub: '连锁店'
      },
      signed: {
        yes: '是',
        no: '否'
      },
      p: {
        m: '月',
        w: '周',
        d: '日'
      },
      basic: {
        title: '商户详情',
        close: '关闭',
        subtitle: '基本信息',
        paymenttitle: '支付通道',
        bd: '简介:',
        la1: '所属渠道:',
        la2: '业务员名称:',
        la3: '商户名称:',
        la4: '商户类型:',
        la5: '行业类别:',
        la6: '商户状态:',
        la7: '联系人姓名:',
        la8: '联系电话:',
        la9: '证件类型:',
        la10: '证件编号:',
        la11: '邮箱:',
        la12: '商户地址:',
        la13: 'BR编号:',
        la14: 'BR有效期:',
        la15: 'CI编号:',
        // la16: 'CI有效期:',
        la16: '注册地址:',
        la17: '开户名称:',
        la18: '开户行:',
        la19: '银行账号:',
        la20: '银行地址:',
        la21: '结算资金起点:',
        la22: '公司网址:',
        la23: '法人名称:'
      },
      shop: {
        subtitle: '商户信息',
        la1: '商户名称:',
        la2: '商户地址:',
        la3: '上传图片:'
      },
      rates: {
        setitle: '结算信息',
        sa1: '微信费率:',
        sa2: '支付宝费率:',
        sa3: '开户名称:',
        sa4: '开户行:',
        sa5: '银行账号:',
        sa6: '银行地址:',
        sa7: '结算资金起点:'
      },
      document: {
        doctitle: '证照信息'
      },
      pay: {
        subtitle: '公司信息',
        la1: '银行帐户名称:',
        la2: '银行账号:',
        la3: '银行名称:',
        la4: '支行名称:',
        la5: '银行所属省:',
        la6: 'SWIFT代码:',
        la7: '银行所属市:',
        la8: '联系方式:',
        la9: '银行类型:',
        la10: '上传图片:'
      },
      edit: '编辑'
    },
    newMerchant: {
      title1: '创建商户',
      title2: '编辑商户',
      step1: '基本信息',
      step2: '费率信息',
      step3: '店铺证照',
      basic: {
        cap1: '基本信息',
        cap2: '支付通道',
        cap3: '结算信息',
        cap4: '店铺证照'
      },
      form: {
        status: '商户状态',
        sub: '单店',
        big: '连锁店',
        personal: '个人',
        enterprise: '企业',
        channel: '所属一级代理',
        channel2: '所属二级代理',
        saleMan: '业务员',
        mertype: '商户类型',
        meiname: '商户名称',
        contact: '业务员',
        postT: '邮箱',
        concatName: '联系人姓名',
        concatNumber: '联系电话',
        documentType: '证件类型',
        doucumentNum: '证件编号',
        industry: '行业类别',
        addressT: '商户地址',
        accountName: '开户名称',
        accountType: '开户行',
        accountH: '银行账号',
        accountAddress: '银行地址',
        moneySettment: '结算资金起点',
        storename: '店铺名称',
        storeAddress: '店铺地址',
        storephone: '联系电话',
        storeoperating: '店铺营业时间',
        BRnumber: 'BR编号',
        BRvality: 'BR有效期',
        CInumber: 'CI编号',
        CIvality: 'CI有效期',
        warmfront: '* 必须上传身份证正面/法人身份证正面',
        warmlicense: '* 必须上传营业执照',
        warmgood: '* 必须上传经营场所/经营场所内景照片',
        warmshop: '* 必须上传经营场所/经营场所外景照片',
        warmpaypoint: '* 必须上传收银台照片',
        warmother: '* 必须上传其他凭证照片',
        applicationType: '应用类型',
        accessType: '接入类型',
        ratio: '费率',
        acquirer: '二清',
        direct: '直连',
        offline: '线下',
        online: '线上',
        shopAbbreviation: '店铺简称',
        registeredAddress: '注册地址',
        companyWebsite: '公司网址',
        legalName: '法人名称',
        bigMerchant: '单店／连锁'
      },
      applicationTypes: {
        direct: '直连',
        indirect: '二清'
      },
      accessTypes: {
        offline: '线下',
        online: '线上'
      },
      requiredRule: {
        rule1: '请选择业务员',
        rule2: '请选择商户类型',
        rule3: '请输入商户名称',
        rule4: '请输入邮箱',
        rule5: '请输入联系人姓名',
        rule6: '请输入联系电话',
        rule7: '请选择证件类型',
        rule8: '请输入证件编号',
        rule9: '请选择行业类别',
        rule10: '请输入商户地址',
        rule11: '请输入BR编号',
        rule12: '请输入BR有效期',
        rule13: '请输入CI编号',
        rule14: '请输入CI有效期',
        rule15: '请输入开户名称',
        rule16: '请输入开户行',
        rule17: '请输入银行账号',
        rule18: '请输入银行地址',
        rule19: '请输入资金结算起点',
        rule20: '请输入店铺名称',
        rule21: '请输入店铺地址',
        rule22: '请输入联系电话',
        rule23: '请输入营业时间',
        rule24: '请输入SWIFT码',
        rule25: '请选择支付通道',
        rule26: '请选择商户类型',
        rule27: '请输入联系人姓名',
        rule28: '请输入法人姓名',
        rule29: '请输入注册地址',
        rule30: '请输入公司网址',
        rule31: '请输入店铺简称'
      },
      lengthRule: {
        rule1: '最多输入4个字符',
        rule2: '最多输入5个字符',
        rule3: '最多输入8个字符',
        rule4: '最多输入10个字符',
        rule5: '最多输入12个字符',
        rule6: '最多输入15个字符',
        rule7: '最多输入25个字符',
        rule8: '最多输入50个字符'
      },
      specialRule: {
        rule1: '格式不正确',
        rule2: '输入类型必须是数字'
      },
      doctype: {
        type1: '护照',
        type2: '港澳通行证',
        type3: '香港居民证'
      },
      picture: {
        idcardfront: '身份证正面',
        licensephoto: '营业执照',
        goodsphoto: '经营场所内景照片',
        shopphoto: '经营场所外景照片',
        paypoint: '收银台照',
        otherphoto: '其他凭证照片',
        certificate: '有限公司证书',
        bankStatement: '银行对账单',
        otherDocument1: '其他文件1',
        otherDocument2: '其他文件2',
        otherDocument3: '其他文件3'

      },
      rule1: '请选择业务员',
      rule2: '请选择商户类型',
      rule3: '请输入商户名称',
      rule99: '请输入公司名称',
      rule4: '请输入正确的邮箱地址',
      rule5: '银行卡账号必须是数字',
      rule6: '手机号必须是数字',
      rule7: '请输入业务员账号',
      rule8: '上传凭证必须是JPG/PNG格式',
      rule9: '请输入连锁店总店UID',
      rule10: '最多输入50个字符',
      rule12: '请输入账号',
      rule13: '费率要大于通道的基准费率',
      rule14: '请输入公司注册号码',
      rule15: '请选择公司所属地区',
      rule16: '请输入公司地址',
      rule17: '请输入公司联系人',
      rule18: '请输入银行名称',
      rule19: '请输入SWIFT代码',
      rule20: '请输入银行帐户名称',
      rule21: '请输入店铺名称',
      rule22: '请输入店铺联系电话',
      rule23: '请选择店铺所属地区',
      rule24: '请输入店铺地址',
      rule25: '请输入店铺邮编',
      rule26: '请输入店铺附加服务',
      rule27: '请输入店铺营业时间',
      rule28: '请上传经营场所/经营场所内景照片',
      rule29: '请上传经营场所/经营场所外景照片',
      rule30: '请输入公司邮箱',
      rule31: '只能上传Excel文件',
      rule32: '请输入银行账号',
      rule33: '只能上传ZIP压缩包',
      rule34: '请输入简介',
      rule35: '请输入公司联系人电话',
      rule36: '请输入公司邮编',
      rule37: '请输入支行名称',
      rule38: '请选择行业',
      rule39: '请确认合同是否签署',
      rule40: '请选择结算周期',
      rule41: '请输入店铺网址',
      rule42: '请输入可访问的店铺网址',
      rule43: '请选择销售员',
      rule44: '请上传身份证正面/法人身份证正面',
      rule45: '请上传营业执照',
      rule46: '请上传收银台照片'
    },
    api: {
      title: 'API管理',
      userId: '用户ID',
      userType: '用户类型',
      merchant: '商户',
      agent: '代理商',
      id: 'ID',
      userName: '用户名称',
      code: 'CODE',
      key: 'KEY',
      remark: '备注',
      userInfo: '用户信息',
      address1: '通知地址',
      address2: '返回地址',
      tip1: '请输入用户ID',
      tip2: '请输入正确的用户ID',
    }
  },
  shop: {
    title: '店铺管理',
    query: '查询',
    reset: '重置',
    create: '创建',
    form: {
      mchntid: '商户ID',
      mchntname: '商户名称',
      submchntid: '店铺ID',
      sunmchntname: '店铺名称',
    },
    table: {
      submchntid: '店铺ID',
      sunmchntname: '店铺名称',
      mchntid: '商户ID',
      mchntname: '商户名称',
      address: '店铺地址',
      telephone: '店铺联系电话',
      location: '店铺所属地区',
      account: '账户名称',
      operating: '店铺营业时间'
    },
    detail: {
      basic: {
        title: '店铺详情',
        close: '关闭',
        subtitle: '基本信息',
        la1: '商户名称:',
        la2: '店铺登陆账号:',
        la3: '店铺名称:',
        la4: '店铺联系电话:',
        la5: '店铺所属地区:',
        la6: '店铺地址:',
        la7: '店铺邮编:',
        la8: '店铺营业时间:',
        la9: '店铺附加服务:',
        la10: '店铺网址:',
        la11: '图片展示:',
        la12: '子商户号(mchid):',
        la13: 'SWIFT:'
      }
    },
    newStore: {
      title1: '创建店铺',
      title2: '编辑店铺',
      model: {
        storename: '店铺名称',
        storeaddress: '店铺地址',
        mobile: '店铺联系电话',
        operation: '店铺营业时间',
        short_name: '店铺简称'
      },
      rule1: '请输入店铺名称',
      rule2: '请输入店铺地址',
      rule3: '请输入联系电话',
      rule4: '请输入营业时间',
      rule5: '请输入店铺简称',
      casher: '点击添加收银台照片',
      warmcasher: '请上传收银台照片',
      mustcasher: '* 必须上传收银台照片',
      other: '点击添加补充资料照片',
      warmother: ''
    }
  },
  batch: {
    title: '批量创建',
    t1: '批量导入',
    tip: {
      txt: '* 请按照固定格式上传商户资料，请参考',
      ins: '《批量进件说明》',
      template: '《batch merchants on-boarding.xlsx》模板',
      and: '及',
      title: '提示',
      close: '关 闭'
    },
    cap: '批量创建',
    input: {
      cap1: '商户信息',
      cap2: '照片信息'
    },
    up: {
      excel: '上传Excel',
      zip: '上传图片zip包'
    },
    commit: '提交',
    rule1: '请上传商户信息',
    rule2: '请上传照片信息',
    manual1: '1、请点击下载批量上传模板《batch merchants on-boarding.xlsx》，下载后将需要入网的商户信息汇总。',
    manual2: '2、附件请按照命名规范命名，并放入文件夹压缩后进行上传（店铺证照命名规范：店铺电话-shopphoto.jpg、店铺电话-paypoint.jpg、店铺电话-otherphoto.jpg、店铺电话-idcardfront.jpg、店铺电话-licensephoto.jpg、店铺电话-goodsphoto.jpg、店铺电话-otherphoto1.jpg、店铺电话-otherphoto2.jpg、店铺电话-ciphoto.jpg和店铺电话-bankcheckphoto.jpg）。',
    manual3: '3、附件中文件夹名称与压缩包名称需保持一致，如需修改名称，请先修改文件夹名称再进行压缩。'
  },
  audit: {
    title: '商户审核',
    form: {
      mchtid: '商户ID',
      audit_state: '审核状态',
      memo: '备注'
    },
    table: {
      cate: '商户类型',
      status: '审核状态'
    },
    deny: '驳回',
    succ: '审核成功',
    fail: '审核失败',
    going: '待审核',
    detail: {
      title: '审核记录',
      storeInfo: {
        title: '证照信息',
        storename: '店铺名称',
        storeaddr: '店铺地址',
        storetel: '联系电话',
        opertime: '营业时间'
      },
      table: {
        creator: '操作员ID',
        create_date: '审核日期',
        result: '审核结果',
        memo: '备注'
      },
      doit: '审核',
      pass: '通过',
      re: '驳回',
      msg1: '请输入审核备注。',
      done: '审核完成'
    }
  },
  trade: {
    detail: '交易明细',
    total: '交易汇总',
    refundMsg: '退款管理',
    refundCheck: '退款审核管理',
    btn: {
      applyRefund: '申请退款',
    },
    common: {
      tradeDate: '交易日期',
      tradeTime: '交易时间',
      inSameMonth: '交易信息不可跨月查询',
      tradeSum: '交易流水号',
      phone: '联系电话',
      applyTime: '申请时间',
      refundTime: '退款时间',
      refundSuc: '退款成功',
      refundFail: '退款失败',
      sNum: '流水号',
      tradeType: '交易类型',
      payPass: '支付通道',
      merchantName: '商户名称',
      shopName: '店铺名称',
      firstAgent: '一级代理',
      secondAgent: '二级代理',
      wechat: '微信支付',
      alipay: '支付宝',
      pay: '支付',
      refund: '退款',
      success: '成功',
      failed: '失败',
      fee: '手续费',
      payTrade: '支付交易',
      refundTrade: '退款交易',
      tradeAmount: '交易金额',
      tradeCount: '交易笔数',
      refundAmount: '退款金额',
      refundCount: '退款笔数',
      amount: '金额',
      count: '笔数',
      pleaseSelect: '请选择',
      noData: '暂无数据'
    },
    dialog: {
      title1: '退款详情',
      title2: '退款申请',
      title3: '退款审核',
      allRefund: '全额退款',
      merchantId: '商户ID',
      pay: '支付方式',
      btn1: '提交申请',
      tip1: '请输入交易流水号',
      tip2: '请输入退款金额',
      tip3: '最大可退款金额',
      tip4: '请输入有效退款金额',
      tip5: '超出可退范围',
      tip6: '发起退款失败，请联系客服查询失败原因，或采用其他方式给消费者退款',
    },
  },
  agent: {
    agentName: '代理商名称',
    agentId: '代理商ID',
    agentLevel: '代理商级别',
    level: '等级',
    level1: '一级',
    level2: '二级',
    agentLevel1: '一级代理',
    agentLevel2: '二级代理',
    leaderAgent: '上级代理商名称',
    registerTime: '注册时间',
    agentNickname: '代理商简称',
    agentArea: '代理区域',
    address: '地址',
    contact: '联系人',
    legal: '法人',
    contactMobile: '联系人电话',
    legalMobile: '法人电话',
    saleMan: '业务员',
    belongSaleMan: '所属业务员',
    username: '登录账号',
    canuse: '可以注册',
    password: '登录密码',
    bankuser: '账户名称',
    bankaccount: '结算账号',
    headbankname: '总行名称',
    bankname: '支行名称',
    bankcode: '联行号',
    wechat: '微信',
    alipay: '支付宝',
    agentDetail: '代理商详情',
    baseInfo: '基本信息',
    settleInfo: '结算信息',
    payRate: '支付通道',
    wechatRate: '微信费率',
    alipayRate: '支付宝费率',
    agentList: '代理商列表',
    agentAdd: '添加代理商',
    agentEdit: '修改代理商',
    pleaseEnter: '请输入',
    pleaseSelect: '请选择',
    agentBelong: '所属代理',
    onlyLetterNumber: '登录账号只可以输入字母或数字',
    isRegistered: '登录账号已注册'
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
    desc: '机构商管理系统',
    roles: [
      ''
    ],
    logout: '注销'
  },
  salesman: {
    title: '业务员管理',
    engaged: '在职',
    retired: '离职',
    form: {
      slsm_uid: '业务员ID',
      salesname: '业务员名称',
      mobile: '手机号码',
      status: '业务员状态',
      email: '邮箱',
      idnumber: '证件号码',
      date: '注册日期',
      password: '密码'
    },
    table: {
      email: '邮箱',
      idnumber: '证件号码',
      date: '注册日期',
      password: '密码'
    },
    detail: {
      title: '业务员详情',
      subtitle: '基本信息',
      picture: '证照信息',
      slsm_uid: '业务员ID:',
      salesname: '业务员名称:',
      mobile: '手机号码:',
      status: '业务员状态:',
      email: '邮箱:',
      idnumber: '证件号码:',
      password: '密码:',
      date: '注册日期:'
    },
    newsale: {
      title1: '创建业务员',
      title2: '编辑业务员',
      cap1: '基本信息',
      cap2: '证照信息',
      model: {
        salesname: '业务员名称',
        mobile: '手机号码',
        status: '业务员状态',
        email: '邮箱',
        password: '密码',
        confirm_password: '确认密码',
        idnumber: '证件号码',
        idcardfront: ''
      },
      rule1: '请输入业务员名称',
      rule2: '最多输入20个字符',
      rule3: '请输入邮箱',
      rule11: '请输入合法邮箱',
      rule4: '请输入密码',
      rule5: '密码最多输入18个字符',
      rule6: '请输入确认密码',
      rule7: '确认密码最多输入18个字符',
      rule8: '请输入手机号码',
      rule9: '手机号码最多输入11位数字',
      rule10: '手机号码必须是数字',
      rule12: '请输入证件号码',
      rule13: '证件号码最多输入20个字符',
      pic1: '证件正面照片',
      pic1warn: '* 必须上传证件照正面照片',
      tip: '请上传证件正面照'
    }
  },
  system: {
    log: {
      username: '登录账号',
      shopname: '用户名称',
      ipaddr: '登陆IP',
      type: '登入系统',
      operation_date: '操作日期',
      operation: '操作',
      status: '结果',
      title: '系统日志'
    },
    tradeLimit: {
      title: '商户交易额度管理',
      userid: '商户ID',
      shopname: '商户名称',
      address: '地址',
      mobile: '联系电话',
      trade_amt: '单笔交易额',
      day_total_amt: '单日交易额',
      operation: '操作',
      edit: '商户交易额度修改',
      set: '商户交易额度设置',
      zero: '交易额不能为0',
      negative: '交易额不能为负数',
      decimal: '只支持小数点后两位的数值格式',
      numerical: '商户ID只支持数值格式'
    },
    refund: {
      title: '合并退款白名单管理',
      title1: '添加合并退款白名单',
      title2: '合并退款白名单审核',
      title3: '状态管理',
      merchantId: '商户ID',
      merchantName: '商户名称',
      address: '地址',
      phone: '联系电话',
      joinTime: '加入时间',
      audit: '审核操作',
      tip1: '请输入商户ID',
      tip2: '请输入商户名称',
    }
  }
}
export default zh;
