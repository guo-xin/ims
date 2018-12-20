<template>
  <div class="merchant">
    <header class="page-header">
      <h2 class="page-title">{{$t('audit.title')}}</h2>
    </header>
    <el-form class="search-form" :model="formData" ref="mchnt_list_form">
      <el-form-item :label="$t('merchant.form.mchtid')" prop="userid">
        <el-input v-model="formData.userid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent1')" prop="qd_uid">
        <el-select v-model="formData.qd_uid" @change="selectChannelHandler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent2')" prop="qd_uid2">
        <el-select v-model="formData.qd_uid2" :placeholder="$t('merchant.form.ph')">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels2" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('audit.form.audit_state')" prop="audit_status">
        <el-select v-model="formData.audit_status">
          <el-option :label="$t('common.audit')" :value="-1"></el-option>
          <el-option :label="$t('common.refuse')" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="audits" stripe  @current-change="selectCurrentRowHandler" v-loading="isLoading">
      <el-table-column prop="userid" :label="$t('merchant.table.mchtid')">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>

      <el-table-column width="170" prop="shopname" :label="$t('merchant.table.mchtname')">
        <template slot-scope="scope">
          {{ scope.row.shopname }}
        </template>
      </el-table-column>

      <el-table-column width="170" prop="address"  :label="$t('merchant.table.address')">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>

      <el-table-column prop="mobile"  :label="$t('merchant.table.mobile')">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>

      <el-table-column prop="qd_name"  :label="$t('merchant.table.agent1')">
        <template slot-scope="scope">
          {{ scope.row.qd_name }}
        </template>
      </el-table-column>

      <el-table-column prop="username" :label="$t('merchant.table.account')">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column prop="cate" :label="$t('audit.table.cate')">
        <template slot-scope="scope">
          {{ cate[scope.row.cate] }}
        </template>
      </el-table-column>

      <el-table-column prop="audit_status_str" :label="$t('audit.table.status')" align="center" width="140">
        <template slot-scope="scope">
          {{ status[String(scope.row.status)] }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="audits.length > 0"
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
  import axios from 'axios';
  export default {
    data() {
      return {
        isLoading: false,
        formData: {
          shopname: '',
          userid: '',
          qd_uid: '',
          qd_uid2: '',
          qd_name: '',
          audit_status: ''
        },
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        status: {
          '0': this.$t('audit.deny'),
          "-1": this.$t('audit.going'),
        },
        channels: [],
        channels2: [],
        audits: [],
        total: 0,
        pageSize: 10,
        currentPage: 0
      }
    },
    created() {
      this.fetchData()
      this.getChannelList()
    },
    methods: {
      getChannelList() { // 获取渠道列表
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: '',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.channels = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannelHandler(groupid) {
        groupid && axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.channels2 = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
            this.isLoading = false;
            this.$message.error(this.$t('common.netError'));
          });
      },
      fetchData(query) {
        if(query) {
          this.currentPage = 0
        }
        let p = {
          shopname: this.formData.shopname,
          userid: this.formData.userid,
          qd_uid: this.formData.qd_uid,
          status: this.formData.audit_status,
          type: 'audit',
          qd_name: '',
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          pagesize: this.pageSize,
          format: 'cors'
        }
        if(this.formData.qd_uid2) {
          p.qd_uid = this.formData.qd_uid2
        }
        this.isLoading = true;
        axios.get(`${config.host}/org/mchnt/list`, {
          params: p})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.audits = data.data.mchnt_infos
              this.total = data.data.mchnt_cnt
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      reset() {
        this.$refs['mchnt_list_form'].resetFields();
        this.channels2.length = 0;
        this.pageSize = 10;
        this.currentPage = 0;
        this.fetchData();
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) {
        this.$router.push({
          name: 'auditDetail',
          query: {userid: currentRow.userid, from: 'old'}
        })
      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 0
        }
        this.fetchData()
      }
    }
  }
</script>
<style lang="scss">
</style>
