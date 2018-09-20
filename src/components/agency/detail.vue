<template>
  <div class="agencyDetail" v-loading="isLoading">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('agent.agentDetail')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span></el-button>
    </header>
    <h3>{{$t('agent.baseInfo')}}</h3>
    <ul>
      <li><em>{{$t('agent.agentName')}}：</em><span>{{base.name}}</span></li>
      <li><em>{{$t('agent.agentLevel')}}：</em><span>{{base.levelcode === 1 ? $t('agent.agentLevel1') : $t('agent.agentLevel1')}} {{base.parent_name}}</span></li>
      <li><em>{{$t('agent.agentNickname')}}：</em><span>{{base.short_name}}</span></li>
      <li><em>{{$t('agent.agentArea')}}：</em><span>{{base.auth_province}} {{base.auth_city}}</span></li>
      <li><em>{{$t('agent.address')}}：</em><span>{{base.address}}</span></li>
      <li><em>{{$t('agent.contact')}}：</em><span>{{base.business_name}}</span></li>
      <li><em>{{$t('agent.legal')}}：</em><span>{{base.legal_name}}</span></li>
      <li><em>{{$t('agent.contactMobile')}}：</em><span>{{base.business_mobile}}</span></li>
      <li><em>{{$t('agent.legalMobile')}}：</em><span>{{base.mobile}}</span></li>
      <li><em>{{$t('agent.saleMan')}}：</em><span>{{base.slsm_name}}</span></li>
      <li><em>{{$t('agent.username')}}：</em><span>{{base.username}}</span></li>
      <li><em>{{$t('common.status')}}：</em><span>{{base.status === 0 ? this.$t('common.enable') : this.$t('common.disable')}}</span></li>
    </ul>
    <h3>{{$t('agent.settleInfo')}}</h3>
    <ul>
      <li><em>{{$t('agent.bankuser')}}：</em><span>{{bankinfo.bankuser}}</span></li>
      <li><em>{{$t('agent.bankaccount')}}：</em><span>{{bankinfo.bankaccount}}</span></li>
      <li><em>{{$t('agent.headbankname')}}：</em><span>{{bankinfo.headbankname}}</span></li>
      <li><em>{{$t('agent.bankname')}}：</em><span>{{bankinfo.bankname}}</span></li>
      <li><em>{{$t('agent.bankcode')}}：</em><span>{{bankinfo.bankcode}}</span></li>
    </ul>
    <h3>{{$t('agent.payRate')}}</h3>
    <ul>
      <li><em>{{$t('agent.wechat')}}：</em><span>{{payfee.wechat_fee}}%</span></li>
      <li><em>{{$t('agent.alipay')}}：</em><span>{{payfee.alipay_fee}}%</span></li>
    </ul>
    <el-button size="large" @click="cancel()">{{$t('common.close')}}</el-button>
    <el-button size="large" type="primary" @click="editAgency()">{{$t('common.edit')}}</el-button>
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
