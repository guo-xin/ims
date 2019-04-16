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
      <el-table-column prop="userid" :label="$t('merchant.table.mchtid')"></el-table-column>
      <el-table-column prop="shopname" :label="$t('merchant.table.mchtname')"></el-table-column>
      <el-table-column prop="mobile" :label="$t('merchant.table.mobile')"></el-table-column>
      <el-table-column prop="source" :label="$t('merchant.table.source')"></el-table-column>
      <el-table-column prop="qd_name" :label="$t('merchant.table.agent1')"></el-table-column>
      <el-table-column prop="username" :label="$t('merchant.table.account')"></el-table-column>
      <el-table-column prop="mcc_str" :label="$t('merchant.table.industry')"></el-table-column>
      <el-table-column prop="cate" :label="$t('merchant.table.type')">
        <template slot-scope="scope">
          {{ cate[scope.row.cate] }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('merchant.table.store')">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="shopList(scope.row.userid)">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.detail')">
        <template slot-scope="scope">
          <el-button type="text">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

       <el-table-column :label="$t('merchant.table.merstatus')" width="140">
        <template slot-scope="scope">
          {{ isSigned[scope.row.status] }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.payment')" width="140">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status !== 3" type="text" @click.stop="paymentConfigure(scope.row.userid)">{{ scope.row.deploy == 1 ? $t('merchant.payment.configured') : $t('merchant.payment.nonconfigured') }}</el-button>
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

    <el-dialog :title="$t('merchant.payment.title')" :visible.sync="showConfirm"
               :show-close="false" center width="80%" class="dialog" @close="handleClose">
      <el-form :model="formPayment" ref="formPayment">
        <div class="dialog-row" v-for="(item, index) in formPayment.list" :key="index">
          <h4>{{ item.pid_name }}</h4>
          <el-form-item :label="$t('merchant.payment.merchantID1')">
            <el-input :disabled="item.type === 1" v-model="item['mchntid']" type="text"></el-input>
          </el-form-item>

          <el-form-item :label="$t('merchant.payment.merchChildID1')">
            <el-input :disabled="item.type === 1" v-model="item['termid']" type="text"></el-input>
          </el-form-item>

          <el-form-item :label="$t('merchant.payment.merchantPass1')">
            <el-input :disabled="item.type === 1" v-model="item['key1']" type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type" :label="$t('merchant.payment.type')">
            <el-input v-model="item['line_finance']" disabled type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type" :label="$t('merchant.payment.desc')">
            <el-input v-model="item['state_memo']" disabled type="text"></el-input>
          </el-form-item>

          <el-button type="text" :disabled="item.type === 1 && item.state !== 2" :loading="formPayment['loading' + index]" @click="submit(index)">{{ $t('common.submit') }}</el-button>
        </div>
      </el-form>

      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="showConfirm = false">{{ $t('common.CLOSE') }}</el-button>
      </div>

    </el-dialog>
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
          status: ''
        },
        merchents: [],
        channels: [],
        channels2: [],
        statusList: [
          {name: this.$t('common.enable'), val: 3},
          {name: this.$t('common.disable'), val: 4},
          {name: this.$t('common.refuse'), val: 0},
          {name: this.$t('common.audit'), val: -1},
        ],
        isSigned: {
          "3": this.$t('common.enable'),
          "4": this.$t('common.disable'),
          "-1": this.$t('common.audit'),
          "0": this.$t('common.refuse'),
          "5": this.$t('common.toSubmit'),
        },
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        total: 0,
        pageSize: 10,
        currentPage: 0,
        showConfirm: false,
        userId: '',
        formPayment: {
          list: []
        },
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
      },

      // 支付配置弹框
      paymentConfigure(userid) {
        userid = '2805441';
        this.isLoading = true;
        this.userId = userid;
        axios.get(`${config.host}/org/mchnt/hk/channel/info?userid=${userid}&format=cors`).then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.formPayment.list = data.data;
              this.showConfirm = true;

            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },

      // 提交
      submit(index) {
        this.$set(this.formPayment, 'loading' + index, true);
        let list = this.formPayment.list[index] || {};
        let [url, param] = [];
        // 失败重新提交的
        if(list.type) {
          url = '/org/mchnt/bind';
          param = {
            userid: this.userId,
            chnlids: list.chnlid
          }

        }else {
          // 编辑
          if(list.mchnt_state) {
            url = '/org/mchnt/hk/channel/edit';
            param = {
              userid: this.userId,
              termid: list.termid,
              mchntid: list.mchntid,
              id: list.id,
              key1: list.key1,
              format: 'cors'
            }
          }else {
            // 新建
            url = '/org/mchnt/hk/channel/bind';
            param = {
              userid: this.userId,
              termid: list.termid,
              mchntid: list.mchntid,
              chnlid: list.chnlid,
              key1: list.key1,
              format: 'cors'
            }
          }
        }

        axios.post(`${config.host}${url}`, qs.stringify(param)).then((res) => {
          this.$set(this.formPayment, 'loading' + index, false);
          let data = res.data;
          if(data.respcd === config.code.OK) {

            this.$message({
              type: 'success',
              message: this.$t('common.opSucc')
            });
          }else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$set(this.formPayment, 'loading' + index, false);
          this.$message.error(this.$t('common.netError'));
        });

      },

      // 重置弹框表单
      handleClose() {
        this.$refs['formPayment'].resetFields();
        this.handleSizeChange();
      },
    }
  }
</script>
<style lang="scss">
  .merchant {
    .table-hover .el-table__row {
      cursor: pointer;
    }
    .dialog {
      .el-dialog {
        margin-top: 15vh !important;
      }
      .el-dialog__body {
        max-height: 50vh;
        overflow-y: scroll;
      }
      .el-dialog__header {
        border-bottom: 1px #2974FF solid;
      }
      .dialog-row {
        display: block;
      }
      .el-form-item {
        width: 19%;
        padding-left: 0;
        padding-right: $baseGap;
      }
      h4 {
        position: relative;
        padding: $smGap 0;
        margin: 0 0 $midGap;
        font-size: $bigSize;
        color: $titleColor;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background-color: #232629;
        }
      }
      box-shadow: 2px 2px 4px 0 rgba(29,29,36,0.1);
      border-radius: 2px;
      font-size: $xgSize;
    }
  }
</style>
