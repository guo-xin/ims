<template>
  <div class="settleManage">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T3') }}</h2>
      </div>
      <div class="header-right">
        <el-button size="large" type="primary" class="primary-button" @click="create()">{{  $t('settleMent.btn.add') }}</el-button>
        <el-button size="large" type="primary" class="primary-button" @click="setting()">{{  $t('settleMent.btn.set') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('settlement.panel.modeName')" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settlement.panel.createTime')" prop="role">
        <el-input v-model="form.role"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settlement.panel.payWay')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="userList.list" stripe v-loading="loading">
      <el-table-column prop="nickname" :label="$t('settleMent.table.order')"></el-table-column>
      <el-table-column prop="role_name" :label="$t('settleMent.panel.modeName')"></el-table-column>
      <el-table-column prop="username" :label="$t('settleMent.table.version')"></el-table-column>
      <el-table-column prop="join_time" :label="$t('settleMent.table.wayName')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.lastTime')" min-width="100"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.isMode')"></el-table-column>
      <el-table-column :label="$t('authority.panel.state')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 1">{{ $t('authority.panel.open') }}</span>
          <span v-else>{{ $t('authority.panel.close') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="userList.total >= 10">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="userList.total"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  // import qs from 'qs';

  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        iconLoading: false,
        form: {
          user: '',
          role: '',
          state: ''
        },
        userList: {},
        roleList: [],
      }
    },
    computed: {
      basicParams() {
        let form = this.form;
        return {
          nickname: form.user,
          role_name: form.role,
          state: form.state,
          offset: this.currentPage,
          pageSize: this.pageSize,
          format: 'cors'
        };
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 查找
      search() {
        this.handleSizeChange();
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      detail() {

      },

      // 创建
      create() {

      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/perm/user/list`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.userList = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          });
        }
      },

      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }

        this.getData();
      },

      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      }
    }
  }
</script>

<style lang="scss">

</style>
