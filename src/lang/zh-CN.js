'use strict';
import zhLocale from 'qfpay-element-ui/lib/locale/lang/zh-CN'

const zh = {
  ...zhLocale,
  common: {
    title: '海外机构服务商业务平台',
    all: '全部',
    create: '创建',
    export: '导出',
    choose: '请选择',
    save: '保存',
    edit: '修改',
    close: '关闭',
    search: '查找',
    add: '增加',
    reset: '重置',
    loading: '拼命加载中',
    netError: '请求失败',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: '操作',
    delete: '删除',
    look: '查看',
    range: '选择时间范围',
    confirm: '确定',
    cancel: '取消',
    tip: '提示',
    start: '开始时间',
    end: '结束时间',
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
      shopName: '门店名称',
      dealer: '一级代理',
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
    nameph: '请输入电话或E-mail',
    passph: '密码',
    desc: '文案待定',
    cap1: '移动支付',
    cap2: ' 管理系统',
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
    query: 'Query',
    reset: 'Reset',
    patchImport: '批量创建',
    form: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      agent1: '一级代理',
      audit_state: 'Audit State'
    },
    table: {
      mchtid: '商户ID',
      mchtname: '商户名称',
      address: '地址',
      mobile: '联系方式',
      agent: '所属渠道',
      account: '账户名称',
      state: '审核状态'
    },
    detail: {
      basic: {
        title: '商户详情',
        close: '关闭',
        subtitle: '基本信息',
        la1: '商户类型:',
        la2: '审核状态:',
        la3: '商户名称:',
        la4: '所属渠道:',
        la5: '地址:',
        la6: '业务员:',
        la7: '法人:',
        la8: '业务员电话:',
        la9: '邮箱:',
        la10: 'Engage Time:'
      },
      shop: {
        subtitle: '店铺信息',
        la1: '店铺名称:',
        la2: '地址:',
        la3: '上传图片:'
      },
      rates: {
        subtitle: '费率信息'
      },
      pay: {
        subtitle: '清算信息',
        la1: '账户名称:',
        la2: '银行卡号:',
        la3: '总行:',
        la4: '分行:',
        la5: '银行所属省:',
        la6: '联行号:',
        la7: '银行所属市:',
        la8: '联系方式:',
        la9: '银行类型:',
        la10: '上传图片:'
      },
      edit: '编辑'
    },
    newMerchant: {
      title1: '创建商户',
      title2: '修改商户',
      step1: '基本信息',
      step2: '费率信息',
      step3: '清算信息',
      basic: {
        cap1: '基本信息',
        cap2: '费率信息'
      }
    }
  },
  audit: {
    title: '审核管理',
    form: {
      mchtid: '商户ID',
      audit_state: '审核状态',
      memo: '备注'
    },
    detail: {
      title: '审核记录',
      table: {
        creator: '操作员ID',
        create_date: '审核日期',
        result: '审核结果',
        memo: '备注'
      },
      doit: '审核'
    }
  },
  main: {
    desc: '移动支付管理系统',
    roles: [
      ''
    ],
    logout: '注销'
  }
}
export default zh;
