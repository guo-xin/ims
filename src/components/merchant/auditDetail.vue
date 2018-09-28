<template>
  <div class="mchnt-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('merchant.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('merchant.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.basic.subtitle')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la1')}}</span>
          <span class="basic-content">{{cate[form.userinfo.cate]}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la2')}}</span>
          <span class="basic-content">{{form.userinfo.audit_status_str}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la4')}}</span>
          <span class="basic-content">{{form.qdinfo.qd_name}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la6')}}</span>
          <span class="basic-content">{{form.qdinfo.slsm_name}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la7')}}</span>
          <span class="basic-content">{{form.userinfo.legalperson}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.bankinfo.bankmobile}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la9')}}</span>
          <span class="basic-content">{{form.userinfo.email}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la10')}}</span>
          <span class="basic-content">{{form.userinfo.jointime}}</span>
        </el-col>
      </el-row>
    </section>
    <section class="shop">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.shop.subtitle')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.shop.la1')}}</span>
          <span class="basic-content">{{form.userinfo.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.shop.la2')}}</span>
          <span class="basic-content">{{form.userinfo.address}}</span>
        </el-col>
      </el-row>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.rates.subtitle')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.rates.wechat')}}</span>
          <span class="basic-content">{{form.fee_ratios.tenpay_ratio}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.rates.ali')}}</span>
          <span class="basic-content">{{form.fee_ratios.alipay_ratio}}</span>
        </el-col>
      </el-row>
    </section>

    <section class="payment">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.pay.subtitle')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.pay.la1')}}</span>
          <span class="basic-content">{{form.bankinfo.bankuser}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.pay.la2')}}</span>
          <span class="basic-content">{{form.bankinfo.bankaccount}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.pay.la3')}}</span>
          <span class="basic-content">{{form.bankinfo.headbankname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.pay.la4')}}</span>
          <span class="basic-content">{{form.bankinfo.bankname}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.pay.la5')}}</span>
          <span class="basic-content">{{form.bankinfo.bankProvince}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.pay.la6')}}</span>
          <span class="basic-content">{{form.bankinfo.bankcode}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.pay.la7')}}</span>
          <span class="basic-content">{{form.bankinfo.bankCity}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.pay.la8')}}</span>
          <span class="basic-content">{{form.bankinfo.bankmobile}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.pay.la9')}}</span>
          <span class="basic-content">{{banktype[form.bankinfo.banktype]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <span class="basic-label">{{$t('merchant.detail.pay.la10')}}</span>
        </el-col>
        <el-col :span="20">
          <img :src="item.url" v-for="(item,idx) in form.vouchers" class="voucher_photo" :key="idx"/>
        </el-col>
      </el-row>
    </section>

    <section class="audit-log">
      <div class="banner">
        <div class="title">{{$t('audit.detail.title')}}</div>
        <div class="divider"></div>
      </div>
      <el-table :data="form.audit_logs" stripe v-loading="isLoading">
        <el-table-column prop="create_user" :label="$t('audit.detail.table.creator')">
          <template slot-scope="scope">
            {{ scope.row.create_user }}
          </template>
        </el-table-column>

        <el-table-column prop="create_date" :label="$t('audit.detail.table.create_date')">
          <template slot-scope="scope">
            {{ scope.row.create_date }}
          </template>
        </el-table-column>

        <el-table-column prop="result"  :label="$t('audit.detail.table.result')">
          <template slot-scope="scope">
            {{ scope.row.result_str }}
          </template>
        </el-table-column>

        <el-table-column prop="memo"  :label="$t('audit.detail.table.memo')">
          <template slot-scope="scope">
            {{ scope.row.memo }}
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="do-audit">
      <div class="banner">
        <div class="title">{{$t('audit.detail.doit')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="2">
          <span class="basic-label">{{$t('audit.detail.table.memo')}}</span>
        </el-col>
        <el-col :span="22">
          <el-form v-loading="isLoading" ref="memo" :model="memo" class="memo-form" :rules="auditRules">
            <el-form-item prop="memo" label="">
              <el-input v-model.trim="memo.memo"
                        type="textarea"
                        :rows="8"
                        resize="none"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-button type="primary" @click="judgeHandler(this, $event)" ref="passed" name="1">{{$t('audit.detail.pass')}}</el-button>
        <el-button type="primary" @click="judgeHandler(this, $event)" ref="rejected" name="0">{{$t('audit.detail.re')}}</el-button>
      </el-row>
    </section>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  import ElButton from "../../../node_modules/qfpay-element-ui/packages/button/src/button.vue";
  const getParams = (key) => {
    // 获取参数
    let url = window.location.hash.split('?')[1] || '';
    // 正则筛选地址栏
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    // 匹配目标参数
    let result = url.match(reg)
    // 返回参数值
    return result ? decodeURIComponent(result[2]) : ''
  }
  export default {
    components: {ElButton},
    data() {
      return {
        isLoading: false,
        isEditable: false,
        temp: [],
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        banktype: {
          "1": this.$t('common.privata'),
          "2": this.$t('common.pub')
        },
        form: {
          userinfo: {
            userid: this.$route.query.userid || getParams('userid'),
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
            mcc_str: ''
          },
          fee_ratios: {
            tenpay_ratio: '',
            alipay_ratio: '',
          },
          qdinfo: {
            qd_name: '',
            slsm_name: ''
          },
          bankinfo: {
            bankmobile: '',
            jointime: ''
          },
          audit_logs: []
        },
        memo: {
          memo: ''
        },
        auditRules: {
          'memo': [
            {required: true, message: this.$t('audit.detail.msg1')}
          ]
        }
      }
    },
    created() {
      console.log(this.$route.query)
      this.isEditable = this.$route.query.from === 'old'
      this.fetchDetailData()
    },
    methods: {
      judgeHandler(context, e) {
        let params = {
          userid: this.form.userinfo.userid,
          audit_status: e.currentTarget.name,
          memo: this.memo.memo,
          format: 'cors'
        }
        this.$refs['memo'].validate((valid) => {
          if (valid) {
            axios.post(`${config.host}/org/mchnt/audit`, qs.stringify(params), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then((res) => {
                let data = res.data;
                this.loading = false;
                if (data.respcd === config.code.OK) {
                  this.$message.success('审核完成')
                  this.$router.push({
                    name: 'mchnt_audit_list'
                  })
                } else {
                  this.$message.error(data.respmsg);
                }
              }).catch(() => {
              this.loading = false;
              this.$message.error(this.$t('common.netError'));
            });
          }
        })
      },
      cancel() {
        this.$router.push({name: 'mchnt_audit_list'})
      },
      editHandler() {
        this.$router.push({name: 'mchntCreate', params: {command: 'edit', userid: this.form.userinfo.userid}})
      },
      fetchDetailData() {
        axios.get(`${config.host}/org/mchnt/info`, {
          params: {
            userid: this.form.userinfo.userid,
            mode: 'audit',
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
      }
    }
  }
</script>
<style lang="scss">
  .mchnt-detail {
    background-color: #fff;
    padding: 0 $baseGap;
    padding-bottom: $baseGap;
    .noborder {border:none !important;}
    .do-audit {
      .memo-form {
        width:100%;
        .el-form-item {
          width:100%;
        }
      }
    }
    footer {
      padding-bottom: 30px;
    }
    .banner {
        padding: 28px $baseGap 0 0; margin-bottom: $miderGap;
        .title {
          font-size:$bigSize;
          font-weight:bold;
          color:#1D1D24;
        }
        .divider {
          width:50px;
          height:2px;
          margin-top:$miderGap;
          background-color:#232629;
        }
    }

    .basic,.shop,.rates,.payment {
      .el-row {
        padding: $smGap 0 0 0;
        .basic-label {
          font-size:$baseSize;
          font-weight:$bolderW;
          color:rgba(29,29,36,1);
          line-height:$baseSize;
        }
        .basic-content {
          margin-left: $smGap;
          font-size:$baseSize;
          font-weight:$baseW;
          color:#717283;
          line-height:$baseSize;
        }
      }
    }
    .payment {
      .voucher_photo {
        width:200px;
        height:150px;
        display:inline-block;
        margin-left:$smGap;
      }
    }
  }
</style>
