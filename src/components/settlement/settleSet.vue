<template>
  <div class="settleSet">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T4') }}</h2>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('settleMent.panel.agentName')" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.payPass')" prop="chnl_id">
        <el-select v-model="form.chnl_id" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option v-for="(item, index) in passList" :label="item.chnlname" :value="item.chnlid" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="setList.list" stripe @row-click="setEdit" v-loading="loading">
      <el-table-column :label="$t('settleMent.table.order')">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('settleMent.panel.agentName')"></el-table-column>
      <el-table-column prop="province" :label="$t('settleMent.table.province')"></el-table-column>
      <el-table-column prop="city" :label="$t('settleMent.table.city')"></el-table-column>
      <el-table-column prop="address" :label="$t('settleMent.table.address')" min-width="120"></el-table-column>
      <el-table-column prop="mobile" :label="$t('settleMent.table.phone')"></el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="setList.total >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="setList.total"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title=" $t('settleMent.dialog.title') " :visible.sync="showConfirm" top="20%"
               :show-close="false" @close="showConfirm = false">
      <el-form :model="modForm" ref="modForm">
        <el-table :data="modForm">
          <el-table-column align="center" :label="$t('settleMent.panel.agentName')">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-form-item :label="$t('settleMent.panel.payPass')" prop="chnl_id">
            <el-select v-model="form.chnl_id" :placeholder="$t('common.choose')">
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(item, index) in passList" :label="item.chnlname" :value="item.chnlid" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-table>

      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showConfirm = false">{{ $t('common.close') }}</el-button>
        <el-button type="text" :loading="iconLoading" class="text-button" @click="save">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
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
        passList: [],
        showConfirm: false,
        iconLoading: false,
        form: {
          user: '',
          chnl_id: ''
        },
        modForm: {

        },
        setList: {}
      }
    },

    created() {
      this.getData();
      this.getList();
    },
    methods: {
      // 配置编辑
      setEdit() {
        this.$message.warning('等接口和设计图');
      },

      // 保存
      save() {
        this.$message.warning('等接口和设计图');
      },

      // 查找
      search() {
        this.handleSizeChange();
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          let form = this.form;
          axios.get(`${config.host}/org/clearing/config/list`, {
            params: {
              name: form.user,
              chnl_id: form.chnl_id,
              offset: this.currentPage - 1,
              pageSize: this.pageSize,
              format: 'cors'
            }
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.setList = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          });
        }
      },

      // 获取通道列表
      getList () {
        axios.get(`${config.host}/org/clearing/temp/chnls`).then((res) => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.passList = data.data;
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
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
