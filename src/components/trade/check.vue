<template>
  <div class="refundCheck">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('trade.refundCheck') }}</h2>
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

      <el-table-column :label="$t('common.status')" min-width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">{{ $t('common.audit') }}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination_wrapper" v-if="refundList.total >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="refundList.total"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title="$t('trade.refundCheck')" :visible.sync="showConfirm"
               :show-close="false" center custom-class="singleLine-dialog" @close="handleClose">
      <el-form :model="formUser" ref="formUser">
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.tradeSum') }}</span>
          <div class="line-content">{{ tradeInfo.syssn }}</div>
        </div>
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
          <div class="line-content">{{ tradeInfo.txamt | formatCurrency }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.dialog.pay') }}</span>
          <div class="line-content">{{ tradeInfo.payment }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.refundAmount') }}</span>
          <div class="line-content">{{ tradeInfo.refund_amt | formatCurrency }}</div>
        </div>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.applyTime') }}</span>
          <div class="line-content">{{ tradeInfo.ctime }}</div>
        </div>
        <el-form-item prop="remark">
          <el-input v-model="formUser.remark" type="text">
            <template slot="prepend">{{ $t('common.remark') }}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="text-button" @click="confirm(true)">{{ $t('common.agree') }}</el-button>
        <el-button :loading="iconLoading" class="text-button" @click="confirm(false)">{{ $t('common.refuse') }}</el-button>
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
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        showConfirm: false,
        iconLoading: false,
        form: {
          syssn: '',
          state: 0,
          name: '',
        },
        tradeInfo: {

        },
        refundList: {},
        formUser: {
          remark: '',
        }
      }
    },

    computed: {
      basicAuth() {
        return this.$store.state.permissionData || [];
      }
    },
    created() {
      this.getData();
    },
    methods: {
      // 保存
      confirm(flag) {
        if (!this.iconLoading) {
          this.iconLoading = true;
          let params = {
            refund_id: this.tradeInfo.id,
            status: flag ? 1 : 2,
            desc: this.formUser.remark,
            format: 'cors'
          };

          axios.post(`${config.host}/org/trade/refund/info`, qs.stringify(params))
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
        this.showConfirm = true;

        this.tradeInfo = row;
      },

      handleClose() {
        this.formUser = {
          remark: ''
        };
        this.$refs['formUser'].resetFields();
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

    }
  }
</script>
