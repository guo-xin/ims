<template>
  <div class="shop">
    <header class="page-header">
      <h2 class="page-title">{{$t('shop.title')}}</h2>
      <div>
         <!--<el-button size="large" type="primary" @click="createStore">{{$t('shop.create')}}</el-button>-->
        <el-button style="margin-left:6px;" size="large" type="primary" @click="patchImport">{{$t('merchant.patchImport')}}</el-button>
      </div>
    </header>
    <el-form class="search-form" :model="formData" ref="shop_list_form">
      <el-form-item :label="$t('shop.form.mchntid')" prop="mchntid">
        <el-input v-model="formData.mchntid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.mchntname')" prop="mchntname">
         <el-input v-model="formData.mchntname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.submchntid')" prop="submchntid">
        <el-input v-model="formData.submchntid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.sunmchntname')" prop="sunmchntname">
        <el-input v-model="formData.sunmchntname"></el-input>
      </el-form-item>

       <el-form-item :label="$t('merchant.table.stostatus')" prop="status">
        <el-select v-model="formData.status">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('audit.form.audit_state')" prop="audit_status">
        <el-select v-model="formData.audit_status">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="item.name" :value="item.val" v-for="item in statesList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="shops" stripe v-loading="isLoading" @current-change="selectCurrentRowHandler">
      <el-table-column prop="submchnt_id" :label="$t('shop.table.submchntid')" min-width="100"></el-table-column>
      <el-table-column prop="mchnt_name"  :label="$t('shop.table.mchntname')" min-width="100"></el-table-column>
      <el-table-column width="170" prop="submchnt_name" :label="$t('shop.table.sunmchntname')" min-width="100"></el-table-column>
      <el-table-column prop="address" :label="$t('shop.table.address')" min-width="100"></el-table-column>
      <el-table-column prop="telephone" :label="$t('shop.table.telephone')" min-width="100"></el-table-column>
      <el-table-column prop="operating" :label="$t('shop.table.operating')" min-width="100"></el-table-column>
      <el-table-column prop="username" :label="$t('shop.table.account')" min-width="100"></el-table-column>

      <el-table-column :label="$t('merchant.table.payment')" min-width="120">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="paymentConfigure(scope.row.submchnt_id)">{{ scope.row.deploy == 1 ? $t('merchant.payment.configured') : $t('merchant.payment.nonconfigured') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.stostatus')" min-width="100">
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
      v-show="shops.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>

    <el-dialog :title="$t('merchant.payment.title')" :visible.sync="showConfirm"
               :show-close="false" center width="90%" class="dialog" @close="handleClose">
      <el-form :model="formPayment" ref="formPayment">
        <div class="dialog-row" v-for="(item, index) in formPayment.list" :key="index">
          <h4>{{ item.pid_name }}</h4>
          <el-form-item :label="$t('merchant.payment.merchantID1')">
            <el-input :disabled="item.type === 1" v-model="item['mchntid']" type="text"></el-input>
          </el-form-item>

          <el-form-item :label="$t('merchant.payment.merchChildID1')">
            <el-input :disabled="item.type === 1" v-model="item['termid']" type="text"></el-input>
          </el-form-item>

          <el-form-item v-if="!item.type" :label="$t('merchant.payment.merchantName')">
            <el-input v-model="item['mchntnm']" type="text"></el-input>
          </el-form-item>

          <el-form-item :label="$t('merchant.payment.merchantPass1')">
            <el-input :disabled="item.type === 1" v-model="item['key1']" type="text"></el-input>
          </el-form-item>


          <el-form-item v-if="!item.type" :label="$t('merchant.payment.merchantPass2')">
            <el-input v-model="item['key2']" type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="!item.type" :label="$t('merchant.payment.merchantPass3')">
            <el-input v-model="item['key3']" type="text"></el-input>
          </el-form-item>

          <el-form-item v-if="item.type" :label="$t('merchant.payment.type')">
            <el-input v-model="item['line_finance']" disabled type="text"></el-input>
          </el-form-item>
          <el-form-item v-if="item.type" :label="$t('merchant.payment.desc')">
            <el-input v-model="item['state_memo']" disabled type="text"></el-input>
          </el-form-item>

          <el-button type="text" v-if="item.is_edit" :disabled="item.type === 1 && item.state !== 2" :loading="formPayment['loading' + index]" @click="submit(index)">{{ $t('common.submit') }}</el-button>
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
          mchntid: '',
          mchntname: '',
          submchntid: '',
          sunmchntname: '',
          status: '',
          audit_status: ''
        },
        shops: [],
        total: 0,
        pageSize: 10,
        currentPage: 0,
        showConfirm: false,
        userId: '',
        formPayment: {
          list: []
        },
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
      }
    },
    created() {
      this.formData.mchntid = this.$route.query.userid
      this.fetchData()
    },
    methods: {
      createStore() {
        this.$router.push({
          name: 'createStore',
        })
      },
      fetchData(query) {
        if(query) {
          this.currentPage = 0
        }
        let p = {
          mchnt_uid: this.formData.mchntid,
          shopname: this.formData.mchntname,
          store_uid: this.formData.submchntid,
          status: this.formData.status,
          audit_status: this.formData.audit_status,
          storename: this.formData.sunmchntname,
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          page_size: this.pageSize,
          format: 'cors'
        };
        this.isLoading = true;
        axios.get(`${config.host}/org/mchnt/sub/list`, {
          params: p})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.shops = data.data.sub_infos
              this.total = data.data.sub_cnt
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
          this.isLoading = false;
        });
      },
      reset() {
        this.$refs['shop_list_form'].resetFields();
        this.formData.mchntid = '';
        this.fetchData('query');
      },

      // 批量进件
      patchImport() {
        this.$router.push({path: 'shop_manage_list/shop_batch_import'})
      },

      // 选择列表项，进入详情页
      selectCurrentRowHandler(currentRow, oldCurrentRow) {
        this.$router.push({
          name: 'shopDetail',
          query: {userid: currentRow.submchnt_id, from: 'old'}
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
        this.isLoading = true;
        this.userId = userid;
        axios.get(`${config.host}/org/mchnt/channel/info?userid=${userid}&format=cors`).then((res) => {
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
            chnlid: list.chnlid,
            qf_pid: list.qf_pid
          }

        }else {
          // 编辑
          if(list.mchnt_state) {
            url = '/org/mchnt/channel/edit';
            param = {
              userid: this.userId,
              termid: list.termid,
              mchntid: list.mchntid,
              id: list.id,
              mchntnm: list.mchntnm,
              key1: list.key1,
              key2: list.key2,
              key3: list.key3,
              format: 'cors'
            }
          }else {
            // 新建
            url = '/org/mchnt/channel/bind';
            param = {
              userid: this.userId,
              termid: list.termid,
              mchntid: list.mchntid,
              chnlid: list.chnlid,
              mchntnm: list.mchntnm,
              pid_name: list.pid_name,
              key1: list.key1,
              key2: list.key2,
              key3: list.key3,
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
            this.paymentConfigure(this.userId);
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
  .shop {
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
        width: 16%;
        padding-left: 0;
        padding-right: $miderGap;
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
