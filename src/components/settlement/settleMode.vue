<template>
  <div class="settleManage">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T3') }}</h2>
      </div>
      <div class="header-right">
        <el-button size="large" type="primary" v-if="basicAuth.includes('clearing_template_create')" @click="create">{{  $t('settleMent.btn.add') }}</el-button>
        <el-button size="large" type="primary" v-if="basicAuth.includes('clearing_template_config')" @click="setting">{{  $t('settleMent.btn.set') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('settleMent.panel.modeName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.createTime')" prop="date" class="date-form-item">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          :editable="false"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.payPass')" prop="chnlid">
        <el-select v-model="form.chnlid" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option v-for="(item, index) in passList" :label="item.chnlname" :value="item.chnlid" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="manageList.list" stripe v-loading="loading">
      <el-table-column :label="$t('settleMent.table.order')" width="80px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('settleMent.panel.modeName')"></el-table-column>
      <el-table-column prop="chnlname" :label="$t('settleMent.panel.payPass')" min-width="120"></el-table-column>
      <!--<el-table-column prop="join_time" :label="$t('settleMent.table.payGoods')"></el-table-column>-->
      <el-table-column prop="update_time" :label="$t('settleMent.table.lastTime')" min-width="120"></el-table-column>
      <el-table-column prop="login_time" :label="$t('settleMent.table.isMode')">
        <template slot-scope="scope">
          {{ scope.row.is_default ? $t('settleMent.panel.yes') : $t('settleMent.panel.no') }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('settleMent.table.state')">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? $t('settleMent.table.open') : $t('settleMent.table.close') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.temp_id)" v-if="basicAuth.includes('clearing_template_detail')">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="manageList.total >= 1">
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
  import { formatDate } from '../../common/js/util'

  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        iconLoading: false,
        passList: [],
        form: {
          name: '',
          date: [new Date(), new Date()],
          chnlid: ''
        },
        manageList: {}
      }
    },
    computed: {
      basicAuth() {
        return this.$store.state.permissionData || [];
      }
    },

    created() {
      this.getData();
      this.getList();
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

      // 详情
      detail(id) {
        this.$router.push({ name: 'modDetail',
          query: {
          id: id
        } });
      },

      // 创建
      create() {
        this.$router.push({ name: 'modCreate',
          query: {
            create: true
        } });
      },

      // 配置
      setting() {
        this.$router.push({ name: 'settleSet' });
      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          let form = this.form;
          let date = form.date;
          let [start, end] = [date[0], date[1]];
          start.setHours(0);
          start.setMinutes(0);
          start.setSeconds(0);

          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          axios.get(`${config.host}/org/clearing/temp/list`, {
            params: {
              name: form.name,
              start_time: formatDate(start, 'yyyy-MM-dd HH:mm:ss'),
              end_time: formatDate(end, 'yyyy-MM-dd HH:mm:ss'),
              chnlid: form.chnlid,
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
