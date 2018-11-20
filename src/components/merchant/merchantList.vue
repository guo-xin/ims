<template>
  <div class="merchant">
    <header class="page-header">
      <h2 class="page-title">{{$t('merchant.title')}}</h2>
      <div>
        <el-button size="large" type="primary" @click="createMerchant" v-if="authData.includes('mchnt_manage_create')">{{$t('merchant.create')}}</el-button>
        <el-button style="margin-left:6px;" size="large" type="primary" @click="patchImport" v-if="authData.includes('mchnt_manage_batch_create')">{{$t('merchant.patchImport')}}</el-button>
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

      <el-form-item :label="$t('merchant.form.agent2')" prop="qd_uid2">
        <el-select v-model="formData.qd_uid2" :placeholder="$t('merchant.form.ph')">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels2" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.audit_state')" prop="status">
        <el-select v-model="formData.status">
          <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
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

      <el-table-column prop="cate" :label="$t('merchant.table.industry')">
        <template slot-scope="scope">
          {{ scope.row.mcc_str }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.store')">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="shopList(scope.row.userid)">{{ $t('common.look') }}</el-button>
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
          qd_uid2: '',
          qd_name: '',
          qd_name2: '',
          status: ''
        },
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        merchents: [],
        channels: [],
        channels2: [],
        statusList: [
          {name: this.$t('merchant.detail.up'), val: 0},
          {name: this.$t('merchant.detail.down'), val: 1}
        ],
        total: 0,
        pageSize: 10,
        currentPage: 0
      }
    },
    computed: {
      authData() {
        return this.$store.state.permissionData
      }
    },
    created() {
      this.fetchData()
      this.getChannelList()
    },
    methods: {
      shopList(mchntId) {
        this.$router.push({
          path: 'shop_manage_list/',
          query: {userid: mchntId, from: 'old'}
        })
      },
      getAuditList() { // 审核列表数据
        axios.get(`${config.host}/org/tools/audit_status_map`, {
          params: {
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.statusList = data.data;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getChannelList() { // 获取1级渠道列表
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: '',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
            this.channels = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannelHandler(groupid) { // 获取渠道列表数据
        groupid && axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.channels2 = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      fetchData(query) { // 获取商户列表数据
        if(query) {
          this.currentPage = 0
        }
        let p = {
          shopname: this.formData.shopname,
          userid: this.formData.userid,
          qd_uid: this.formData.qd_uid,
          status: this.formData.status,
          qd_name: '',
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          page_size: this.pageSize,
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
               this.merchents = data.data.mchnt_infos
               this.total = data.data.mchnt_cnt
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      reset() { // 表单重置
        this.$refs['mchnt_list_form'].resetFields();
        this.channels2 = [];
        this.fetchData();
      },
      createMerchant() { // 商户进件/新建商户
        this.$router.push({path: 'mchnt_manage_list/mchnt_create'})
      },
      patchImport() { // 批量进件
        this.$router.push({path: 'mchnt_manage_list/batch_import'})
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) { // 选择列表项，进入详情页
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
  .table-hover .el-table__row {
    cursor: pointer;
  }
</style>
