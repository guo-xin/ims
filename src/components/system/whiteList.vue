<template>
  <div class="whiteList">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('system.refund.title') }}</h2>
      </div>
      <div class="header-right" v-if="basicAuth.includes('refund_white_create')">
        <el-button size="large" type="primary" @click="create()">{{  $t('common.create') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('system.refund.merchantId')" prop="userid">
        <el-input v-model="form.userid"></el-input>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search">{{ $t('common.search') }}</el-button>
        <el-button @click="reset">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="whiteList.infos" stripe v-loading="loading" class="table-hover">
      <el-table-column prop="userid" :label="$t('system.refund.merchantId')" min-width="80"></el-table-column>
      <el-table-column prop="name" :label="$t('system.refund.merchantName')" min-width="140"></el-table-column>
      <el-table-column prop="address" :label="$t('system.refund.address')" min-width="80"></el-table-column>
      <el-table-column prop="telephone" :label="$t('system.refund.phone')" min-width="140"></el-table-column>
      <el-table-column prop="ctime" :label="$t('system.refund.joinTime')" min-width="140"></el-table-column>
      <el-table-column prop="memo" :label="$t('common.remark')" min-width="80"></el-table-column>

      <el-table-column :label="$t('common.status')" min-width="80">
        <template slot-scope="scope">
          <span @click="detail(scope.row)">{{ stateList[scope.row.status] }}</span>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination_wrapper" v-if="whiteList.cnt >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="whiteList.cnt"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title="$t(`system.refund.title${flag}`)" :visible.sync="showConfirm"
               :show-close="false" @close="handleClose">
      <el-form :model="formUser" :rules="userRules" ref="formUser">
        <div class="dialog-row">
          <el-form-item prop="userid" :label="$t('system.refund.merchantId')">
            <el-input :disabled="flag !== 1" v-model="formUser.userid" type="text" @change="getName"></el-input>
          </el-form-item>
          <el-form-item prop="userName" :label="$t('system.refund.merchantName')">
            <el-input disabled v-model="formUser.userName" type="text"></el-input>
          </el-form-item>
        </div>

        <div class="dialog-row">
          <el-form-item v-if="flag === 2" prop="status" :label="$t('system.refund.audit')">
            <el-select v-model="formUser.status" :placeholder="$t('common.choose')">
              <el-option :label="$t('common.agree')" value=2></el-option>
              <el-option :label="$t('common.refuse')" value=3></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="flag === 3" prop="status" :label="$t('common.status')">
            <el-select v-model="formUser.status" :placeholder="$t('common.choose')">
              <el-option :label="$t('common.enable')" value=2></el-option>
              <el-option :label="$t('common.disable')" value=0></el-option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="flag !== 3" prop="memo" :label="$t('common.remark')">
            <el-input v-model="formUser.memo" type="text"></el-input>
          </el-form-item>
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
  import qs from 'qs';

  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        flag: 1, // 1创建2审核3编辑状态
        showConfirm: false,
        iconLoading: false,
        form: {
          userid: ''
        },
        stateList: [
          this.$t('common.disable'),
          this.$t('common.audit'),
          this.$t('common.enable'),
          this.$t('common.refuse')
        ],
        whiteList: {},
        formUser: {
          userid: '',
          userName: '',
          status: '',
          memo: '',
        },
        userRules: {
          userid: [
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
      // 点击确定
      confirm() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.save()
          }
        })
      },
      // 保存
      save() {
        this.iconLoading = true;
        let [params, url] = [];
        let form = this.formUser;

        if(this.flag === 1) {
          params = {
            userid: form.userid,
            memo: form.memo,
            format: 'cors'
          };
          url = 'org/refund_white/create';
        }else if(this.flag === 2) {
          params = {
            userid: form.userid,
            audit: form.status,
            memo: form.memo,
            format: 'cors'
          };
          url = 'org/refund_white/audit';
        }else {
          params = {
            userid: form.userid,
            status: form.status === '2' ? 1 : 0,
            format: 'cors'
          };
          url = 'org/refund_white/edit';
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
            // this.showConfirm = false;
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
        if(row.status === 1 || row.status === 3) {
          if(this.basicAuth.includes('refund_white_audit')) {
            this.flag = 2;
            row.status === 3 && Object.assign(this.formUser, {
              status: row.status + '',
            });
          }else {
            return;
          }
        }else {
          if(this.basicAuth.includes('api_manage_edit')) {
            this.flag = 3;
            Object.assign(this.formUser, {
              status: row.status + '',
            });
          }else {
            return;
          }
        }

        this.showConfirm = true;

        Object.assign(this.formUser, {
          userid: row.userid,
          userName: row.name,
          memo: row.memo
        });

      },

      handleClose() {
        this.formUser = {
          userid: '',
          userName: '',
          status: '',
          memo: '',
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
          axios.get(`${config.host}/org/refund_white/list`, {
            params: Object.assign({}, this.form, {
              page: this.currentPage - 1,
              page_size: this.pageSize,
              format: 'cors'
            })
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.whiteList = data.data;
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
        if(val !== '') {
          axios.get(`${config.host}/org/tools/bigmerchnt_name`, {
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
        }
      },

    }
  }
</script>
