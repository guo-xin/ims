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
          <span class="basic-content">{{form.userinfo.cate}}</span>
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
          <span class="basic-content">{{form.bankinfo.jointime}}</span>
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
        <div v-for="(item,idx) in form.fee_ratios" :key="idx">
          <el-col :span="10"  v-if="item.key==='tenpay_ratio'">
            <span class="basic-label">{{item.key}}</span>
            <span class="basic-content">{{item.value}}</span>
          </el-col>
          <el-col :span="14" v-if="item.key==='alipay_ratio'">
            <span class="basic-label">{{item.key}}</span>
            <span class="basic-content">{{item.value}}</span>
          </el-col>
        </div>
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
            mode: 'info',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
                let tempArr = [];
                this.form = data.data
                for (let key of Object.keys(data.data.fee_ratios)) {
                  if(key !== 'userid') {
                    tempArr.push({key: key, value: data.data.fee_ratios[key] || ' '})
                  }
                }
                this.form.fee_ratios = tempArr
                this.temp = tempArr.concat([]);
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
