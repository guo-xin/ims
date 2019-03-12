<template>
  <div class="roleList">
    <header class="page-header">
      <h2 class="page-title">{{$t('system.log.title')}}</h2>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :label="$t('system.log.username')" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.log.shopname')" prop="shopname">
        <el-input v-model="formData.shopname"></el-input>
      </el-form-item>
      <el-form-item :label="$t('system.log.operation_date')" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="date">
        </el-date-picker>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="logs" v-loading="isLoading" stripe>
      <el-table-column prop="username" :label="$t('system.log.username')"></el-table-column>
      <el-table-column prop="shopname" :label="$t('system.log.shopname')"></el-table-column>
      <el-table-column prop="ipaddr" :label="$t('system.log.ipaddr')" min-width="90"></el-table-column>
      <el-table-column prop="type" :label="$t('system.log.type')"></el-table-column>
      <el-table-column prop="ctime" :label="$t('system.log.operation_date')" min-width="120"></el-table-column>
      <el-table-column prop="operation" :label="$t('system.log.operation')"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" :label="$t('system.log.status')"></el-table-column>
    </el-table>

    <el-pagination
      v-show="logs.length > 0"
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
  import { formatDate } from '../../common/js/util'
  export default {
    data() {
      return {
        isLoading: false,
        formData: {
          username: '',
          shopname: '',
          date: new Date()
        },
        logs: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? this.$t('trade.common.success') : this.$t('trade.common.failed')
      },
      search() {
        this.pageSize = 10
        this.currentPage = 1
        this.fetchData()
      },
      fetchData() {
        let startTime = '', endTime = ''
        if (this.formData.date) {
          startTime = formatDate(this.formData.date, 'yyyy-MM-dd') + ' 00:00:00'
          endTime = formatDate(this.formData.date, 'yyyy-MM-dd') + ' 23:59:59'
        }
        this.isLoading = true
        this.$http(`${config.host}/org/logs/list`, {
          params: {
            username: this.formData.username,
            shopname: this.formData.shopname,
            start_time: startTime,
            end_time: endTime,
            page: this.currentPage - 1,
            page_size: this.pageSize
          }
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.logs = data.data.oprecord_infos
            this.total = data.data.oprecord_cnt
          } else {
            this.logs = []
            this.$message.error(data.resperr)
          }
        })
      },
      reset() {
        this.$refs['searchform'].resetFields()
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
      }
    }
  }
</script>
