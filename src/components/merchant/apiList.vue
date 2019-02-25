<template>
  <div class="apiList">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('merchant.api.title') }}</h2>
      </div>
      <div class="header-right" v-if="basicAuth.includes('api_manage_create')">
        <el-button size="large" type="primary" @click="create()">{{  $t('common.create') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('merchant.api.userId')" prop="userid">
        <el-input v-model="form.userid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.api.userType')" prop="type">
        <el-select v-model="form.type" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('merchant.api.merchant')" value=1></el-option>
          <el-option :label="$t('merchant.api.agent')" value=2></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search">{{ $t('common.search') }}</el-button>
        <el-button @click="reset">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="apiList.infos" stripe v-loading="loading" class="table-hover">
      <el-table-column prop="id" :label="$t('merchant.api.id')" min-width="150"></el-table-column>
      <el-table-column prop="user_name" :label="$t('merchant.api.userName')" min-width="90"></el-table-column>
      <el-table-column :label="$t('merchant.api.userType')" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.type === '1' ? $t('merchant.api.merchant') : $t('merchant.api.agent') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userid" :label="$t('merchant.api.userId')" min-width="80"></el-table-column>
      <el-table-column prop="code" :label="$t('merchant.api.code')" min-width="140"></el-table-column>
      <el-table-column prop="key" :label="$t('merchant.api.key')" min-width="140"></el-table-column>
      <el-table-column prop="memo" :label="$t('merchant.api.remark')" min-width="80"></el-table-column>

      <el-table-column :label="$t('common.operate')" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">{{ $t('common.detail') }}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination_wrapper" v-if="apiList.cnt >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="apiList.cnt"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title="$t('merchant.api.userInfo') " :visible.sync="showConfirm" top="20%"
               :show-close="false" @close="handleClose">
      <el-form :model="formUser" :rules="userRules" ref="formUser">
        <div class="dialog-row">
          <el-form-item prop="userid" :label="$t('merchant.api.userId')">
            <el-input :disabled="!isCreat" v-model="formUser.userid" type="text" @change="getName"></el-input>
          </el-form-item>

          <el-form-item prop="userName" :label="$t('merchant.api.userName')">
            <el-input disabled v-model="formUser.userName" type="text"></el-input>
          </el-form-item>
        </div>
        <div class="dialog-row">
          <el-form-item prop="notify_url" :label="$t('merchant.api.address1')">
            <el-input v-model="formUser.notify_url" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="return_url" :label="$t('merchant.api.address2')">
            <el-input v-model="formUser.return_url" type="text"></el-input>
          </el-form-item>
        </div>

        <div class="dialog-row">
          <el-form-item prop="memo" :label="$t('merchant.api.remark')">
            <el-input v-model="formUser.memo" type="text"></el-input>
          </el-form-item>

        </div>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showConfirm = false">{{ $t('common.close') }}</el-button>
        <el-button type="text" :loading="iconLoading" class="text-button" @click="save">{{ $t('common.save') }}</el-button>
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
        id: '',
        form: {
          userid: '',
          type: ''
        },
        apiList: {},
        formUser: {
          userid: '',
          userName: '',
          notify_url: '',
          return_url: '',
          memo: ''
        },
        userRules: {
          userid: [
            {required: true, message: this.$t('merchant.api.tip1')}
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
      // 保存
      save() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            let [params, url] = [];
            let form = this.formUser;

            if(this.isCreat) {
              params = {
                userid: form.userid,
                notify_url: form.notify_url,
                return_url: form.return_url,
                memo: form.memo
              };
              url = 'org/mchnt/api/create';
            }else {
              params = {
                id: this.id,
                notify_url: form.notify_url,
                return_url: form.return_url,
                memo: form.memo
              };
              url = 'org/mchnt/api/edit';
            }
            axios.post(`${config.host}/${url}`, qs.stringify(params)).then((res) => {
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
        });
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
        if(this.basicAuth.includes('api_manage_create')) {
          this.isCreat = false;
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
        this.$refs['formUser'].resetFields();
      },

      // 创建
      create() {
        this.isCreat = true;
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
              this.apiList = data.data;
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

</style>
