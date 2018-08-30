<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">代理商列表</h2>
      <el-button size="large" type="primary" @click="createRole()">创建</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商ID">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="状态一" value="1"></el-option>
          <el-option label="状态二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-button size="large" type="primary" @click="filterAgencies()">查找</el-button>
    </el-form>

    <el-table :data="agencies" stripe>
      <el-table-column prop="name" label="代理商名称"></el-table-column>
      <el-table-column prop="id" label="代理商ID"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="uplevel" label="上级代理商名称"></el-table-column>
      <el-table-column prop="register_time" label="注册时间"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.status)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="actvCount"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          id: '',
          agree: '',
          status: ''
        },
        agencies: [{
          name: '代理商1',
          id: '',
          level: '',
          uplevel: '',
          register_time: '',
          status: ''
        }, {
          name: '代理商2',
          id: '',
          level: '',
          uplevel: '',
          register_time: '',
          status: ''
        }]
      }
    },
    created() {

    },
    methods: {
      filterAgencies(val) {

      },
      goDetail() {

      },
      createRole() {
        this.$router.push({name: 'agencyCreate'})
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
