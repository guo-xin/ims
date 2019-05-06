<template>
  <div class="sales-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('salesman.detail.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('shop.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('salesman.detail.subtitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la1')}}</span>
          <span class="basic-content">{{userInfo.qd_name}}</span>
        </el-col>

        <el-col :span="14">
          <span class="basic-label">{{$t('salesman.detail.slsm_uid')}}</span>
          <span class="basic-content">{{userInfo.userid}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('salesman.detail.status')}}</span>
          <span class="basic-content">{{status[userInfo.status]}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('salesman.detail.salesname')}}</span>
          <span class="basic-content">{{userInfo.salesname}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('salesman.detail.mobile')}}</span>
          <span class="basic-content">{{userInfo.mobile}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('salesman.detail.email')}}</span>
          <span class="basic-content">{{userInfo.email}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('salesman.detail.idnumber')}}</span>
          <span class="basic-content">{{userInfo.idnumber}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('salesman.detail.date')}}</span>
          <span class="basic-content">{{userInfo.ctime}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('salesman.detail.password')}}</span>
          <span class="basic-content">{{userInfo.password}}</span>
        </el-col>
      </el-row>
      <div class="banner">
        <div class="title">{{$t('salesman.detail.picture')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="basic-content-p">
            <img :src="userInfo.idcardfront"  class="voucher_photo" />
          </div>
        </el-col>
      </el-row>
    </section>

    <footer v-if="isEditable && !!userInfo.is_edit">
      <el-button @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
    </footer>
    <footer v-if="isReEditable && !!userInfo.is_edit">
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
        status: {
          0: this.$t('salesman.engaged'),
          1: this.$t('salesman.retired'),
        },
        userInfo: {
          qd_name: '',
          userid: this.$route.query.userid || getParams('userid'),
          salesname: '',
          mobile: '',
          idnumber: '',
          idcardfront: '', // 上传的照片
          status: '',
          email: '',
          ctime: '',
          is_edit: 0
        }
      }
    },
    created() {
      this.isEditable = 'old'.indexOf(this.$route.query.from) > -1;
      this.isReEditable = this.$route.query.from === 'edit';
      this.fetchDetailData()
    },
    methods: {
      cancel() {
        this.$router.push({name: 'salesList'})
      },
      editHandler() {
        this.$router.push({name: 'salesCreate', query: {command: 'edit', userid: this.userInfo.userid}})
      },
      fetchDetailData() {
        axios.get(`${config.host}/org/salesman/info`, {
          params: {
            userid: this.userInfo.userid,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.userInfo = data.data;
              this.userInfo.password = '********';
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
  .sales-detail {
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

    .basic {
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
            width:300px;
            height:216px;
            display:inline-block;
            margin-left:$smGap;
          }
        }
      }
    }
  }
</style>
