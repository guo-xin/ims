<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">交易明细</h2>
      <el-button size="large" type="primary" @click="exportExcel()">导出</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :error="acrossMonthTip" label="交易时间">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          :editable="false"
          size="large"
          value-format="yyyy-MM-dd"
          @change="datePickerChange"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="formData.trade_syssn"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="formData.trade_type">
          <el-option label="全部" value=""></el-option>
          <el-option label="支付" value="success"></el-option>
          <el-option label="退款" value="cancel"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付通道">
        <el-select v-model="formData.paytypes">
          <el-option label="全部" value=""></el-option>
          <el-option label="微信支付" value="wxpay"></el-option>
          <el-option label="支付宝" value="alipay"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易状态">
        <el-select v-model="formData.trade_status">
          <el-option label="全部" value=""></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-autocomplete
          v-model="formData.mchnt_name"
          :debounce="600"
          :fetch-suggestions="getMchntName"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="mchntNameHandleSelect"
          @blur="mchntNameHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="一级代理">
        <el-autocomplete
          v-model="formData.primary_agent"
          :fetch-suggestions="getPrimaryAgent"
          :debounce="800"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="primaryAgentHandleSelect"
          @blur="primaryAgentHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="二级代理">
        <el-autocomplete
          v-model="formData.secondary_agent"
          :fetch-suggestions="getSecondaryAgent"
          :trigger-on-focus="false"
          placeholder="请输入内容"
          @select="secondaryAgentHandleSelect"
          @blur="secondaryAgentHandleBlur"
        ></el-autocomplete>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">查找</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </el-form>

    <el-table :data="trades" v-loading="isLoading" stripe>
      <el-table-column prop="sysdtm" label="交易时间" width="170"></el-table-column>
      <el-table-column prop="syssn" label="流水号"></el-table-column>
      <el-table-column prop="shopname" label="商户简称"></el-table-column>
      <el-table-column prop="name" label="门店名称"></el-table-column>
      <el-table-column prop="busicd_info" label="支付通道"></el-table-column>
      <el-table-column prop="txamt" :formatter="formatYuan" label="交易金额"></el-table-column>
      <el-table-column prop="settlefee" :formatter="formatYuan" label="手续费"></el-table-column>
      <el-table-column prop="trade_type" :formatter="formatType" label="交易类型"></el-table-column>
      <el-table-column prop="trade_status" :formatter="formatStatus" label="状态"></el-table-column>
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
        acrossMonthTip: '',
        isLoading: false,
        trades: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
      let today = new Date()
      this.formData.date.push(this.formatDate(today))
      this.formData.date.push(this.formatDate(today))
      this.fetchData()
    },
    methods: {
      datePickerChange(date) {
        let startMonth = date[0].substring(0, 7)
        let endMonth = date[1].substring(0, 7)
        if (startMonth !== endMonth) {
          this.acrossMonthTip = '暂不支持跨月查询'
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
        return cellValue === 'success' ? '支付' : '退款'
      },
      formatYuan(row, column, cellValue) {
        cellValue = (cellValue / 100).toFixed(2)
        return cellValue
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? '成功' : '失败'
      },
      fetchData() {
        if (this.formData.date.length < 2) {
          this.acrossMonthTip = '请选择交易时间'
        }
        if (this.acrossMonthTip) {
          return false
        }
        this.isLoading = true
        let params = {
          page: this.currentPage,
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
        let tip = [{'value': '查无此商户'}]
        this.$http(`${config.host}/org/tools/merchants`, {
          params: {
            mchnt_name: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            if (data.data.length > 0) {
              cb(data.data)
            } else {
              cb(tip)
            }
          }
        })
      },
      getPrimaryAgent(queryString, cb) {
        if (!queryString) {
          return
        }
        let tip = [{'value': '查无此代理'}]
        this.$http(`${config.host}/org/tools/agents`, {
          params: {
            primary_agent: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            if (data.data.length > 0) {
              cb(data.data)
            } else {
              cb(tip)
            }
          }
        })
      },
      getSecondaryAgent(queryString, cb) {
        if (!queryString) {
          return
        }
        let tip = [{'value': '查无此代理'}]
        this.$http(`${config.host}/org/tools/agents`, {
          params: {
            secondary_agent: queryString
          }
        })
        .then((res) => {
          let data = res.data
          if (data.data.length > 0) {
            cb(data.data)
          } else {
            cb(tip)
          }
        })
      },
      exportExcel() {
        let params = {
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
        window.location.href = `${config.host}/org/trade/list/download?${qs.stringify(params)}`
      },
      mchntNameHandleSelect(item) {
        this.formData.mchnt_name = item.value
        this.formData.mchnt_id = item.uid
      },
      mchntNameHandleBlur() {
        this.formData.mchnt_name = ''
        this.formData.mchnt_id = ''
      },
      primaryAgentHandleSelect(item) {
        this.formData.primary_agent = item.value
        this.formData.primary_agentid = item.id
      },
      primaryAgentHandleBlur() {
        this.formData.primary_agent = ''
        this.formData.primary_agentid = ''
      },
      secondaryAgentHandleSelect(item) {
        this.formData.secondary_agent = item.value
        this.formData.secondary_agentid = item.id
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
