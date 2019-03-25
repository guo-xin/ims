<template>
  <div class="refundManage">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('trade.refundMsg') }}</h2>
      </div>
      <div class="header-right" v-if="basicAuth.includes('api_manage_create')">
        <el-button size="large" type="primary" @click="create()">{{  $t('trade.btn.applyRefund') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('trade.common.tradeSum')" prop="userId">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item :label="$t('trade.common.merchantName')" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search">{{ $t('common.search') }}</el-button>
        <el-button @click="reset">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="refundList.infos" stripe v-loading="loading" class="table-hover">
      <el-table-column prop="id" :label="$t('system.refund.merchantId')" min-width="150"></el-table-column>
      <el-table-column prop="user_name" :label="$t('system.refund.merchantName')" min-width="90"></el-table-column>

      <el-table-column prop="userId" :label="$t('system.refund.address')" min-width="80"></el-table-column>
      <el-table-column prop="code" :label="$t('system.refund.phone')" min-width="140"></el-table-column>
      <el-table-column prop="key" :label="$t('system.refund.joinTime')" min-width="140"></el-table-column>
      <el-table-column prop="memo" :label="$t('common.remark')" min-width="80"></el-table-column>

      <el-table-column :label="$t('common.status')" min-width="80">
        <template slot-scope="scope">
          <!--<span></span>-->
          <el-button type="text" @click="detail(scope.row)">{{ $t('common.detail') }}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination_wrapper" v-if="refundList.cnt >= 1">
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

    <el-dialog :title="$t('trade.dialog.title1')" :visible.sync="showConfirm"
               :show-close="false" custom-class="singleLine-dialog" @close="handleClose">
      <el-form :model="formUser" :rules="userRules" ref="formUser">
        <el-form-item prop="userId">
          <el-input v-model="formUser.userId" type="text" @change="getName">
            <template slot="prepend">{{ $t('trade.common.tradeSum') }}</template>
          </el-input>
        </el-form-item>
        <div class="line-row">
          <span class="line-label">{{ $t('trade.common.tradeSum') }}</span>
          <div class="line-content">{{ $t('trade.common.tradeSum') }}</div>
        </div>

      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showConfirm = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="text" :loading="iconLoading" class="text-button" @click="confirm">{{ flag === 3 ? $t('common.edit') : $t('common.save') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import Store from '../../assets/js/store';
  import qs from 'qs';

  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        isCreat: true,
        showConfirm: false,
        iconLoading: false,
        form: {
          userId: '',
          userName: '',
        },
        refundList: {},
        formUser: {
          userId: '',
          userName: '',
          status: '',
          remark: '',
        },
        userRules: {
          userId: [
            {required: true, message: this.$t('system.refund.tip1')}
          ]
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
      //
      confirm() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            if(!this.formUser.userName) {
              this.$message.error(this.$t('system.refund.tip2'));
              return;
            }

            this.save()
          }
        })
      },
      // 保存
      save() {
        this.iconLoading = true;
        let [params, url] = [];
        let form = this.formUser;

        if (this.isCreat) {
          params = {
            userid: form.userId,
            notify_url: form.userName,
            return_url: form.status,
            memo: form.remark
          };
          url = 'org/mchnt/api/create';
        } else {
          params = {
            id: this.id,
            notify_url: form.notify_url,
            return_url: form.return_url,
            memo: form.memo
          };
          url = 'org/mchnt/api/edit';
        }
        axios.post(`${config.host}/${url}`, qs.stringify(params))
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
      },

      // 查找
      search() {
        this.handleSizeChange();
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      detail(row) {
        if(this.basicAuth.includes('api_manage_edit')) {
          this.flag = 2;
          this.showConfirm = true;

          this.id = row.id;
          Object.assign(this.formUser, {
            userid: row.userid,
            notify_url: row.notify_url,
            return_url: row.return_url,
            memo: row.memo
          });
          this.getName(row.userid);
        }
      },

      handleClose() {
        this.formUser = {
          userId: '',
          userName: '',
          status: '',
          remark: ''
        };
        this.$refs['formUser'].resetFields();
      },

      // 创建
      create() {
        this.flag = 1;
        this.showConfirm = true;
      },

      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/mchnt/api/list`, {
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

      // 查用户名称
      getName(val) {
        axios.get(`${config.host}/org/tools/submchnt_agent_name`, {
          params: {
            userid: val,
            format: 'cors'
          }
        }).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            let ob = data.data || {};
            this.formUser.userName = ob.name;
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

<style lang="scss">
.refundManage {

}
</style>
