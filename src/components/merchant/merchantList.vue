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
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('audit.form.audit_state')" prop="states">
        <el-select v-model="formData.states">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="item.name" :value="item.val" v-for="item in statesList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="merchents" stripe v-loading="isLoading" class="table-hover" @current-change="selectCurrentRowHandler">
      <el-table-column prop="userid" :label="$t('merchant.table.mchtid')" min-width="120"></el-table-column>
      <el-table-column prop="shopname" :label="$t('merchant.table.mchtname')" min-width="100"></el-table-column>
      <el-table-column prop="mcc_str" :label="$t('merchant.table.industry')" min-width="140"></el-table-column>
      <el-table-column prop="telephone" :label="$t('merchant.table.mobile')" min-width="110"></el-table-column>
      <el-table-column prop="source" :label="$t('merchant.table.source')" min-width="100"></el-table-column>
      <el-table-column prop="qd_name" :label="$t('merchant.table.agent1')" min-width="100"></el-table-column>
      <el-table-column prop="username" :label="$t('merchant.table.account')" min-width="100"></el-table-column>
      <el-table-column :label="$t('merchant.table.type')" min-width="130">
        <template slot-scope="scope">
          {{ cate[scope.row.cate] }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('merchant.table.store')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="shopList(scope.row.userid)">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.detail')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

       <el-table-column :label="$t('merchant.table.merstatus')" min-width="100">
        <template slot-scope="scope">
          {{ isSigned[scope.row.status] }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('audit.form.audit_state')" min-width="100">
        <template slot-scope="scope">
          {{ list[scope.row.audit_status] }}
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
  import qs from 'qs';
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
          status: '',
          states: ''
        },
        merchents: [],
        channels: [],
        channels2: [],
        statusList: [
          {name: this.$t('common.enable'), val: 0},
          {name: this.$t('common.disable'), val: 1}
        ],
        statesList: [
          {name: this.$t('common.agree'), val: 1},
          {name: this.$t('common.refuse'), val: 0},
          {name: this.$t('common.audit'), val: -1},
          {name: this.$t('common.toSubmit'), val: 3}
        ],
        list: {
          "-1": this.$t('common.audit'),
          "0": this.$t('common.refuse'),
          "3": this.$t('common.toSubmit'),
          "1": this.$t('common.agree'),
        },
        isSigned: {
          "0": this.$t('common.enable'),
          "1": this.$t('common.disable')
        },
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        total: 0,
        pageSize: 10,
        currentPage: 0,
      }
    },
    computed: {
      authData() {
        return this.$store.state.permissionData;
      }
    },
    created() {
      this.fetchData();
      this.getChannelList();
    },
    methods: {
      shopList(mchntId) {
        this.$router.push({
          path: 'shop_manage_list/',
          query: {userid: mchntId, from: 'old'}
        })
      },

      // 获取1级渠道列表
      getChannelList() {
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: '',
            status: 3,
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

      // 获取渠道列表数据
      selectChannelHandler(groupid) {
        this.formData.qd_uid2 = ''
        groupid && axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
            status: 3,
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

      // 获取商户列表数据
      fetchData(query) {
        if(query) {
          this.currentPage = 0
        }
        let p = {
          shopname: this.formData.shopname,
          userid: this.formData.userid,
          qd_uid: this.formData.qd_uid,
          status: this.formData.status,
          audit_status: this.formData.states,
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

      // 表单重置
      reset() {
        this.$refs['mchnt_list_form'].resetFields();
        this.channels2 = [];
      },

      // 商户进件/新建商户
      createMerchant() {
        this.$router.push({path: 'mchnt_manage_list/mchnt_create'})
      },

      // 批量进件
      patchImport() {
        this.$router.push({path: 'mchnt_manage_list/batch_import'})
      },

      // 选择列表项，进入详情页
      selectCurrentRowHandler(currentRow) {
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
  .merchant {
    .table-hover .el-table__row {
      cursor: pointer;
    }
  }
</style>
