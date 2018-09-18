<template>
  <div class="new-mchnt">
    <header class="page-header style2">
      <h2 class="page-title">{{this.isUpdate ? '修改商户' : '添加商户'}}</h2>
        <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>关闭</span></el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="结算信息"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseinfo" :model="form.userinfo" :rules="baseRules">
      <h3>{{$t('merchant.newMerchant.basic.cap1')}}</h3>
      <el-form-item prop="username" label="商户账号">
        <el-input v-model.trim="form.userinfo.username"></el-input>
      </el-form-item>
      <el-form-item prop="shopname" label="商户名称">
        <el-input v-model.trim="form.userinfo.shopname"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="公司名称">
        <el-input v-model.trim="form.userinfo.name"></el-input>
      </el-form-item>
      <el-form-item prop="legalperson" label="法人姓名">
        <el-input v-model.trim="form.userinfo.legalperson"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="地址">
        <el-input v-model.trim="form.userinfo.address"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮件">
        <el-input v-model.trim="form.userinfo.email"></el-input>
      </el-form-item>
      <el-form-item prop="cate" label="注册商户">
        <el-select v-model="form.userinfo.cate">
          <el-option label="普通子商户" value="merchant"></el-option>
          <el-option label="大商户" value="bigmerchant"></el-option>
          <el-option label="连锁门店" value="submerchant"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user_type" label="商户类型">
        <el-select v-model="form.userinfo.user_type" @change="selectUserTypeHandler">
          <el-option label="小微" value="1"></el-option>
          <el-option label="个体" value="2"></el-option>
          <el-option label="企业" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="mcc" label="店铺类型编码">
        <el-input v-model.trim="form.userinfo.mcc" placeholder="仅数字" type="number"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_username" label="业务员账号" v-if="!isUpdate">
        <el-input v-model.trim="form.userinfo.slsm_username" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_name" label="业务员账号" v-if="isUpdate">
        <el-input v-model.trim="form.qdinfo.slsm_name" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="telphone" label="业务员联系方式">
        <el-input v-model.trim="form.userinfo.telphone"></el-input>
      </el-form-item>

      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <el-form-item prop="tenpay_ratio" label="商户费率">
        <span class="rate_label">微信支付：</span><el-input-number v-model="form.fee_ratios.tenpay_ratio" :precision="3" :step="0.001" :min="0" :max="1" @change="numberChange"></el-input-number>
      </el-form-item>
      <el-form-item prop="alipay_ratio" label="商户费率">
        <span class="rate_label">支付宝：</span><el-input-number v-model="form.fee_ratios.alipay_ratio" :precision="3" :step="0.001" :min="0" :max="1"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- step2 :rules="bankRules"-->
    <el-form v-show="active === 1" ref="bankinfo"  :model="form.bankinfo">
      <h3>结算信息</h3>
      <el-form-item prop="bankuser" label="账户名称">
        <el-input v-model="form.bankinfo.bankuser"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" label="清算账号">
        <el-input v-model="form.bankinfo.bankaccount"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" label="总行名称">
        <el-input v-model="form.bankinfo.headbankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankname" label="支行名称">
        <el-input v-model="form.bankinfo.bankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankProvince" label="银行省">
        <el-input v-model="form.bankinfo.bankProvince"></el-input>
      </el-form-item>
      <el-form-item prop="bankCity" label="银行市">
        <el-input v-model="form.bankinfo.bankCity"></el-input>
      </el-form-item>
      <el-form-item prop="bankcode" label="联行号">
        <el-input v-model="form.bankinfo.bankcode"></el-input>
      </el-form-item>
      <el-form-item prop="bankmobile" label="预留手机号">
        <el-input v-model="form.bankinfo.bankmobile"></el-input>
      </el-form-item>
      <el-form-item prop="banktype" label="银行账户类型">
        <el-select v-model="form.bankinfo.banktype">
          <el-option label="对私" value="1"></el-option>
          <el-option label="对公" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <footer v-if="isUpdate">
      <el-button v-show="active === 0" type="primary" @click="next">下一步</el-button>
      <el-button v-show="active === 1" @click="pre">上一步</el-button>
      <el-button v-show="active === 1" @click="next">完成</el-button>
    </footer>
    <footer v-else>
      <el-button type="primary" @click="next">
        {{active === 1 ? '完成' : '下一步'}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">上一步</el-button>
    </footer>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  import ElFormItem from "../../../node_modules/qfpay-element-ui/packages/form/src/form-item.vue";
  export default {
    components: {ElFormItem},
    data() {
      return {
        isLoading: false,
        isUpdate: false,
        active: 0, // 当前步骤,
        form: {
          userinfo: {
            userid: '',
            user_type: '',
            groupid: '',
            cate: '',
            address: '',
            provice: '',
            city: '',
            email: '',
            mobile: '',
            legalperson: '',
            shopname: '',
            name: '', // 公司名称
            audit_status: '',
            audit_status_str: '',
            jointime: '',
            mcc: '', // 店铺类型编码，仅可以填数字
            mcc_str: '',
            slsm_username: '' // 业务员账号
          },
          qdinfo: {
            slsm_name: '',
            slsm_uid: ''
          },
          fee_ratios: {
            tenpay_ratio: '',
            alipay_ratio: ''
          },
          bankinfo: {
            bankaccount: '',
            bankProvince: '',
            bankCity: '',
            headbankname: '',
            bankname: '',
            bankuser: '',
            bankcode: '',
            bankmobile: '',
            banktype: '',
            jointime: ''
          },
          vouchers: []
        },
        baseRules: {
          'shopname': [
            {required: true, message: '请输入商户名称'}
            ],
          'name': [
            {required: true, message: '请输入公司名称'}
          ],
          'mode': [
            {required: true, message: '请选择注册商户'}
          ],
          'email': [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        },
        bankRules: {
          'bankaccount': [
            {
              validator: (rule, val, cb) => {
                if (/\d/g.test(+val)) {
                  cb();
                } else {
                  cb(new Error('银行卡号必须是数字'))
                }
              }
            }
          ],
          'bankmobile': [
            {
              validator: (rule, val, cb) => {
                if(val === '') {
                  cb();
                } else if (/!\d/g.test(+val)) {
                  cb(new Error('手机号必须是数字'));
                }
              }
            }
          ]
        }
      }
    },
    created() {
      if(this.$route.params) {
        this.isUpdate = this.$route.params.command === 'edit'
        console.log("this.$route.params###################:", this.$route.params)
        if(this.isUpdate) {
          this.getDetailInfo();
        }else {
          this.baseRules['slsm_username'] = [
            {required: true, message: '请输入业务员账号'}
          ]
        }
      }
    },
    methods: {
      getDetailInfo() {
        axios.get(`${config.host}/org/mchnt/info`, {
          params: {
            userid: this.$route.params.userid,
            mode: 'info',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.form = data.data
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      create() {
        let params1 = Object.assign(this.form.userinfo, this.form.fee_ratios, this.form.qdinfo)
        let parmas2 = Object.assign(this.form.bankinfo, {vouchers: JSON.stringify(this.form.vouchers)})
        let params = Object.assign(params1, parmas2)
        let url = this.isUpdate ? `${config.host}/org/mchnt/edit` : `${config.host}/org/mchnt/signup`
        params.format = 'cors'
        if(this.isUpdate) {
          delete params['slsm_username']
        }
        axios.post(url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
              this.$router.push({
                name: 'mchntDetail',
                query: {userid: data.data.userid, from: (this.isUpdate ? 'new' : 'old')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      next() {
        if (this.active === 0) {
          this.$refs['baseinfo'].validate((valid) => {
            if (valid) {
              this.active += 1
              if (!this.isUpdate) {
                localStorage.setItem('new_baseinfo', JSON.stringify(this.form.userinfo))
              }
            }
          })
        } else if (this.active === 1) { // 创建 完成
          this.$refs['bankinfo'].validate((valid) => {
            if (valid) {
              this.create()
            }
          })
        }
      },
      numberChange(v) {
        console.log(this.form.fee_ratios.tenpay_ratio)
      },
      cancelHandler() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      selectUserTypeHandler(value) {
        console.log(this.form.userinfo.user_type)
      }
    }
  }
</script>
<style lang="scss">
  .new-mchnt {
    background-color: #fff;
    padding: 0 30px;
    height: 600px;
    overflow-y: auto;
    footer {
      padding-bottom: 30px;
    }
    .el-steps {
      padding-right: 75px;
      /*flex-basis: 33.33%;*/
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
      .el-form-item {
        /*width: 300px;*/
        display: inline-block;
        vertical-align: top;
        margin-right: 80px;
        .el-form-item__content {
          width:300px;
          .rate_label {
            font-size: 14px;
            color:#717283;
            padding: 0 $smGap;
          }
        }
      }
      .el-form-item:nth-of-type(3n) {
        /*margin-right: 0;*/
      }
    }

  }
</style>
