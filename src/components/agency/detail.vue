<template>
  <div class="agencyDetail" v-loading="isLoading">
    <header class="page-header style2">
      <h2 class="page-title">代理商详情</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>关闭</span></el-button>
    </header>
    <h3>基本信息</h3>
    <ul>
      <li><em>代理商名称：</em><span>{{base.name}}</span></li>
      <li><em>代理商级别：</em><span>{{base.levelcode === 1 ? '一级代理' : '二级代理'}} {{base.parent_name}}</span></li>
      <li><em>代理商简称：</em><span>{{base.short_name}}</span></li>
      <li><em>代理区域：</em><span>{{base.auth_province}} {{base.auth_city}}</span></li>
      <li><em>地址：</em><span>{{base.address}}</span></li>
      <li><em>联系人：</em><span>{{base.business_name}}</span></li>
      <li><em>法人：</em><span>{{base.legal_name}}</span></li>
      <li><em>联系人电话：</em><span>{{base.business_mobile}}</span></li>
      <li><em>法人电话：</em><span>{{base.mobile}}</span></li>
      <li><em>所属业务员：</em><span>{{base.slsm_name}}</span></li>
      <li><em>登录账号：</em><span>{{base.username}}</span></li>
    </ul>
    <h3>结算信息</h3>
    <ul>
      <li><em>账户名称：</em><span>{{bankinfo.bankuser}}</span></li>
      <li><em>结算账号：</em><span>{{bankinfo.bankaccount}}</span></li>
      <li><em>总行名称：</em><span>{{bankinfo.headbankname}}</span></li>
      <li><em>支行名称：</em><span>{{bankinfo.bankname}}</span></li>
      <li><em>联行号：</em><span>{{bankinfo.bankcode}}</span></li>
    </ul>
    <h3>支付费率</h3>
    <ul>
      <li><em>微信：</em><span>{{payfee.wechat_fee}}%</span></li>
      <li><em>支付宝：</em><span>{{payfee.alipay_fee}}%</span></li>
    </ul>
    <el-button size="large" @click="cancel()">关闭</el-button>
    <el-button size="large" type="primary" @click="editAgency()">修改</el-button>
  </div>
</template>

<script>
  import config from 'config'
  export default {
    data() {
      return {
        isLoading: false,
        base: {},
        bankinfo: {},
        payfee: {}
      }
    },
    created() {
      let agencyId = this.$route.params.id
      this.fetchData(agencyId)
    },
    methods: {
      fetchData(agencyId) {
        this.isLoading = true
        this.$http(`${config.host}/org/agent/${agencyId}`)
        .then((res) => {
          let data = res.data
          let agency = res.data.data
          if (data.respcd === '0000') {
            this.isLoading = false
            this.base = agency.agent_base
            this.bankinfo = agency.agent_bankinfo
            this.payfee = agency.agent_payfee
            localStorage.setItem('baseEdit', JSON.stringify(agency.agent_base))
            localStorage.setItem('bankinfoEdit', JSON.stringify(agency.agent_bankinfo))
            localStorage.setItem('payfeeEdit', JSON.stringify(agency.agent_payfee))
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      cancel() {
        this.$router.push({name: 'agencyList'})
      },
      editAgency() {
        localStorage.removeItem('hasEdit')
        this.$router.push({name: 'agencyEdit'})
      }
    }
  }
</script>

<style scoped lang="scss">
.agencyDetail {
  background-color: #fff;
  padding: 0 30px 30px;
  ul {
    margin: 0;
    color: #1D1D24;
    font-size: 14px;
    padding-left: 0;
    list-style: none;
    li {
      width: 40%;
      vertical-align: top;
      display: inline-block;
      margin-bottom: 14px;
    }
    span {
      color: #717283;
    }
  }
  em {
    font-style: normal;
  }
  h3 {
    position: relative;
    padding: 26px 0 12px;
    margin: 0 0 26px;
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
  .el-button {
    margin-top: 12px;
  }
}
</style>
