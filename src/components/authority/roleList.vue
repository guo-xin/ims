<template>
  <div class="roleList">
    <header class="page-header">
      <h2 class="page-title">{{$t('role.roleManage')}}</h2>
      <el-button v-if="hasRoleCreatePerm" size="large" type="primary" @click="createRole()">{{$t('common.create')}}</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :label="$t('role.roleName')">
        <el-input v-model="formData.role_name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('common.status')">
        <el-select v-model="formData.status">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('common.enable')" value="1"></el-option>
          <el-option :label="$t('common.disable')" value="0"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="roles" v-loading="isLoading" stripe @row-click="editRole" class="table-hover">
      <el-table-column prop="role_name" :label="$t('role.roleName')" width="180"></el-table-column>
      <el-table-column prop="ctime" :label="$t('role.createTime')" width="180"></el-table-column>
      <el-table-column prop="perms" :formatter="formatPerms" :label="$t('role.role')"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" :label="$t('common.status')" width="80"></el-table-column>
    </el-table>

    <el-pagination
      v-show="roles.length > 0"
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
          role_name: '',
          status: ''
        },
        roles: [],
        perms: [], // 权限
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      hasRoleCreatePerm() {
        return this.$store.getters.hasPermission('perm_role_create')
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      formatPerms(row, column, cellValue) {
        let perms = []
        cellValue.map((item) => {
          perms.push(item.descr)
        })
        return perms.join(' \\ ')
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? this.$t('common.enable') : this.$t('common.disable')
      },
      search() {
        this.pageSize = 10
        this.currentPage = 1
        this.fetchData()
      },
      fetchData() {
        this.isLoading = true
        this.$http(`${config.host}/org/perm/role/list`, {
          params: {
            name: this.formData.role_name,
            status: this.formData.status,
            offset: this.currentPage - 1,
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          this.roles = data.data.list
          this.total = data.data.total
        })
      },
      createRole() {
        this.$router.push({name: 'roleCreate'})
      },
      editRole (row) {
        localStorage.setItem('roleInfo', JSON.stringify(row))
        this.$router.push({
          name: 'roleEdit',
          params: {
            code: row.code
          }
        })
      },
      reset() {
        this.formData.role_name = ''
        this.formData.status = ''
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
