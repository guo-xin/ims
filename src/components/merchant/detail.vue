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
          <span class="basic-label">{{$t('merchant.detail.basic.la4')}}</span>
          <span class="basic-content">{{form.qdinfo.qd_name}}</span>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la6')}}</span>
          <span class="basic-content">{{form.qdinfo.slsm_name}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la17')}}</span>
          <span class="basic-content">{{form.qdinfo.slsm_mobile}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.shop.la1')}}</span>
          <span class="basic-content">{{form.userinfo.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la1')}}</span>
          <span class="basic-content">{{cate[form.userinfo.cate]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la2')}}</span>
          <span class="basic-content">{{form.userinfo.mcc_str}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la11')}}</span>
          <span class="basic-content">{{form.userinfo.name}}</span>
        </el-col>

      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la18')}}</span>
          <span class="basic-content">{{form.userinfo.telephone}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la12')}}</span>
          <span class="basic-content">{{form.userinfo.address}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la7')}}</span>
          <span class="basic-content">{{form.userinfo.legalperson}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.userinfo.email}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la13')}}</span>
          <span class="basic-content">{{form.userinfo.location}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la14')}}</span>
          <span class="basic-content">{{form.userinfo.post}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la19')}}</span>
          <span class="basic-content">{{form.userinfo.licensenumber}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la9')}}</span>
          <span class="basic-content">{{status[form.userinfo.status]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <span class="basic-label">{{$t('merchant.detail.basic.la10')}}</span>
          <span class="basic-content">{{form.userinfo.jointime}}</span>
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
          <span class="basic-label">{{$t('merchant.detail.basic.la15')}}</span>
          <span class="basic-content">{{isSigned[form.userinfo.is_contract]}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="basic-label">{{$t('merchant.detail.basic.la16')}}</span>
          <span class="basic-content">{{period[form.userinfo.settlement_time]}}</span>
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
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.pay.la6')}}</span>
          <span class="basic-content">{{form.bankinfo.bankcode}}</span>
        </el-col>
      </el-row>

      <!--<el-row>-->
        <!--<el-col :span="4">-->
          <!--<span class="basic-label">{{$t('merchant.detail.pay.la10')}}</span>-->
        <!--</el-col>-->
        <!--<el-col :span="20">-->
          <!--<img :src="item.url" v-for="(item,idx) in form.vouchers" class="voucher_photo" :key="idx"/>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </section>
    <footer v-if="isEditable">
      <el-button @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
    </footer>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
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
        isSigned: {
          0: this.$t('merchant.detail.signed.no'),
          1: this.$t('merchant.detail.signed.yes'),
        },
        period: {
          month: this.$t('merchant.detail.p.m'),
          week: this.$t('merchant.detail.p.w'),
          date: this.$t('merchant.detail.p.d'),
        },
        status: {
            1: this.$t('merchant.detail.up'),
            0: this.$t('merchant.detail.down')
         },
        form: {
          userinfo: {
            userid: this.$route.query.userid || getParams('userid'), // 商户ID
            user_type: '',
            groupid: '',
            cate: '',
            address: '', // 公司地址
            provice: '',
            city: '',
            email: '',
            mobile: '',
            legalperson: '', // 公司联系人
            shopname: '', // 商户名称
            name: '', // 公司名称
            audit_status_str: '',
            jointime: '',
            mcc: '', // 店铺类型编码，仅可以填数字
            mcc_str: '' // 商户类型名称
          },
          fee_ratios: {
            tenpay_ratio: ''
          },
          qdinfo: {
            qd_name: '', // 所属代理商名称
            qd_uid: '', //  所属代理商ID
            slsm_name: '', // 业务员名称
            slsm_uid: '', //  业务员ID
            slsm_mobile: '' // 业务员手机号
          },
          bankinfo: {
            bankaccount: '', // 银行帐号
            headbankname: '', // 总行名称
            bankname: '', // 支行名称
            bankuser: '', // 银行帐户名称
            bankcode: '', // SWIFT代码
            jointime: ''
          }
        }
      }
    },
    created() {
      console.log(this.$route.query)
      this.isEditable = this.$route.query.from === 'old'
      this.fetchDetailData()
    },
    methods: {
      cancel() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      editHandler() {
        this.$router.push({name: 'mchntCreate', params: {command: 'edit', userid: this.form.userinfo.userid}})
      },
      fetchDetailData() {
        axios.get(`${config.host}/org/mchnt/info`, {
          params: {
            userid: this.form.userinfo.userid,
            type: 'bigmerchant',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
                console.log('%%%%%%%%%%$$############# detail:', data.data)
                this.form = data.data
//                for (let key of Object.keys(data.data.fee_ratios)) {
//                  if(key !== 'userid') {
//                    tempArr.push({key: key, value: data.data.fee_ratios[key] || ' '})
//                  }
//                }
//                this.form.fee_ratios = tempArr
//                this.temp = tempArr.concat([]);
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
    padding: 0 $baseGap $baseGap $baseGap;
    .noborder {border:none !important;}
    footer {
      padding-top: $baseGap;
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
