// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import config from 'src/config'
import router from './router'
import Vuetify from 'vuetify'
import Store from 'assets/js/store'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'assets/scss/common.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // icon-font-size

Vue.use(VueI18n)
Vue.use(Vuetify)

Vue.config.productionTip = false

axios.defaults.withCredentials = true; // 允许跨域请求携带cookie
// axios.defaults.headers.common['lang'] = JSON.parse(switchlang).value;

axios.interceptors.response.use((res) => {
  if (config.env === 'development') {
    return res
  }
  let data = res.data;
  if (data.respcd == config.code.SESSIONERR || data.respcd == config.code.LOGINERR) {
    // 清除本地cookie
    (new Image()).src = `${config.ohost}/mchnt/set_cookie?sessionid=`;

    Store.set('flag', true);
    // localStorage.removeItem('lang');

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
  components: { App },
  template: '<App/>'
})
