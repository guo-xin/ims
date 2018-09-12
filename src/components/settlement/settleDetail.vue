<template>
  <div class="settleDetail">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T1') }}</h2>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('settleMent.panel.orderNo')" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.tradeTime')" prop="date" class="date-form-item">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          :editable="false"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleType')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.settleName')" prop="role">
        <el-autocomplete
          v-model="form.role"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.payPass')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleDetail')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="manageList.list" stripe v-loading="loading">
      <el-table-column prop="nickname" :label="$t('settleMent.panel.tradeTime')" min-width="100"></el-table-column>
      <el-table-column prop="role_name" :label="$t('settleMent.table.sNum')" min-width="150"></el-table-column>
      <el-table-column prop="username" :label="$t('settleMent.table.merName')"></el-table-column>
      <el-table-column prop="join_time" :label="$t('settleMent.table.shopName')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.dealer')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.panel.settleDetail')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.tradeAmount')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.settlePercent')"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.settleAmount')"></el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="manageList.total >= 1">
      <el-button size="large" type="primary" @click="down" class="el-button-primary">{{  $t('common.export') }}</el-button>
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="manageList.total"
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
          date: [new Date(), new Date()],
          state: ''
        },
        manageList: {}
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

      // 导出
      down() {
        let params = 'http://baidu.com';
        let a = document.createElement('a');
        a.setAttribute('download', true);
        a.setAttribute('href', params);
        a.click();
      },

      // 配置
      setting() {
        this.$router.push({ name: 'settleSet' });
      },
      querySearchAsync(string, cb) {
        axios.get(`${config.host}/org/perm/roles`).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            let list = [];
            for(let l of data.data) {
              list.push({
                name: l.code,
                value: l.name
              });
            }
            cb(list);
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {

        })
      },
      handleSelect(item) {
        console.log(item, 6666)
      },
      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          let form = this.form;
          axios.get(`${config.host}/org/perm/user/list`, {
            params: {
              nickname: form.user,
              role_name: form.date,
              state: form.state,
              offset: this.currentPage - 1,
              pageSize: this.pageSize,
              format: 'cors'
            }
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.manageList = data.data;
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
        if (current) {
          this.currentPage = current;
        }else {
          this.currentPage = 1;
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
