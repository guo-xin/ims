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
        <el-select v-model="baseform.auth_province" @change="selectProvince">
          <el-option v-for="province in areas" :label="province.areaname" :value="province.areaid" :key="province.areaid"></el-option>
        </el-select>
        <el-select v-model="baseform.auth_city">
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
      <el-form-item label="所属业务员">
        <el-select v-model="baseform.slsm_userid">
          <el-option v-for="sale in sales" :label="sale.name" :value="sale.userid" :key="sale.userid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="username" label="登录账号">
        <el-input v-model="baseform.username"></el-input>
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
      <h4>微信</h4>
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
      <hr>
      <h4>支付宝</h4>
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
  // import config from 'config'
  export default {
    data() {
      return {
        isLoading: false,
        active: 2, // 当前步骤
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
    },
    methods: {
      next() {
        if (this.active === 0) {
          this.$refs['baseform'].validate((valid) => {
            if (valid) {
              this.active += 1
            }
          })
        } else if (this.active === 1) {
          this.$refs['bankinfoform'].validate((valid) => {
            if (valid) {
              this.active += 1
            }
          })
        } else {
          this.$refs['payfee'].validate((valid) => {
            if (valid) {
              // this.active += 1
              this.create()
              console.log(JSON.stringify(this.payfee))
            }
          })
        }
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      selectLevel(value) {
        console.log('selectLevel')
        this.levels.map((level, index) => {
          console.log(level.code)
          if (level.code === value) {
            this.allAgencys = level.parentinfo
          }
        })
        if (value === 1) {
          this.baseFormRules.levelcode = [
            {required: true, message: '请输入代理商级别'}
          ]
          this.baseFormRules.parent_uid = []
        } else {
          this.baseFormRules.levelcode = []
          this.baseFormRules.parent_uid = [
            {required: true, message: '请输入代理商级别'}
          ]
        }
        this.baseform.parent_uid = ''
      },
      selectProvince(value) {
        console.log('selectProvince')
        this.areas.map((area, index) => {
          console.log(area.areaid)
          if (area.areaid === value) {
            this.citys = area.cities
          }
        })
        this.baseform.auth_city = ''
        console.log(this.citys)
      },
      fetchAgencyLevel() {
        this.$http(`gapi/org/v1/api/tools/level`)
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
        this.$http(`gapi/org/v1/api/tools/slsm`)
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
        this.$http(`gapi/org/v1/api/tools/areacities`)
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.areas = data.data.records
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      create() {
        this.$http({
          method: 'post',
          url: 'gapi/org/v1/api/agent/create',
          data: qs.stringify({
            base: JSON.stringify(this.baseform),
            bankinfo: JSON.stringify(this.bankinfo),
            payfee: JSON.stringify(this.payfee)
          })
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.$message.success('创建成功')
            this.$router.push({name: 'agencyList'})
          } else {
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
  display: inline-block;
  vertical-align: top;
  margin-right: 80px;
}
.el-select {
  width: 200px;
}
.el-input {
  width: 300px;
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
</style>
