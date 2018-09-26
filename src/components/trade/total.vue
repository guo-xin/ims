<template>
  <div class="tradeTotal">
    <header class="page-header"><h2 class="page-title">{{$t('trade.total')}}</h2></header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :error="acrossMonthTip" :label="$t('trade.common.tradeDate')">
        <el-date-picker
          v-model="formData.date"
          @change="datePickerChange"
          type="daterange"
          :editable="false"
          size="large"
          value-format="yyyy-MM-dd"
          unlink-panels
          :start-placeholder="$t('common.startTime')"
          :end-placeholder="$t('common.endTime')"
          :clearable="false">
        </el-date-picker>
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
      <el-form-item :label="$t('trade.common.payPass')">
        <el-select v-model="formData.paytypes">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('trade.common.wechat')" value="wxpay"></el-option>
          <el-option :label="$t('trade.common.alipay')" value="alipay"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-row class="trade-total" :gutter="10">
      <el-col :span="12">
        <el-row type="flex" align="bottom">
          <el-col :span="8" class="head">
            <span>{{$t('trade.common.tradeAmount')}}</span>
            <strong>￥{{payTotal.total_txamt | formatCurrency}}</strong>
          </el-col>
          <el-col :span="8">
            <span>{{$t('trade.common.tradeCount')}}</span>
            <strong>{{payTotal.total_num}}</strong>
          </el-col>
          <el-col :span="8">
            <span>{{$t('trade.common.fee')}}</span>
            <strong>￥{{payTotal.total_settlefee | formatCurrency}}</strong>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" align="bottom">
          <el-col :span="8" class="head">
            <span>{{$t('trade.common.refundAmount')}}</span>
            <strong>￥{{refundTotal.total_txamt | formatCurrency}}</strong>
          </el-col>
          <el-col :span="8">
            <span>{{$t('trade.common.refundCount')}}</span>
            <strong>{{refundTotal.total_num}}</strong>
          </el-col>
          <el-col :span="8">
            <span>{{$t('trade.common.fee')}}</span>
            <strong>￥{{refundTotal.total_settlefee | formatCurrency}}</strong>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-table :data="trades" stripe>
      <el-table-column prop="base.sysdtm" :label="$t('trade.common.tradeDate')"></el-table-column>
      <el-table-column prop="base.shopname" :label="$t('trade.common.merchantName')"></el-table-column>
      <el-table-column prop="base.primary" :label="$t('trade.common.firstAgent')"></el-table-column>
      <el-table-column prop="base.secondary" :label="$t('trade.common.secondAgent')"></el-table-column>
      <el-table-column prop="base.busicd_info" :label="$t('trade.common.payPass')"></el-table-column>
      <el-table-column :label="$t('trade.common.payTrade')" align="center">
        <el-table-column align="left" prop="success.num" :label="$t('trade.common.count')"></el-table-column>
        <el-table-column align="center" prop="success.txamt" :formatter="formatYuan" :label="$t('trade.common.amount')"></el-table-column>
        <el-table-column align="right" prop="success.settlefee" :formatter="formatYuan" :label="$t('trade.common.fee')"></el-table-column>
      </el-table-column>
      <el-table-column :label="$t('trade.common.refundTrade')" align="center">
        <el-table-column align="left" prop="cancel.num" :label="$t('trade.common.count')"></el-table-column>
        <el-table-column align="center" prop="cancel.txamt" :formatter="formatYuan" :label="$t('trade.common.amount')"></el-table-column>
        <el-table-column align="right" prop="cancel.settlefee" :formatter="formatYuan" :label="$t('trade.common.fee')"></el-table-column>
      </el-table-column>
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
  export default {
    data() {
      return {
        isLoading: false,
        acrossMonthTip: '',
        formData: {
          date: [],
          mchnt_name: '',
          mchnt_id: '',
          primary_agentid: '',
          secondary_agentid: '',
          paytypes: ''
        },
        noMatch: false,
        payTotal: {
          total_num: 0,
          total_settlefee: 0,
          total_txamt: 0
        },
        refundTotal: {
          total_num: 0,
          total_settlefee: 0,
          total_txamt: 0
        },
        trades: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
    },
    filters: {
      formatCurrency (number) {
        if (isNaN(number)) return
        number = (number / 100).toFixed(2)
        return number
      }
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
      formatYuan(row, column, cellValue) {
        cellValue = (cellValue / 100).toFixed(2)
        return cellValue
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
      fetchData() {
        if (this.formData.date.length < 2) {
          this.acrossMonthTip = this.$t('trade.common.pleaseSelect') + this.$t('trade.common.tradeDate')
        }
        if (this.acrossMonthTip) {
          return false
        }
        this.isLoading = true
        let params = {
          page: this.currentPage - 1,
          page_size: this.pageSize,
          mchnt_id: this.formData.mchnt_id,
          trade_start_time: this.formData.date[0] ? this.formData.date[0] + ' 00:00:00' : '',
          trade_end_time: this.formData.date[1] ? this.formData.date[1] + ' 23:59:59' : '',
          primary_agentid: this.formData.primary_agentid,
          secondary_agentid: this.formData.secondary_agentid,
          paytypes: this.formData.paytypes
        }
        this.$http(`${config.host}/org/trade/total`, {
          params
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.trades = data.data.shop_trade
            this.total = data.data.trade_cnt
            this.payTotal = data.data.total_success
            this.refundTotal = data.data.total_cancel
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
      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.fetchData()
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
      reset() {
        this.acrossMonthTip = ''
        this.formData = {
          date: [],
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
  %shadow {
    box-shadow: 2px 6px 8px rgba(142, 169, 190, 0.1);
  }
  .el-table thead th {
    padding: 12px 0;
  }
  .trade-total {
    margin-bottom: 15px;
    > .el-col:last-child .el-row{
      border-color: #FF3366;
    }
    .el-row {
      height: 113px;
      padding-bottom: 22px;
      border-left: 6px solid #2974FF;
      border-radius: 6px;
      background-color: #fff;
      @extend %shadow;
      >.el-col {
        padding-left: 20px;
      }
    }
    .head {
      span {
        font-size: 14px;
      }
      strong {
        font-size: 38px;
      }
    }
    span {
      font-size: 12px;
      color: #717283;
    }
    strong {
      line-height: 1;
      margin-top: 8px;
      font-size: 24px;
      display: block;
    }
  }
</style>
