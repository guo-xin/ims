<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">角色管理</h2>
      <el-button size="large" type="primary" @click="createRole()">创建</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="角色名称">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table :data="roles" stripe>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <el-table-column prop="level" label="权限"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
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
  import config from 'config'
  export default {
    data() {
      return {
        formData: {
          name: '',
          status: ''
        },
        total: 0,
        roles: [],
        perms: [] // 权限
      }
    },
    created() {
      this.fetchData()
      this.getAllPerms()
    },
    methods: {
      fetchData() {
        this.$http(`${config.host}/org/perm/role/list`)
        .then((res) => {
          let data = res.data
          console.log(data)
          this.roles = data.data.list
          this.total = data.total
        })
      },
      getAllPerms() {
        this.$http(`${config.host}/org/perm/perms`)
        .then((res) => {
          let data = res.data
          console.log(data)
          // this.perms =
        })
      },
      filterAgencies(val) {

      },
      createRole() {

      }
    }
  }
</script>

<style scoped lang="scss">

</style>
