<template>
  <div class="refundManage">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('trade.refundMsg') }}</h2>
      </div>
      <div class="header-right" v-if="basicAuth.includes('refund_create')">
        <el-button size="large" type="primary" @click="create()">{{  $t('trade.btn.applyRefund') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('trade.common.tradeSum')" prop="syssn">
        <el-input v-model="form.syssn"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trade.common.merchantName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search">{{ $t('common.search') }}</el-button>
        <el-button @click="reset">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="refundList.list" stripe v-loading="loading" class="table-hover">
      <el-table-column prop="syssn" :label="$t('trade.common.tradeSum')" min-width="150"></el-table-column>
      <el-table-column prop="name" :label="$t('trade.common.merchantName')" min-width="120"></el-table-column>
      <el-table-column prop="shopname" :label="$t('trade.common.shopName')" min-width="100"></el-table-column>
      <el-table-column prop="telephone" :label="$t('trade.common.phone')" min-width="140"></el-table-column>
      <el-table-column prop="sysdtm" :label="$t('trade.common.tradeTime')" min-width="170"></el-table-column>
      <el-table-column :label="$t('trade.common.tradeAmount')" min-width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.txamt | formatCurrency }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ctime" :label="$t('trade.common.applyTime')" min-width="170"></el-table-column>
      <el-table-column prop="refund_amt" :label="$t('trade.common.refundAmount')" min-width="100"></el-table-column>
      <el-table-column prop="utime" :label="$t('trade.common.refundTime')" min-width="170"></el-table-column>

      <el-table-column :label="$t('common.status')" min-width="150">
        <template slot-scope="scope">
          <span @click="detail(scope.row)">{{ stateList[scope.row.status] }}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination_wrapper" v-if="refundList.total >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="refundList.cnt"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title="isCreat ? $t('trade.dialog.title2') : $t('trade.dialog.title1')" :visible.sync="showConfirm"
               :show-close="false" custom-class="singleLine-dialog" @close="handleClose">
      <el-form :model="formUser" :rules="userRules" ref="formUser">
        <el-form-item prop="syssn">
          <el-input v-model="formUser.syssn" :disabled="!isCreat" type="text" @change="getTrade">
            <template slot="prepend">{{ $t('trade.common.tradeSum') }}</template>
          </el-input>
        </el-form-item>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.dialog.merchantId') }}</span>
          <div class="line-content">{{ tradeInfo.userid }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.merchantName') }}</span>
          <div class="line-content">{{ tradeInfo.name }}</div>
        </div>

        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.shopName') }}</span>
          <div class="line-content">{{ tradeInfo.shopname }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.phone') }}</span>
          <div class="line-content">{{ tradeInfo.telephone }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.tradeTime') }}</span>
          <div class="line-content">{{ tradeInfo.sysdtm }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.tradeAmount') }}</span>
          <div class="line-content">{{ tradeInfo.txamt }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.dialog.pay') }}</span>
          <div class="line-content">{{ tradeInfo.payment }}</div>
        </div>

        <div v-if="isCreat">
          <el-form-item prop="amount">
            <el-input v-model="formUser.amount" type="text" :placeholder="$t('trade.dialog.tip3') + ' ' + (tradeInfo.m_refund || 0)">
              <template slot="prepend">{{ $t('trade.common.refundAmount') }}</template>
            </el-input>
          </el-form-item>
        </div>
        <div v-else>
          <div class="line-row">
            <span class="line-label">{{ $t('common.status') }}</span>
            <div class="line-content">{{ stateList[tradeInfo.status] }}</div>
          </div>
          <el-form-item prop="remark">
            <el-input v-model="formUser.remark" type="text" disabled>
              <template slot="prepend">{{ $t('common.remark') }}</template>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showConfirm = false">{{ isCreat ? $t('common.cancel') : $t('common.close') }}</el-button>
        <el-button v-if="isCreat" type="text" :loading="iconLoading" class="text-button" @click="confirm">{{ $t('trade.dialog.btn1') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import qs from 'qs';

  export default {
    data() {
      let checkAmount = (rule, val, cb) => {
        if(+val === 0) {
          cb(this.$t('trade.dialog.tip2'));
        }else if(+val > +this.tradeInfo.m_refund) {
          cb(this.$t('trade.dialog.tip5'));
        } else {
          cb();
        }
      };

      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        isCreat: true,
        showConfirm: false,
        iconLoading: false,
        form: {
          syssn: '',
          name: '',
        },
        tradeInfo: {

        },
        stateList: [
          this.$t('common.audit'),
          this.$t('common.agree'),
          this.$t('common.refuse'),
          this.$t('trade.common.refundSuc'),
          this.$t('trade.common.refundFail'),
          this.$t('trade.common.refund'),
        ],
        refundList: {},
        formUser: {
          syssn: '',
          amount: null,
          remark: '',
        },
        userRules: {
          syssn: [
            {required: true, message: this.$t('trade.dialog.tip1')}
          ],
          amount: [
            {required: true, message: this.$t('trade.dialog.tip2')},
            { validator: checkAmount, trigger: 'change' }
          ],
        }
      }
    },

    computed: {
      basicAuth() {
        return this.$store.state.permissionData || [];
      }
    },

    watch: {
      'formUser.amount': function(val, old) {
        if(val) {
          if(!/^\d+(\.\d{0,2})?$/.test(val)) {
            setTimeout(() => {
              this.formUser.amount = old;
            }, 10);
          }
        }
      }
    },

    created() {
      this.getData();
    },
    methods: {
      // 保存
      confirm() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            let form = this.formUser;
            let params = {
              syssn: form.syssn,
              reund_amt: form.amount,
              format: 'cors'
            };

            axios.post(`${config.host}/org/trade/refund_apply/create`, qs.stringify(params))
              .then((res) => {
                this.iconLoading = false;
                let data = res.data;
                if(data.respcd === config.code.OK) {
                  this.showConfirm = false;
                  this.$message({
                    type: 'success',
                    message: this.$t('common.opSucc')
                  });

                  this.handleSizeChange();

                } else {
                  this.showConfirm = false;
                  this.$message.error(data.resperr);
                }
              }).catch(() => {
              this.iconLoading = false;
              this.showConfirm = false;
              this.$message.error(this.$t('common.netError'));
            })
          }
        })

      },

      // 查找
      search() {
        this.handleSizeChange();
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      // 详情
      detail(row) {
        this.isCreat = false;
        this.showConfirm = true;
        this.tradeInfo = row;

        Object.assign(this.formUser, {
          syssn: row.syssn,
          remark: row.memo
        });
      },

      handleClose() {
        this.formUser = {
          syssn: '',
          amount: null,
          remark: ''
        };
        this.$refs['formUser'].resetFields();
      },

      // 创建
      create() {
        this.tradeInfo = {};
        this.isCreat = true;
        this.showConfirm = true;
      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/trade/refund/list`, {
            params: Object.assign({}, this.form, {
              page: this.currentPage - 1,
              page_size: this.pageSize,
              format: 'cors'
            })
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.refundList = data.data;
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
      },

      // 查询交易
      getTrade(val) {
        axios.get(`${config.host}/org/tools/syssn_infos`, {
          params: {
            syssn: val,
            format: 'cors'
          }
        }).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.tradeInfo = data.data || {};
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

    }
  }
</script>
