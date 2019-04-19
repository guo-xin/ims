<template>
  <div class="shop-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('shop.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('shop.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('shop.detail.basic.subtitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la3')}}</span>
          <span class="basic-content">{{form.userinfo.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la14')}}</span>
          <span class="basic-content">{{form.userinfo.short_name}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la12')}}</span>
          <span class="basic-content">{{form.userinfo.mchid}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la6')}}</span>
          <span class="basic-content">{{form.userinfo.address}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la4')}}</span>
          <span class="basic-content">{{form.userinfo.telephone}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.userinfo.operating}}</span>
        </el-col>
      </el-row>
    </section>

    <section>
      <div class="banner">
        <div class="title">{{$t('shop.detail.basic.subtitle')}}</div>
        <div class="divider"></div>
      </div>

      <div v-for="item in form.fee_ratios" :key="item.pid_name">
        <h3>{{item.pid_name}}</h3>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.ratio')}}:</span>
            <span class="basic-content">{{item.ratio}}</span>
          </el-col>
          <el-col :span="8" v-if="item.line_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.accessType')}}:</span>
            <span class="basic-content">{{accessType[item.line_type]}}</span>
          </el-col>
          <el-col :span="8" v-if="item.finance_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.applicationType')}}:</span>
            <span class="basic-content">{{applicationType[item.finance_type]}}</span>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.rates.setitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la17')}}</span>
          <span class="basic-content">{{form.bankinfo.bankuser}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la18')}}</span>
          <span class="basic-content">{{form.bankinfo.headbankname}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la19')}}</span>
          <span class="basic-content">{{form.bankinfo.bankaccount}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la20')}}</span>
          <span class="basic-content">{{form.bankinfo.bankProvince}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la13')}}</span>
          <span class="basic-content">{{form.bankinfo.bankcode}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la21')}}</span>
          <span class="basic-content">{{form.userinfo.remit_amt}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" v-if="form.vouchers.length>0">
          <span class="basic-label">{{$t('shop.detail.basic.la11')}}</span>
          <span class="basic-content-p">
             <img :src="item.url" v-for="(item,url) in form.vouchers" class="voucher_photo" :key="url"/>
          </span>
        </el-col>
      </el-row>
    </section>

    <footer v-if="isEditable">
      <el-button @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
    </footer>
    <footer v-if="isReEditable">
      <el-button @click="editHandler">{{$t('merchant.detail.redit')}}</el-button>
      <el-button @click="cancel">{{$t('merchant.detail.basic.close')}}</el-button>
    </footer>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
  import _ from 'lodash'
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
        isReEditable: false,
        form: {
          userinfo: {
            userid: this.$route.query.userid || getParams('userid'),
            name: '',
            username: '',
            shopname: '',
            telephone: '',
            location: '',
            address: '',
            post: '',
            operating: '',
            additional: '',
            website: '',
            remit_amt: ''
          },
          bankinfo: {},
          vouchers: [],
          fee_ratios: []
        },
        accessType: {
          'offline': this.$t('merchant.newMerchant.accessTypes.offline'),
          'online': this.$t('merchant.newMerchant.accessTypes.online')
        },
        applicationType: {
          'direct': this.$t('merchant.newMerchant.applicationTypes.direct'),
          'indirect': this.$t('merchant.newMerchant.applicationTypes.indirect')
        },
      }
    },
    created() {
      this.isEditable = 'old'.indexOf(this.$route.query.from) > -1;
      this.isReEditable = this.$route.query.from === 'edit';
      this.fetchDetailData()
    },
    methods: {
      cancel() {
        this.$router.push({name: 'shop_manage_list'})
      },
      editHandler() {
        this.$router.push({name: 'createStore', query: {command: 'edit', userid: this.form.userinfo.userid}})
      },
      fetchDetailData() {
        axios.get(`${config.host}/org/mchnt/sub/info`, {
          params: {
            userid: this.form.userinfo.userid,
            type: 'submerchant',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
                this.form.userinfo = data.data.userinfo;
                this.form.bankinfo = data.data.bankinfo;
                this.form.vouchers = _.filter(data.data.vouchers, (item) => {
                  return ~'goodsphoto|shopphoto|paypoint|otherphoto|otherphoto1|otherphoto2'.indexOf(item.name)
                })
                this.form.fee_ratios = data.data.fee_ratios
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
  .shop-detail {
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
          vertical-align:top;
          line-height:14px;
        }
        .basic-content {
          margin-left: $smGap;
          font-size:$baseSize;
          font-weight:$baseW;
          color:#717283;
          line-height:$baseSize;
          vertical-align:top;
        }
        .basic-content-p {
          font-size:$baseSize;
          font-weight:$baseW;
          color:#717283;
          line-height:$baseSize;
          .voucher_photo {
              width:200px;
              height:150px;
              display:inline-block;
              margin-left:$smGap;
          }
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
