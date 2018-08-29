import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from 'config'
// import { Message } from 'qfpay-element-ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    permissionData: {},
    menuData: {}
  },
  mutations: {
    getPermissionData (state, payload) {
      state.permissionData = payload.data.perms;
      state.menuData = payload.data.menu_struct;
    }
  },
  actions: {
    getUserPermission ({ commit }, payload) { // 获取用户权限信息
      axios.get(`${config.host}/org/perm/user/perms`, {
        params: Object.assign({}, {format: 'cors'}, payload)
      })
        .then((res) => {
          let data = res.data
          if (data.respcd === config.code.OK) {
            commit({
              type: 'getPermissionData',
              data: data.data
            })
          }
        })
        .catch(() => {
          this.$message.error('获取分页店铺列表失败')
        })
    },
  }
})

export default store
