// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import store from './store'
import config from 'src/config'
import router from './router'
import { Autocomplete, Container, Header, Aside, Main, Upload, Select, Option, TableColumn, Table, Button, Pagination, Dropdown, DropdownItem, DropdownMenu, Loading, DatePicker, Input, Message, MessageBox, Form, FormItem, Radio, RadioGroup, RadioButton, Dialog, Col, Row, CheckboxGroup, Checkbox, Rate, Tooltip, Menu, Submenu, MenuItem, MenuItemGroup, Steps, Step, InputNumber } from 'qfpay-element-ui';
import Store from 'assets/js/store'
import VueI18n from 'vue-i18n'
import 'assets/scss/common.scss'
import locale from 'qfpay-element-ui/lib/locale';

let switchlang = Store.get("lang") || 'en';

Vue.use(VueI18n)

Vue.use(Autocomplete)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Table)
Vue.use(Option)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Form)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
Vue.use(RadioButton)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Step)
Vue.use(Steps)
Vue.use(InputNumber)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: switchlang, // set locale
  messages: {
    'en': require(`./lang/en.js`)['default'], // set locale messages
    'zh-CN': require(`./lang/zh-CN.js`)['default']
  }
})
locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.withCredentials = true; // 允许跨域请求携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['lang'] = switchlang;

axios.interceptors.response.use((res) => {
  if (config.env === 'development') {
    return res
  }
  let data = res.data;
  if (data.respcd == config.code.SESSIONERR || data.respcd == config.code.LOGINERR) {
    // 清除本地cookie
    (new Image()).src = `${config.ohost}/mchnt/set_cookie?sessionid=`;

    Store.set('flag', true);
    localStorage.removeItem('lang');

    location.replace(`${location.pathname}#/login`);
  } else {
    return res
  }
}, (err) => {
  // Do something with response error
  console.log(err)
})
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
