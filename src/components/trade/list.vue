<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">{{$t('trade.detail')}}</h2>
      <el-button v-if="hasExportPerm" size="large" type="primary" @click="exportExcel()">{{$t('common.export')}}</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :error="acrossMonthTip" :label="$t('trade.common.tradeTime')">
        <el-date-picker
          v-model="formData.date"
          @change="datePickerChange"
          type="daterange"
          :editable="false"
          size="large"
          value-format="yyyy-MM-dd"
          unlink-panels
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('trade.common.sNum')">
        <el-input v-model="formData.trade_syssn"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trade.common.tradeType')">
        <el-select v-model="formData.trade_type">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('trade.common.pay')" value="success"></el-option>
          <el-option :label="$t('trade.common.refund')" value="cancel"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('trade.common.payPass')">
        <el-select v-model="formData.paytypes">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('trade.common.wechat')" value="wxpay"></el-option>
          <el-option :label="$t('trade.common.alipay')" value="alipay"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')">
        <el-select v-model="formData.trade_status">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('trade.common.success')" value="1"></el-option>
          <el-option :label="$t('trade.common.failed')" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('trade.common.merchantName')">
        <el-autocomplete
          v-model="formData.mchnt_name"
          :debounce="600"
          :fetch-suggestions="getMchntName"
          :trigger-on-focus="false"
          :popper-class="noMatch ? 'nomatch' : ''"
          @select="mchntNameHandleSelect"
          @blur="mchntNameHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('trade.common.firstAgent')">
        <el-autocomplete
          v-model="formData.primary_agent"
          :fetch-suggestions="getPrimaryAgent"
          :debounce="800"
          :trigger-on-focus="false"
          :popper-class="noMatch ? 'nomatch' : ''"
          @select="primaryAgentHandleSelect"
          @blur="primaryAgentHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item :label="$t('trade.common.secondAgent')">
        <el-autocomplete
          v-model="formData.secondary_agent"
          :fetch-suggestions="getSecondaryAgent"
          :trigger-on-focus="false"
          :popper-class="noMatch ? 'nomatch' : ''"
          @select="secondaryAgentHandleSelect"
          @blur="secondaryAgentHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="trades" v-loading="isLoading" stripe>
      <el-table-column prop="sysdtm" :label="$t('trade.common.tradeTime')" width="170"></el-table-column>
      <el-table-column prop="syssn" :label="$t('trade.common.sNum')"></el-table-column>
      <el-table-column prop="name" :label="$t('trade.common.merchantName')"></el-table-column>
      <el-table-column prop="shopname" :label="$t('trade.common.shopName')"></el-table-column>
      <el-table-column prop="busicd_info" :label="$t('trade.common.payPass')"></el-table-column>
      <el-table-column prop="txamt" :formatter="formatYuan" :label="$t('trade.common.tradeAmount')"></el-table-column>
      <el-table-column prop="settlefee" :formatter="formatYuan" :label="$t('trade.common.fee')"></el-table-column>
      <el-table-column prop="trade_type" :formatter="formatType" :label="$t('trade.common.tradeType')"></el-table-column>
      <el-table-column prop="trade_status" :formatter="formatStatus" :label="$t('common.status')"></el-table-column>
    </el-table>

    <el-pagination
      v-show="trades.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  import config from 'config'
  import qs from 'qs'
  export default {
    data() {
      return {
        formData: {
          date: [],
          trade_syssn: '',
          trade_status: '',
          trade_type: '',
          paytypes: '',
          primary_agent: '',
          primary_agentid: '',
          secondary_agent: '',
          secondary_agentid: '',
          mchnt_name: '',
          mchnt_id: ''
        },
        noMatch: false,
        acrossMonthTip: '',
        isLoading: false,
        trades: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      hasExportPerm() {
        return this.$store.getters.hasPermission('trade_detail_export')
      }
    },
    created() {
      let today = new Date()
      this.formData.date.push(this.formatDate(today))
      this.formData.date.push(this.formatDate(today))
      this.fetchData()
    },
    methods: {
      datePickerChange(daterange) {
        let startMonth = daterange[0].substr(0, 7)
        let endMonth = daterange[1].substr(0, 7)
        if (startMonth !== endMonth) {
          this.acrossMonthTip = this.$t('trade.common.inSameMonth')
        } else {
          this.acrossMonthTip = ''
        }
      },
      formatDate(date) {
        // 参数格式: new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        let day = date.getDate()
        day = day < 10 ? '0' + day : day
        return `${year}-${month}-${day}`
      },
      formatType(row, column, cellValue) {
        return cellValue === 'success' ? this.$t('trade.common.pay') : this.$t('trade.common.refund')
      },
      formatYuan(row, column, cellValue) {
        cellValue = (cellValue / 100).toFixed(2)
        return cellValue
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? this.$t('trade.common.success') : this.$t('trade.common.failed')
      },
      fetchData() {
        if (this.formData.date.length < 2) {
          this.acrossMonthTip = this.$t('trade.common.pleaseSelect') + this.$t('trade.common.tradeTime')
        }
        if (this.acrossMonthTip) {
          return false
        }
        this.isLoading = true
        let params = {
          page: this.currentPage - 1,
          page_size: this.pageSize,
          trade_start_time: this.formData.date[0] ? this.formData.date[0] + ' 00:00:00' : '',
          trade_end_time: this.formData.date[1] ? this.formData.date[1] + ' 23:59:59' : '',
          trade_syssn: this.formData.trade_syssn,
          trade_status: this.formData.trade_status,
          trade_type: this.formData.trade_type,
          paytypes: this.formData.paytypes,
          mchnt_id: this.formData.mchnt_id,
          primary_agentid: this.formData.primary_agentid,
          secondary_agentid: this.formData.secondary_agentid
        }
        this.$http(`${config.host}/org/trade/list`, {
          params
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.trades = data.data.trade_infos
            this.total = data.data.trade_cnt
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      getMchntName(queryString, cb) {
        let tip = [{'value': this.$t('trade.common.noData')}]
        this.$http(`${config.host}/org/tools/merchants`, {
          params: {
            mchnt_name: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            if (data.data.length > 0) {
              this.noMatch = false
              cb(data.data)
            } else {
              this.noMatch = true
              cb(tip)
            }
          }
        })
      },
      getPrimaryAgent(queryString, cb) {
        if (!queryString) {
          return
        }
        let tip = [{'value': this.$t('trade.common.noData')}]
        this.$http(`${config.host}/org/tools/agents`, {
          params: {
            primary_agent: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            if (data.data.length > 0) {
              this.noMatch = false
              cb(data.data)
            } else {
              this.noMatch = true
              cb(tip)
            }
          }
        })
      },
      getSecondaryAgent(queryString, cb) {
        if (!queryString) {
          return
        }
        let tip = [{'value': this.$t('trade.common.noData')}]
        this.$http(`${config.host}/org/tools/agents`, {
          params: {
            secondary_agent: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.data.length > 0) {
            this.noMatch = false
            cb(data.data)
          } else {
            this.noMatch = true
            cb(tip)
          }
        })
      },
      exportExcel() {
        let lang = sessionStorage.getItem('oasbp_lang') || 'en-us'
        let params = {
          trade_start_time: this.formData.date[0] ? this.formData.date[0] + ' 00:00:00' : '',
          trade_end_time: this.formData.date[1] ? this.formData.date[1] + ' 23:59:59' : '',
          trade_syssn: this.formData.trade_syssn,
          trade_status: this.formData.trade_status,
          trade_type: this.formData.trade_type,
          paytypes: this.formData.paytypes,
          mchnt_id: this.formData.mchnt_id,
          primary_agentid: this.formData.primary_agentid,
          secondary_agentid: this.formData.secondary_agentid,
          lang
        }
        window.location.href = `${config.host}/org/trade/list/download?${qs.stringify(params)}`
      },
      mchntNameHandleSelect(item) {
        if (item.uid) {
          this.formData.mchnt_name = item.value
          this.formData.mchnt_id = item.uid
        } else {
          this.formData.mchnt_name = ''
          this.formData.mchnt_id = ''
        }
      },
      mchntNameHandleBlur() {
        this.formData.mchnt_name = ''
        this.formData.mchnt_id = ''
      },
      primaryAgentHandleSelect(item) {
        if (item.id) {
          this.formData.primary_agent = item.value
          this.formData.primary_agentid = item.id
        } else {
          this.formData.primary_agent = ''
          this.formData.primary_agentid = ''
        }
      },
      primaryAgentHandleBlur() {
        this.formData.primary_agent = ''
        this.formData.primary_agentid = ''
      },
      secondaryAgentHandleSelect(item) {
        if (item.id) {
          this.formData.secondary_agent = item.value
          this.formData.secondary_agentid = item.id
        } else {
          this.formData.secondary_agent = ''
          this.formData.secondary_agentid = ''
        }
      },
      secondaryAgentHandleBlur() {
        this.formData.secondary_agent = ''
        this.formData.secondary_agentid = ''
      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 1
        }
        this.fetchData()
      },
      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.fetchData()
      },
      reset() {
        this.acrossMonthTip = ''
        let today = new Date()
        let date = [this.formatDate(today), this.formatDate(today)]
        this.formData = {
          date,
          trade_syssn: '',
          trade_status: '',
          trade_type: '',
          paytypes: '',
          primary_agent: '',
          primary_agentid: '',
          secondary_agent: '',
          secondary_agentid: '',
          mchnt_name: '',
          mchnt_id: ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
