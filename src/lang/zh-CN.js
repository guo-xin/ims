'use strict';
import zhLocale from 'qfpay-element-ui/lib/locale/lang/zh-CN'

const zh = {
  ...zhLocale,
  common: {
    title: '海外机构服务商业务平台',
    all: '全部',
    create: '创 建',
    choose: '请选择',
    save: '保 存',
    edit: '修 改',
    close: '关 闭',
    netError: '请求失败'
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
      pwd: '密码'
    }
  }
}
export default zh;
