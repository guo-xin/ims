<template>
  <div class="agencyCreate">
    <header class="page-header style2"><h2 class="page-title">添加渠道</h2></header>
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseform" :rules="baseFormRules" :model="baseform">
      <h3>基本信息</h3>
      <el-form-item prop="name" label="代理商名称">
        <el-input v-model="baseform.name"></el-input>
      </el-form-item>
      <el-form-item :prop="baseform.levelcode >= 2 ? 'parent_uid' : 'levelcode'" label="代理商级别" style="width:446px">
        <el-select v-model="baseform.levelcode" @change="selectLevel">
          <el-option v-for="level in levels" :label="level.text" :value="level.code" :key="level.code"></el-option>
        </el-select>
        <el-select :disabled="baseform.levelcode === 1" v-model="baseform.parent_uid" placeholder="所属代理">
          <el-option v-for="agency in allAgencys" :label="agency.name" :value="agency.qd_uid" :key="agency.qd_uid"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item prop="short_name" label="代理商简称">
        <el-input v-model="baseform.short_name"></el-input>
      </el-form-item>
      <el-form-item prop="auth_province" label="代理区域" style="width:446px">
        <el-select ref="province" v-model="baseform.auth_province" @change="selectProvince">
          <el-option v-for="province in areas" :label="province.areaname" :value="province.areaid" :key="province.areaid"></el-option>
        </el-select>
        <el-select ref="city" v-model="baseform.auth_city">
          <el-option v-for="city in citys" :label="city.cityname" :value="city.cityid" :key="city.cityid"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item prop="address" label="地址">
        <el-input v-model="baseform.address"></el-input>
      </el-form-item>
      <el-form-item prop="business_name" label="联系人">
        <el-input v-model="baseform.business_name"></el-input>
      </el-form-item>
      <el-form-item prop="legal_name" label="法人">
        <el-input v-model="baseform.legal_name"></el-input>
      </el-form-item>
      <el-form-item prop="business_mobile" label="联系人电话">
        <el-input v-model="baseform.business_mobile"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="法人电话">
        <el-input v-model="baseform.mobile "></el-input>
      </el-form-item>
      <el-form-item prop="slsm_userid" label="所属业务员">
        <el-select v-model="baseform.slsm_userid" :disabled="baseform.levelcode > 1">
          <el-option v-for="sale in sales" :label="sale.name" :value="sale.userid" :key="sale.userid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="username" prop="username" label="登录账号" :error="isRegisteredErrorMessage">
        <el-input @blur="verifyRegister" @focus="clearRegisterError" v-model="baseform.username"></el-input>
        <i v-show="isRegisterLoading" class="el-icon-loading"></i>
        <i v-show="!isRegisterLoading && !isRegistered" title="可以使用" class="el-icon-circle-check" style="color:#67c10d"></i>
      </el-form-item>
      <el-form-item prop="password" label="登录密码">
        <el-input v-model="baseform.password"></el-input>
      </el-form-item>
    </el-form>

    <el-form v-show="active === 1" ref="bankinfoform" :rules="bankinfoFormRules" :model="bankinfo">
      <h3>结算信息</h3>
      <el-form-item prop="bankuser" label="账户名称">
        <el-input v-model="bankinfo.bankuser"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" label="结算账号">
        <el-input v-model="bankinfo.bankaccount"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" label="总行名称">
        <el-input v-model="bankinfo.headbankname"></el-input>
      </el-form-item>
      <hr/>
      <el-form-item prop="bankname" label="支行名称">
        <el-input v-model="bankinfo.bankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankcode" label="联行号">
        <el-input v-model="bankinfo.bankcode"></el-input>
      </el-form-item>
    </el-form>

    <el-form v-show="active === 2" class="payfee-form" ref="payfee" :rules="payfeeFormRules" :model="payfee">
      <h3>支付通道信息</h3>
      <header><h4>支付方式</h4><h4>支付产品</h4></header>
      <div class="body">
        <div class="icon"><img src="./imgs/wechat.png"/><strong>微信支付</strong></div>
        <div class="payfee-container">
          <el-form-item prop="wechat_fee_public">
            <el-input type="number" v-model="payfee.wechat_fee_public">
              <template slot="prepend">公众号</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="wechat_fee_sweep">
            <el-input type="number" v-model="payfee.wechat_fee_sweep">
              <template slot="prepend">扫码</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="wechat_fee_H5">
            <el-input type="number" v-model="payfee.wechat_fee_H5">
              <template slot="prepend">H5</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="wechat_fee_sdk">
            <el-input type="number" v-model="payfee.wechat_fee_sdk">
              <template slot="prepend">SDK</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="body">
        <div class="icon"><img src="./imgs/alipay.png"/><strong>支付宝</strong></div>
        <div class="payfee-container">
          <el-form-item prop="alipay_service">
            <el-input type="number" v-model="payfee.alipay_service">
              <template slot="prepend">服务窗</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="alipay_sweep">
            <el-input type="number" v-model="payfee.alipay_sweep">
              <template slot="prepend">扫码</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="alipay_fee_H5">
            <el-input type="number" v-model="payfee.alipay_fee_H5">
              <template slot="prepend">H5</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="alipay_sdk">
            <el-input type="number" v-model="payfee.alipay_sdk">
              <template slot="prepend">SDK</template>
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <footer>
      <el-button type="primary" @click="next">
        {{active === 2 ? '完成' : '下一步'}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">上一步</el-button>
    </footer>
  </div>
</template>

<script>
  import qs from 'qs'
  import config from 'config'
  export default {
    data() {
      return {
        isLoading: false,
        active: 0, // 当前步骤
        baseform: {
          name: '',
          levelcode: '',
          parent_uid: '',
          slsm_userid: '',
          auth_province: '',
          auth_city: ''
        },
        bankinfo: {
          bankuser: '', // 账户名称
          bankaccount: '', // 结算账号
          headbankname: '', // 总行名称
          bankname: '', // 支行名称
          bankcode: '' // 网点联行号
        },
        payfee: {
          wechat_fee_H5: '', // 微信（H5）费率
          wechat_fee_public: '', // 微信（公众号）费率
          wechat_fee_sweep: '', // 微信（扫码）费率
          wechat_fee_sdk: '', // 微信（sdk）费率
          alipay_fee_H5: '', // 支付宝（H5）费率
          alipay_sweep: '', // 支付宝（扫码）费率
          alipay_sdk: '', // 支付宝（sdk）费率
          alipay_service: '' // 支付宝（服务窗）费率
        },
        levels: [], // 代理商级别
        allAgencys: [], // 所属代理
        areas: [], // 所有省份和城市
        citys: [], // 当前省的所有城市
        sales: [], // 业务员 列表
        isRegisterLoading: false,
        isRegistered: true, // 已注册
        isRegisteredErrorMessage: '', // 已注册报错文案
        baseFormRules: {
          'name': [
            {required: true, message: '请输入代理商名称'}
          ],
          'levelcode': [
            {required: true, message: '请输入代理商级别'}
          ],
          'auth_province': [
            {required: true, message: '请输入代理区域'}
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
        },
        payfeeFormRules: {
          'wechat_fee_public': [
            {required: true, message: '请输入正确数值'}
          ],
          'wechat_fee_sweep': [
            {required: true, message: '请输入正确数值'}
          ],
          'wechat_fee_H5': [
            {required: true, message: '请输入正确数值'}
          ],
          'wechat_fee_sdk': [
            {required: true, message: '请输入正确数值'}
          ],
          'alipay_service': [
            {required: true, message: '请输入正确数值'}
          ],
          'alipay_sweep': [
            {required: true, message: '请输入正确数值'}
          ],
          'alipay_fee_H5': [
            {required: true, message: '请输入正确数值'}
          ],
          'alipay_sdk': [
            {required: true, message: '请输入正确数值'}
          ]
        }
      }
    },
    created() {
      this.fetchAgencyLevel()
      this.fetchSalesman()
      this.fetchCity()
      let base = localStorage.getItem('base')
      let bankinfo = localStorage.getItem('bankinfo')
      let payfee = localStorage.getItem('payfee')
      if (base) {
        this.baseform = JSON.parse(base)
      }
      if (bankinfo) {
        this.bankinfo = JSON.parse(bankinfo)
      }
      if (payfee) {
        this.payfee = JSON.parse(payfee)
      }
    },
    methods: {
      next() {
        if (this.active === 0) {
          this.$refs['baseform'].validate((valid) => {
            if (valid) {
              this.active += 1
              localStorage.setItem('base', JSON.stringify(this.baseform))
            }
          })
        } else if (this.active === 1) {
          this.$refs['bankinfoform'].validate((valid) => {
            if (valid) {
              this.active += 1
              localStorage.setItem('bankinfo', JSON.stringify(this.bankinfo))
            }
          })
        } else {
          this.$refs['payfee'].validate((valid) => {
            if (valid) {
              // this.active += 1
              localStorage.setItem('payfee', JSON.stringify(this.payfee))
              this.create()
            }
          })
        }
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      selectLevel(value) {
        this.levels.map((level, index) => {
          if (level.code === value) {
            this.allAgencys = level.parentinfo
          }
        })
        if (value === 1) {
          this.baseFormRules.levelcode = [
            {required: true, message: '请输入代理商级别'}
          ]
          this.baseFormRules.slsm_userid = [
            {required: true, message: '请选择业务员'}
          ]
          this.baseFormRules.parent_uid = []
        } else {
          this.baseFormRules.levelcode = []
          this.baseFormRules.slsm_userid = []
          this.baseFormRules.parent_uid = [
            {required: true, message: '请输入所属代理'}
          ]
          this.baseform.slsm_userid = ''
        }
        this.baseform.parent_uid = ''
      },
      selectProvince(value, cityId) {
        this.areas.map((area, index) => {
          if (area.areaid === value) {
            this.citys = area.cities
          }
        })
        if (cityId) {
          this.baseform.auth_city = cityId
        } else {
          this.baseform.auth_city = ''
        }
      },
      fetchAgencyLevel() {
        this.$http(`${config.host}/org/v1/api/tools/level`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.levels = data.data.records
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      fetchSalesman() {
        this.$http(`${config.host}/org/v1/api/tools/slsm`)
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
        this.$http(`${config.host}/org/v1/api/tools/areacities`)
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.areas = data.data.records
            let base = JSON.parse(localStorage.getItem('base'))
            if (base.auth_city) {
              this.selectProvince(base.auth_province, base.auth_city)
            }
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      clearRegisterError() {
        this.isRegistered = true
        this.isRegisteredErrorMessage = ''
      },
      verifyRegister(event) {
        let username = event.target.value
        if (!username) {
          return false
        }
        this.isRegisterLoading = true
        this.$http(`${config.host}/org/v1/api/agent/check?username=${username}`)
        .then((res) => {
          this.isRegisterLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.isRegistered = false
            this.isRegisteredErrorMessage = ''
          } else if (data.respcd === '2102') {
            this.isRegistered = true
            this.isRegisteredErrorMessage = '登录账号已注册'
          }
        })
      },
      create() {
        // 接口传参需要 label，省市
        let paramsBase = this.baseform
        paramsBase.auth_province = this.$refs.province.selected.label
        paramsBase.auth_city = this.$refs.city.selected.label
        this.$http({
          method: 'post',
          url: `${config.host}/org/v1/api/agent/create`,
          data: qs.stringify({
            base: JSON.stringify(paramsBase),
            bankinfo: JSON.stringify(this.bankinfo),
            payfee: JSON.stringify(this.payfee)
          })
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.$message.success('创建成功')
            localStorage.removeItem('base')
            localStorage.removeItem('bankinfo')
            localStorage.removeItem('payfee')
            this.$router.push({name: 'agencyList'})
          } else {
            this.baseform.auth_province = this.$refs.province.selected.value
            this.baseform.auth_city = this.$refs.city.selected.value
            this.$message.error(data.resperr)
          }
        })
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
.payfee-form {
  background-color: transparent;
  padding: 0;
  h3 {
    margin-left: 20px;
  }
  header {
    height: 77px;
    line-height: 77px;
    background-color: #F5FAFF;
    border-bottom: 1px solid #2974FF;
    display: flex;
    h4 {
      align-items: center;
      margin: 0;
      width: 250px;
      padding-left: 30px;
    }
  }
  .body {
    display: flex;
    border-bottom: 1px solid #dcdfe6;
    > div:first-child {
      width: 250px;
      padding-left: 30px;
    }
    > div:last-child {
      width: 300px;
    }
    .icon {
      line-height: 20px;
      height: 20px;
      font-size: 14px;
      align-self: center;
      strong {
        font-weight: normal;
        color: #1D1D24;
      }
      img, strong {
        vertical-align: middle;
      }
      img {
        width: 26px;
        margin-right: 10px;
      }
    }
    .payfee-container {
      padding-top: 22px;
    }
  }
}
.el-select {
  width: 200px;
}
.el-steps {
  padding-right: 60px;
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
