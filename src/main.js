// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import 'src/filters'
import App from './App'
import axios from 'axios'
import store from './store'
import config from 'src/config'
import router from './router'
import { Container, Header, Aside, Main, Message, MessageBox, Loading, Col, Row, Menu, Submenu, MenuItem, MenuItemGroup,Select, Option, Tree, Autocomplete,  Upload, TableColumn, Table, Button, Pagination, Dropdown, DropdownItem, DropdownMenu, DatePicker, Input, Form, FormItem, Radio, RadioGroup, RadioButton, Dialog, CheckboxGroup, Checkbox, Rate, Tooltip, Steps, Step, InputNumber } from 'qfpay-element-ui';
import VueI18n from 'vue-i18n'
import 'assets/scss/common.scss'
import locale from 'qfpay-element-ui/lib/locale';

let switchlang = sessionStorage.getItem("oasbp_lang") || 'en-us';

Vue.use(VueI18n)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Autocomplete)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Form)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(RadioButton)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(Step)
Vue.use(Steps)
Vue.use(InputNumber)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: switchlang, // set locale
  messages: {
    'en-us': require(`./lang/en.js`)['default'], // set locale messages
    'zh-cn': require(`./lang/zh-CN.js`)['default']
  }
})
locale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.withCredentials = true; // 允许跨域请求携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['lang'] = switchlang;
axios.defaults.headers.common['region'] = config.region;

axios.interceptors.response.use((res) => {
  if (config.env === 'development') {
    return res
  }
  let data = res.data;
  if (data.respcd == config.code.SESSIONERR || data.respcd == config.code.LOGINERR) {
    localStorage.clear();
    location.replace(`${location.pathname}#/login`);
  }

  return res
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
