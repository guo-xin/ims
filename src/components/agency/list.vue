<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">代理商列表</h2>
      <el-button size="large" type="primary" @click="createRole()">创建</el-button>
    </header>

    <el-form class="search-form" :model="formData">
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商ID">
        <el-input v-model="formData.qd_uid"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select v-model="formData.level" placeholder="请选择级别">
          <el-option label="全部" value=""></el-option>
          <el-option label="一级" value="1"></el-option>
          <el-option label="二级" value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value="0"></el-option>
          <el-option label="停用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">查找</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </el-form>

    <el-table :data="agencies" stripe v-loading="isLoading">
      <el-table-column prop="name" label="代理商名称"></el-table-column>
      <el-table-column prop="qd_uid" label="代理商ID"></el-table-column>
      <el-table-column prop="level" :formatter="formatLevel" label="等级"></el-table-column>
      <el-table-column prop="parent_name" label="上级代理商名称"></el-table-column>
      <el-table-column width="170" prop="join_dtm" label="注册时间"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="状态" align="center"></el-table-column>
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
    created() {
      this.fetchData()
    },
    methods: {
      formatLevel(row, column, cellValue) {
        return cellValue === 1 ? '一级' : '二级'
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 0 ? '启用' : '停用'
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
            page: this.currentPage,
            page_size: this.pageSize,
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
      },
      createRole() {
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

<style scoped lang="scss">

</style>
