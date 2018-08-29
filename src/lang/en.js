
'use strict';
import enLocale from 'qfpay-element-ui/lib/locale/lang/en'

const en = {
  ...enLocale,
  common: {
    title: 'Overseas agency service business platform',
    all: 'All',
    create: 'Create',
    choose: 'Please choose',
    save: 'Save',
    edit: 'Edit',
    close: 'Close',
    netError: 'Net error'
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
      pwd: '密码'
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
