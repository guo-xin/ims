import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from 'config'
// import { Message } from 'qfpay-element-ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    permissionData: [],
    menuData: []
  },
  mutations: {
    getPermissionData (state, payload) {
      state.permissionData = payload.data.perms;
      state.menuData = payload.data.menu_struct;
    }
  },
  actions: {
    getUserPermission ({ commit }, payload) { // 获取用户权限信息
      return new Promise((resolve, reject) => {
        axios.get(`${config.host}/org/perm/user/perms`, {
          params: Object.assign({}, {format: 'cors'}, payload)
        })
          .then((res) => {
            let data = res.data
            if (data.respcd === config.code.OK) {

              data.data.menu_struct.unshift({code: 'home', descr: 'Home', group: []});
              data.data.menu_struct = data.data.menu_struct.map((item) => {
                if(item.group.length) {
                  item.index = item.group[0].index[0]
                }
                return item
              })
              commit({
                type: 'getPermissionData',
                data: data.data
              })
              resolve()
            }else {
              reject()
            }
          })
          .catch((res) => {
            reject()
          })
      })
    },
  }
})

export default store
