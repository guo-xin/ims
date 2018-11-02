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
          <span class="basic-label">{{$t('shop.detail.basic.la1')}}</span>
          <span class="basic-content">{{ form.userinfo.name}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la2')}}</span>
          <span class="basic-content">{{form.userinfo.username}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la3')}}</span>
          <span class="basic-content">{{form.userinfo.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la4')}}</span>
          <span class="basic-content">{{form.userinfo.telephone}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la5')}}</span>
          <span class="basic-content">{{form.userinfo.location}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la6')}}</span>
          <span class="basic-content">{{form.userinfo.address}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la7')}}</span>
          <span class="basic-content">{{form.userinfo.post}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.userinfo.operating}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la9')}}</span>
          <span class="basic-content">{{form.userinfo.additional}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('shop.detail.basic.la10')}}</span>
          <span class="basic-content">{{form.userinfo.website}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <span class="basic-label">{{$t('shop.detail.basic.la11')}}</span>
           <span class="basic-content-p">
             <img :src="item.url" v-for="(item,url) in form.vouchers" class="voucher_photo" :key="url"/>
          </span> 
        </el-col>
      </el-row>
    </section>

    <footer v-if="isEditable">
      <el-button>{{$t('merchant.detail.edit')}}</el-button>
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
            website: ''
          },
          vouchers: []
        }
      }
    },
    created() {
      console.log("这是门店管理打印的参数")
      console.log(this.$route.query)
      this.isEditable = this.$route.query.from === 'old'
      this.fetchDetailData()
    },
    methods: {
      cancel() {
        this.$router.push({name: 'shop_manage_list'})
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
          line-height:$baseSize;
          vertical-align:top;
        }
        .basic-content {
          margin-left: $smGap;
          font-size:$baseSize;
          font-weight:$baseW;
          color:#717283;
          line-height:$baseSize;
        }
        .basic-content-p {
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
