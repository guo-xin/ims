'use strict';
import zhLocale from 'qfpay-element-ui/lib/locale/lang/zh-CN'

const zh = {
  ...zhLocale,
  common: {
    title: '海外机构服务商业务平台',
    all: '全部',
    create: '创 建',
    export: '导出',
    choose: '请选择',
    save: '保 存',
    edit: '修 改',
    close: '关 闭',
    search: '查找',
    reset: '重置',
    loading: '拼命加载中',
    netError: '请求失败',
    opSucc: '操作成功',
    opFailed: '操作失败',
    operate: '操作',
    delete: '删除',
    look: '查看',
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
      rTime: '注册时间',
      lTime: '最后登录时间'
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
      T3: '清分管理',
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
      payWay: '支付渠道',
      payType: '支付类型',
      settleDetail: '结算科目',
      settleWay: '结算渠道',
      modeName: '模板名称',
      createTime: '创建时间',
      agentName: '代理商名称',
      payPass: '支付通道',
      effectTime: '生效时间',
      passCost: '通道成本',
      singleAmount: '单笔金额',
      settleCircle: '结算周期',
      floorType: '阶梯类型'
    },
    table: {
      sNum: '流水号',
      merName: '商户名称',
      shopName: '门店名称',
      dealer: '一级代理',
      tradeAmount: '交易金额',
      settlePercent: '清分比例',
      settleAmount: '清分金额',
      order: '序列',
      version: '版本号',
      wayName: '渠道名称',
      tradeNum: '交易笔数',
      payGoods: '支付产品',
      lastTime: '最后更新时间',
      isMode: '是否默认模板',
      province: '省',
      city: '市',
      address: '地址',
      phone: '电话',
      countRules: '计算公式',
      isSettle: '是/否结算'
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
  main: {
    desc: '移动支付管理系统',
    roles: [
      ''
    ],
    logout: '注销'
  }
}
export default zh;
