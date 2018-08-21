// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import config from 'src/config'
import router from './router'
import {
  Vuetify,
  VApp,
  VForm,
  VSelect,
  VDataTable,
  VDatePicker,
  VTextField
} from 'vuetify';
import Store from 'assets/js/store'
import VueI18n from 'vue-i18n'
import 'vuetify/src/stylus/app.styl' // Ensure you are using stylus-loader stylus
import 'assets/scss/common.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // icon-font-size

let langAdaptor = function(lang) {
  if(~lang.indexOf('en')) return 'en'
  // if(lang.toLowerCase() === 'zh-tw' || lang.toLowerCase() === 'zh-hk') return 'zh-TW'
  if(lang.toLowerCase() === 'zh-cn' || lang.toLowerCase() === 'zh') return 'zh-cn'
  // if(~lang.indexOf('ja')) return 'ja'
  return 'en';
}

let switchlang = Store.get("lang") || langAdaptor(navigator.language || navigator.browserLanguage || 'en');

Vue.use(VueI18n)

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: switchlang, // set locale
  messages: {
    'en': require(`./lang/en.js`)['default'], // set locale messages
    'zh-cn': require(`./lang/zh-CN.js`)['default']
  }
})
Vue.use(Vuetify, {
  components: {
    VApp,
    VForm,
    VSelect,
    VDataTable,
    VDatePicker,
    VTextField
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})

Vue.config.productionTip = false

axios.defaults.withCredentials = true; // 允许跨域请求携带cookie
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
