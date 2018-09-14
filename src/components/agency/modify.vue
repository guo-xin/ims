<template>
  <div class="agencyCreate">
    <header class="page-header style2">
      <h2 class="page-title">{{this.isUpdate ? '修改渠道' : '添加渠道'}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>关闭</span></el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="结算信息"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseform" :rules="baseFormRules" :model="baseform">
      <h3>基本信息</h3>
      <el-form-item prop="name" label="代理商名称">
        <el-input v-model="baseform.name" @blur="updateAgency('name', $event)"></el-input>
      </el-form-item>
      <el-form-item :prop="baseform.levelcode >= 2 ? 'parent_uid' : 'levelcode'" label="代理商级别" style="width:446px">
        <el-select v-model="baseform.levelcode" @change="selectLevel">
          <el-option v-for="level in levels" :label="level.text" :value="level.code" :key="level.code"></el-option>
        </el-select>
        <el-select :disabled="baseform.levelcode === 1" v-model="baseform.parent_uid" placeholder="所属代理" @change="updateAgency('secondAgency', $event)">
          <el-option v-for="agency in allAgencys" :label="agency.name" :value="agency.qd_uid" :key="agency.qd_uid"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item prop="short_name" label="代理商简称">
        <el-input v-model="baseform.short_name" @blur="updateAgency('short_name', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="auth_province" label="代理区域" style="width:446px">
        <el-select ref="province" v-model="baseform.auth_province" @change="selectProvince">
          <el-option v-for="province in areas" :label="province.areaname" :value="province.areaid" :key="province.areaid"></el-option>
        </el-select>
        <el-select ref="city" v-model="baseform.auth_city" @change="selectCity">
          <el-option v-for="city in citys" :label="city.cityname" :value="city.cityid" :key="city.cityid"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item prop="address" label="地址">
        <el-input v-model="baseform.address" @blur="updateAgency('address', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="business_name" label="联系人">
        <el-input v-model="baseform.business_name" @blur="updateAgency('business_name', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="legal_name" label="法人">
        <el-input v-model="baseform.legal_name" @blur="updateAgency('legal_name', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="business_mobile" label="联系人电话">
        <el-input v-model="baseform.business_mobile" @blur="updateAgency('business_mobile', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="法人电话">
        <el-input v-model="baseform.mobile" @blur="updateAgency('mobile', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_userid" label="所属业务员">
        <el-select v-model="baseform.slsm_userid" :disabled="baseform.levelcode > 1" @change="updateAgency('selectSaleMan', $event)">
          <el-option v-for="sale in sales" :label="sale.name" :value="sale.userid" :key="sale.userid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="username" prop="username" label="登录账号" :error="usernameErrorMessage">
        <el-input :disabled="isUpdate" @blur="verifyRegister" @focus="clearRegisterError" v-model="baseform.username"></el-input>
        <i v-show="isRegisterLoading" class="el-icon-loading"></i>
        <i v-show="!isRegisterLoading && !isRegistered" title="可以使用" class="el-icon-circle-check" style="color:#67c10d"></i>
      </el-form-item>
      <el-form-item prop="password" label="登录密码">
        <el-input ref="passwordInput" type="password" v-model="baseform.password" @blur="updateAgency('password', $event)"></el-input>
      </el-form-item>
    </el-form>

    <el-form v-show="active === 1" ref="bankinfoform" :rules="bankinfoFormRules" :model="bankinfo">
      <h3>结算信息</h3>
      <el-form-item prop="bankuser" label="账户名称">
        <el-input v-model="bankinfo.bankuser" @blur="updateAgency('bankuser', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" label="结算账号">
        <el-input v-model="bankinfo.bankaccount" @blur="updateAgency('bankaccount', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" label="总行名称">
        <el-input v-model="bankinfo.headbankname" @blur="updateAgency('headbankname', $event)"></el-input>
      </el-form-item>
      <hr/>
      <el-form-item prop="bankname" label="支行名称">
        <el-input v-model="bankinfo.bankname" @blur="updateAgency('bankname', $event)"></el-input>
      </el-form-item>
      <el-form-item prop="bankcode" label="联行号">
        <el-input v-model="bankinfo.bankcode" @blur="updateAgency('bankcode', $event)"></el-input>
      </el-form-item>
    </el-form>

    <footer v-if="isUpdate">
      <el-button v-show="active === 1" type="primary" @click="goback">完成</el-button>
      <el-button v-show="active === 0" type="primary" @click="next">下一步</el-button>
      <el-button v-show="active === 1" @click="pre">上一步</el-button>
    </footer>
    <footer v-else>
      <el-button type="primary" @click="next">
        {{active === 1 ? '完成' : '下一步'}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">上一步</el-button>
      <el-button v-show="active === 0" @click="resetStep1">重置</el-button>
    </footer>
  </div>
</template>

<script>
  import qs from 'qs'
  import config from 'config'
  export default {
    data() {
      return {
        isUpdate: false,
        isLoading: false,
        active: 0, // 当前步骤
        baseform: {
          name: '',
          levelcode: '',
          parent_uid: '',
          slsm_userid: '',
          auth_province: '',
          auth_city: '',
          password: ''
        },
        bankinfo: {
          bankuser: '', // 账户名称
          bankaccount: '', // 结算账号
          headbankname: '', // 总行名称
          bankname: '', // 支行名称
          bankcode: '' // 网点联行号
        },
        levels: [], // 代理商级别
        allAgencys: [], // 所属代理
        areas: [], // 所有省份和城市
        citys: [], // 当前省的所有城市
        sales: [], // 业务员 列表
        isRegisterLoading: false,
        isRegistered: true, // 已注册
        usernameErrorMessage: '', // 登录账号报错文案
        baseFormRules: {
          'name': [
            {required: true, message: '请输入代理商名称'}
          ],
          'levelcode': [
            {required: true, message: '请选择代理商级别'}
          ],
          'auth_province': [
            {required: true, message: '请选择代理区域'}
          ],
          'short_name': [
            {required: true, message: '请输入代理商简称'}
          ],
          'address': [
            {required: true, message: '请输入地址'}
          ],
          'business_name': [
            {required: true, message: '请输入联系人'}
          ],
          'legal_name': [
            {required: true, message: '请输入法人'}
          ],
          'business_mobile': [
            {required: true, message: '请输入联系人电话'}
          ],
          'mobile': [
            {required: true, message: '请输入法人电话'}
          ],
          'username': [
            {required: true, message: '请输入登录账号'}
          ],
          'password': [
            {required: true, message: '请输入登录密码'}
          ]
        },
        bankinfoFormRules: {
          'bankuser': [
            {required: true, message: '请输入账户名称'}
          ],
          'bankaccount': [
            {required: true, message: '请输入结算账号'}
          ],
          'headbankname': [
            {required: true, message: '请输入总行名称'}
          ],
          'bankname': [
            {required: true, message: '请输入支行名称'}
          ],
          'bankcode': [
            {required: true, message: '请输入联行号'}
          ]
        }
      }
    },
    created() {
      // 编辑页面，刷新回详情页
      if (localStorage.getItem('hasEdit') === '1') {
        this.$router.push({name: 'agencyDetail'})
        return false
      }

      this.isUpdate = this.$route.name === 'agencyEdit'
      let base = {}
      let bankinfo = {}
      if (this.isUpdate) {
        this.baseFormRules.password = [
          {required: false}
        ]
        base = localStorage.getItem('baseEdit')
        bankinfo = localStorage.getItem('bankinfoEdit')
      } else {
        base = localStorage.getItem('base')
        bankinfo = localStorage.getItem('bankinfo')
      }
      if (base) {
        this.baseform = JSON.parse(base)
      }
      if (bankinfo) {
        this.bankinfo = JSON.parse(bankinfo)
      }
      this.fetchSalesman()
      this.fetchAgencyLevel()
      this.fetchCity()
    },
    methods: {
      goback() {
        this.$router.push({name: 'agencyDetail'})
      },
      next() {
        if (this.active === 0) {
          this.$refs['baseform'].validate((valid) => {
            if (valid) {
              this.active += 1
              if (this.isUpdate) {
                localStorage.setItem('baseEdit', JSON.stringify(this.baseform))
              } else {
                localStorage.setItem('base', JSON.stringify(this.baseform))
              }
            }
          })
        } else if (this.active === 1) { // 创建 完成
          this.$refs['bankinfoform'].validate((valid) => {
            if (valid) {
              this.create()
            }
          })
        }
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      resetStep1() {
        this.$refs['baseform'].resetFields()
        this.$refs['baseform'].clearValidate()
        this.baseform.auth_city = ''
        this.baseform.levelcode = ''
      },
      selectLevel(value) {
        this.levels.map((level, index) => {
          if (level.code === value) {
            this.allAgencys = level.parentinfo
          }
        })
        if (value === 1) {
          this.baseFormRules.levelcode = [
            {required: true, message: '请选择代理商级别'}
          ]
          this.baseFormRules.slsm_userid = [
            {required: true, message: '请选择业务员'}
          ]
          this.baseFormRules.parent_uid = []
        } else {
          this.baseFormRules.levelcode = []
          this.baseFormRules.slsm_userid = []
          this.baseFormRules.parent_uid = [
            {required: true, message: '请选择所属代理'}
          ]
          this.baseform.slsm_userid = ''
        }
        this.baseform.parent_uid = ''
      },
      selectProvince(value, cityId) {
        this.areas.map((area, index) => {
          if (area.areaid === value) {
            this.citys = area.cities
            if (this.isUpdate) {
              this.updateAgency('updateProvince', area.areaname)
            }
          }
        })
        if (cityId) {
          this.baseform.auth_city = cityId
        } else {
          this.baseform.auth_city = ''
        }
      },
      selectCity(value) {
        if (this.isUpdate) {
          this.citys.map((city, index) => {
            if (city.cityid === value) {
              this.updateAgency('updateProvinceCity', city.cityname)
            }
          })
        }
      },
      fetchAgencyLevel() {
        this.$http(`${config.host}/org/tools/level`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.levels = data.data.records
            if (this.isUpdate && this.baseform.levelcode === 2) {
              this.allAgencys = this.levels[1].parentinfo
            }
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      fetchSalesman() {
        this.$http(`${config.host}/org/tools/slsm`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.sales = data.data
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      fetchCity() {
        this.isLoading = true
        this.$http(`${config.host}/org/tools/areacities`)
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.areas = data.data.records
            if (this.baseform.auth_city) {
              this.selectProvince(this.baseform.auth_province, this.baseform.auth_city)
            }
            if (this.isUpdate) {
              this.areas.map((area, index) => {
                if (area.areaname === this.baseform.auth_province) {
                  this.citys = area.cities
                }
              })
            }
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      clearRegisterError() {
        this.isRegistered = true
        this.usernameErrorMessage = ''
      },
      verifyRegister(event) {
        let username = event.target.value
        if (!username) {
          return false
        }
        if (!/^[A-Za-z0-9]+$/g.test(username)) {
          this.usernameErrorMessage = '登录账户只可以输入字母或数字'
        }
        this.isRegisterLoading = true
        this.$http(`${config.host}/org/agent/check?username=${username}`)
        .then((res) => {
          this.isRegisterLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.isRegistered = false
            this.usernameErrorMessage = ''
            this.updateAgency('username', username)
          } else if (data.respcd === '2102') {
            this.isRegistered = true
            this.usernameErrorMessage = '登录账号已注册'
          }
        })
      },
      create() {
        // 接口传参需要 label，省市
        let paramsBase = JSON.parse(JSON.stringify(this.baseform))
        paramsBase.auth_province = this.$refs.province.selected.label || ''
        paramsBase.auth_city = this.$refs.city.selected.label || ''
        this.$http({
          method: 'post',
          url: `${config.host}/org/agent/create`,
          data: qs.stringify({
            base: JSON.stringify(paramsBase),
            bankinfo: JSON.stringify(this.bankinfo)
          })
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.$refs['baseform'].resetFields()
            this.$refs['bankinfoform'].resetFields()
            localStorage.removeItem('base')
            localStorage.removeItem('bankinfo')
            this.$message.success('创建成功')
            this.$router.push({name: 'agencyList'})
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      updateAgency(key, e) {
        if (!this.isUpdate) {
          return false
        }
        let agentId = this.$route.params.id
        let params = {}
        if (key === 'secondAgency') {
          params['levelcode'] = 2
          params['parent_uid'] = e
        } else if (key === 'updateProvince') {
          params['auth_province'] = e
          params['auth_city'] = ''
        } else if (key === 'updateProvinceCity') {
          params['auth_province'] = this.$refs.province.selected.label || this.baseform.auth_province
          params['auth_city'] = e
        } else if (key === 'selectSaleMan') {
          params['levelcode'] = 1
          params['slsm_userid'] = e
        } else if (e.target.value) {
          params[key] = e.target.value
        } else {
          return false
        }
        this.$http({
          method: 'post',
          url: `${config.host}/org/agent/${agentId}/edit`,
          data: qs.stringify(params)
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.$refs['baseform'].clearValidate()
            this.$refs['bankinfoform'].clearValidate()
            localStorage.setItem('hasEdit', '1')
            this.$message.success('修改成功')
            // this.$router.push({name: 'agencyList'})
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      cancel() {
        this.$router.push({name: 'agencyList'})
      }
    }
  }
</script>

<style scoped lang="scss">
.agencyCreate {
  background-color: #fff;
  padding: 0 30px;
}
.el-form {
  background-color: #F7F9FA;
  margin-bottom: 24px;
  padding: 15px 30px;
  h3 {
    position: relative;
    padding: 12px 0;
    margin: 0 0 20px;
    font-size: 20px;
    color: $titleColor;
    &:after{
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: #232629;
    }
  }
}
.el-form-item {
  width: 300px;
  display: inline-block;
  vertical-align: top;
  margin-right: 80px;
}
.el-select {
  width: 200px;
}
.el-steps {
  padding-right: 75px;
}
hr {
  border: none;
  margin: 0;
}
footer {
  padding-bottom: 30px;
}
.username {
  position: relative;
  i {
    font-size: 18px;
    position: absolute;
    right: 12px;
    top: 50%;
    margin-top: -9px;
  }
  .el-icon-circle-check {
    cursor: help;
  }
}
</style>
