<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">{{$t('agent.agentList')}}</h2>
      <el-button v-if="hasCreatePerm" size="large" type="primary" @click="createAgency()">{{$t('common.create')}}</el-button>
    </header>

    <el-form class="search-form" :model="formData">
      <el-form-item :label="$t('agent.agentName')">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.agentId')">
        <el-input v-model="formData.qd_uid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('agent.agentLevel')">
        <el-select v-model="formData.level">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('agent.level1')" value="1"></el-option>
          <el-option :label="$t('agent.level2')" value="2"></el-option>
          <el-option :label="$t('agent.level3')" value="3"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')">
        <el-select v-model="formData.status">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('common.enable')" value="0"></el-option>
          <el-option :label="$t('common.disable')" value="1"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="agencies" stripe v-loading="isLoading" @row-click="goDetail" class="table-hover">
      <el-table-column prop="name" :label="$t('agent.agentName')"></el-table-column>
      <el-table-column prop="qd_uid" :label="$t('agent.agentId')"></el-table-column>
      <el-table-column prop="level" :formatter="formatLevel" :label="$t('agent.level')"></el-table-column>
      <el-table-column prop="parent_name" :label="$t('agent.leaderAgent')"></el-table-column>
      <el-table-column width="170" prop="join_dtm" :label="$t('agent.registerTime')"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" :label="$t('common.status')" align="center"></el-table-column>
    </el-table>

    <el-pagination
      v-show="agencies.length > 0"
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
        formData: {
          name: '',
          qd_uid: '',
          level: '',
          status: ''
        },
        agencies: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      hasCreatePerm() {
        return this.$store.getters.hasPermission('agent_manage_create')
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      formatLevel(row, column, cellValue) {
        return cellValue === 1 ? this.$t('agent.level1') : (cellValue === 2 ? this.$t('agent.level2') : this.$t('agent.level3'))
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 0 ? this.$t('common.enable') : this.$t('common.disable')
      },
      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.fetchData()
      },
      fetchData() {
        this.isLoading = true
        this.$http(`${config.host}/org/agent/list`, {
          params: {
            name: this.formData.name,
            qd_uid: this.formData.qd_uid,
            level: this.formData.level,
            status: this.formData.status,
            page: this.currentPage - 1,
            page_size: this.pageSize,
            format: 'cors'
          }
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          this.agencies = data.data.qd_infos
          this.total = data.data.qd_cnt
        })
      },
      reset() {
        this.formData = {
          name: '',
          qd_uid: '',
          level: '',
          status: ''
        }
        this.currentPage = 1
        this.pageSize = 10
        this.fetchData()
      },
      goDetail(row) {
        this.$router.push({
          name: 'agencyDetail',
          params: {
            id: row.qd_uid
          }
        })
      },
      createAgency() {
        this.$router.push({name: 'agencyCreate'})
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
