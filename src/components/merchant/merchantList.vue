<template>
  <div class="merchant">
    <header class="page-header">
      <h2 class="page-title">{{$t('merchant.title')}}</h2>
      <div>
        <el-button size="large" type="primary" @click="createMerchant">{{$t('merchant.create')}}</el-button>
        <el-button size="large" type="primary" @click="patchImport">{{$t('merchant.patchImport')}}</el-button>
      </div>
    </header>
    <el-form class="search-form" :model="formData" ref="mchnt_list_form">
      <el-form-item :label="$t('merchant.form.mchtid')" prop="userid">
        <el-input v-model="formData.userid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.mchtname')" prop="shopname">
        <el-input v-model="formData.shopname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent1')" prop="qd_uid">
        <el-select v-model="formData.qd_uid" @change="selectChannelHandler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.audit_state')" prop="audit_status">
        <el-select v-model="formData.audit_status" @change="selectChannelHandler">
          <el-option :label="item.val" :value="item.key" v-for="item in audits" :key="item.key"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="getMerchantDataHandler">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="merchents" stripe v-loading="isLoading" @current-change="selectCurrentRowHandler">
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
          {{ scope.row.mobile }}
        </template>
      </el-table-column>

      <el-table-column prop="agent"  :label="$t('merchant.table.agent')">
        <template slot-scope="scope">
          {{ scope.row.agent }}
        </template>
      </el-table-column>

      <el-table-column prop="username" :label="$t('merchant.table.account')">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column prop="cate_code" :label="$t('merchant.table.cate_code')">
        <template slot-scope="scope">
          {{ scope.row.cate_code }}
        </template>
      </el-table-column>

      <el-table-column prop="audit_status_str" :label="$t('merchant.table.state')" align="center">
        <template slot-scope="scope">
        {{ scope.row.audit_status_str }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="merchents.length > 0"
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
          qd_name: '',
          audit_status: ''
        },
        merchents: [],
        channels: [],
        audits: [],
        total: 0,
        pageSize: 10,
        currentPage: 0
      }
    },
    created() {
      this.fetchData()
      this.getChannelList()
      this.getAuditList()
    },
    methods: {
      getAuditList() {
        axios.get(`${config.host}/org/tools/audit_status_map`, {
          params: {
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
              this.audits = data.data;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      getChannelList() { // 获取渠道列表
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: '',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
            this.channels = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
          this.$message.error(data.respmsg);
        });
      },
      selectChannelHandler(value) {
//        console.log(value)
      },
      getMerchantDataHandler() {
        this.fetchData()
      },
      fetchData() {
        axios.get(`${config.host}/org/mchnt/list`, {
          params: {
            shopname: this.formData.shopname,
            userid: this.formData.userid,
            qd_uid: this.formData.qd_uid,
            audit_status: this.formData.audit_status,
            qd_name: '',
            page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
            pagesize: this.pageSize,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
               this.merchents = data.data.list
               this.total = data.data.total
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
//          this.$message.error(this.$t('common.netError'));
        });
      },
      reset() {
        this.$refs['mchnt_list_form'].resetFields();
        this.fetchData();
      },
      createMerchant() {
        this.$router.push({path: 'mchnt_manage_list/mchnt_create'})
      },
      patchImport() {
//        this.$router.push({path: 'mchnt_manage_list/mchnt_create'})
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) {
        this.$router.push({
          name: 'mchntDetail',
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
