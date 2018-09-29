<template>
  <div class="settleDetail">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T1') }}</h2>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('settleMent.panel.orderNo')" prop="syssn">
        <el-input v-model="form.syssn"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.tradeTime')" prop="date" class="date-form-item">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          :editable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false"
          :start-placeholder="$t('common.startTime')"
          :end-placeholder="$t('common.endTime')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.settleType')" prop="settle_role">
        <el-select v-model="form.settle_role" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('settleMent.table.agent')" value=1></el-option>
          <el-option :label="$t('settleMent.table.firstAgent')" value=2></el-option>
          <el-option :label="$t('settleMent.table.secondAgent')" value=3></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleName')" prop="qd_uid">
        <el-select
          v-model="form.qd_uid"
          filterable
          remote
          :placeholder="$t('settleMent.msg.t18')"
          :remote-method="getPayList"
          :loading="searchLoading">
          <el-option
            v-for="item in payList"
            :key="item.qd_uid"
            :label="item.name"
            :value="item.qd_uid">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.payPass')" prop="chnlid">
        <el-select v-model="form.chnlid" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option v-for="(item, index) in passList" :label="item.chnlname" :value="item.chnlid" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleDetail')" prop="settle_type">
        <el-select v-model="form.settle_type" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('settleMent.table.income')" value=1></el-option>
          <el-option :label="$t('settleMent.table.expend')" value=2></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="detailList.list" stripe v-loading="loading">
      <el-table-column prop="trade_time" :label="$t('settleMent.panel.tradeTime')" min-width="150"></el-table-column>
      <el-table-column prop="syssn" :label="$t('settleMent.table.sNum')" min-width="120"></el-table-column>
      <el-table-column prop="mchnt_name" :label="$t('settleMent.table.merName')"></el-table-column>
      <el-table-column prop="shop_name" :label="$t('settleMent.table.shopName')"></el-table-column>
      <el-table-column prop="one_name" :label="$t('settleMent.table.firstAgent')"></el-table-column>
      <el-table-column :label="$t('settleMent.panel.settleDetail')">
        <template slot-scope="scope">
          {{ settleList[scope.row.settle_role] + (scope.row.settle_type === 1 ? $t('settleMent.table.income') : $t('settleMent.table.expend')) }}
        </template>
      </el-table-column>
      <el-table-column prop="txamt" :label="$t('settleMent.table.tradeAmount')"></el-table-column>
      <el-table-column prop="clearing_ratio" :label="$t('settleMent.table.settlePercent')"></el-table-column>
      <el-table-column prop="clearing_amt" :label="$t('settleMent.table.settleAmount')"></el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="detailList.total >= 1">
      <el-button size="large" type="primary" @click="down" class="el-button-primary" v-if="basicAuth.includes('clearing_detail_export')">{{  $t('common.export') }}</el-button>
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="detailList.total"
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
  import qs from 'qs';

  export default {
    data() {
      let [start, end] = [new Date(), new Date()];
      if(start) {
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
      }
      if(end) {
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);
      }

      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        iconLoading: false,
        searchLoading: false,
        payList: [],
        passList: [],
        settleList: {
          1: this.$t('settleMent.table.agent'),
          2: this.$t('settleMent.table.firstAgent'),
          3: this.$t('settleMent.table.secondAgent')
        },
        form: {
          syssn: '',
          date: [start, end],
          settle_role: '',
          settle_type: '',
          chnlid: '',
          qd_uid: ''
        },
        detailList: {}
      }
    },
    computed: {
      detailHref() {
        let detailParmas = Object.assign({}, this.basicParams, {mode: 'expo_excel'});
        return `${config.host}/org/clearing/detail/list?${qs.stringify(detailParmas)}`;
      },
      basicParams() {
        let form = this.form;
        let date = form.date;

        return {
          syssn: form.syssn,
          start_time: date[0] || '',
          end_time: date[1] || '',
          settle_role: form.settle_role,
          settle_type: form.settle_type,
          chnlid: form.chnlid,
          qd_uid: form.qd_uid,
          offset: this.currentPage - 1,
          pageSize: this.pageSize,
          format: 'cors'
        }
      },

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

      // 导出
      down() {
        let a = document.createElement('a');
        a.setAttribute('download', true);
        a.setAttribute('href', this.detailHref);
        a.click();
      },

      // 动态获取结算方
      getPayList(query) {
        if (query !== '') {
          this.searchLoading = true;
          axios.get(`${config.host}/org/tools/qdnames`, {
            params: {
              qdname: query,
              format: 'cors'
            }
          }).then((res) => {
            let data = res.data;
            this.searchLoading = false;
            if(data.respcd === config.code.OK) {
              this.payList = data.data || [];
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.searchLoading = false;
            this.$message.error(this.$t('common.netError'));
          })
        }
      },

      // 获取通道列表
      getList () {
        let list = this.$store.state.passList;
        if(list) {
          this.passList = list;
        }else {
          axios.get(`${config.host}/org/clearing/temp/chnls?format=cors`).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.passList = data.data;
              this.$store.state.passList = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.$message.error(this.$t('common.netError'));
          });
        }
      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/clearing/detail/list`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.detailList = data.data;
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
