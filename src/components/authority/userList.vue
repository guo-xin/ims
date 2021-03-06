<template>
  <div class="userList">
    <header class="page-header">
      <div class="header-left">
        <h2 class="page-title">{{ $t('authority.crumbs.T1') }}</h2>
      </div>
      <div class="header-right" v-if="basicAuth.includes('perm_user_create')">
        <el-button size="large" type="primary" @click="create()">{{  $t('common.create') }}</el-button>
      </div>
    </header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('authority.panel.userName')" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.panel.roleName')" prop="role">
        <el-input v-model="form.role"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.panel.state')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" :loading="loading" @click="search()">{{ $t('common.search') }}</el-button>
        <el-button @click="reset()">{{ $t('common.reset') }}</el-button>
      </div>
    </el-form>

    <el-table :data="userList.list" stripe @row-click="detail" v-loading="loading" class="table-hover">
      <el-table-column prop="nickname" :label="$t('authority.panel.userName')"></el-table-column>
      <el-table-column prop="role_name" :label="$t('authority.table.role')"></el-table-column>
      <el-table-column prop="username" :label="$t('authority.table.account')" min-width="80"></el-table-column>
      <el-table-column prop="join_time" :label="$t('authority.table.rTime')" min-width="100"></el-table-column>
      <el-table-column :label="$t('authority.panel.state')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.state === 1 ? $t('authority.panel.open') : $t('authority.panel.close') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="userList.total >= 1">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="userList.total"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>

    <el-dialog :title="isCreat ? $t('authority.dialog.title1') :$t('authority.dialog.title2') " :visible.sync="showConfirm" top="20%"
               :show-close="false" @close="handleClose">
      <el-form :model="formUser" :rules="userRules" ref="formUser">
        <div class="dialog-row">
          <el-form-item prop="user" :label="$t('authority.panel.userName')">
            <el-input v-model="formUser.user" type="text"></el-input>
          </el-form-item>

          <el-form-item prop="role" :label="$t('authority.panel.roleName')">
            <el-select v-model="formUser.role" :placeholder="$t('common.choose')">
              <el-option v-for="item in roleList" :label="item.name" :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="dialog-row">
          <el-form-item prop="account" :label="$t('authority.table.account')">
            <el-input v-model="formUser.account" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="pwd" :label="$t('authority.dialog.pwd')">
            <el-input v-model="formUser.pwd" type="password"  @input="passChange" @blur="passBlur" @focus="passFocus" id="end-length"></el-input>
          </el-form-item>
        </div>
        <div class="dialog-row" v-if="!isCreat">
          <el-form-item prop="state" :label="$t('authority.panel.state')">
            <el-select v-model="formUser.state" :placeholder="$t('common.choose')">
              <el-option :label="$t('authority.panel.open')" value=1></el-option>
              <el-option :label="$t('authority.panel.close')" value=9></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
        </div>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showConfirm = false">{{ $t('common.close') }}</el-button>
        <el-button type="text" :loading="iconLoading" class="text-button" @click="confirm">{{ $t('common.save') }}</el-button>
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
        showConfirm: false,
        iconLoading: false,
        isCreat: true,
        flag: false,
        oldPass: '',
        pwdChange: false,
        userId: '',
        form: {
          user: '',
          role: '',
          state: ''
        },
        userList: {},
        roleList: [],
        formUser: {
          user: '',
          role: '',
          account: '',
          pwd: '',
          state: '',
        },
        userRules: {
          user: [
            { required: true, message: this.$t('authority.dialog.tp1') }
          ],
          role: [
            { required: true, message: this.$t('authority.dialog.tp2') }
          ],
          account: [
            { required: true, message: this.$t('authority.dialog.tp3') },
            { max: 30, message: this.$t('authority.dialog.tp4') }
          ],
          pwd: [
            { required: true, message: this.$t('authority.dialog.tp5') }
          ],
          state: [
            { required: true, message: this.$t('authority.dialog.tp6') }
          ],
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
      this.getRole();
    },
    methods: {
      confirm() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            if (this.isCreat) {
              this.save()
            } else {
              this.$confirm(this.$t('common.sure'), this.$t('common.tip'), {
                confirmButtonText: this.$t('common.confirm'),
                cancelButtonText: this.$t('common.cancel'),
                type: 'warning'
              }).then(() => {
                this.save()
              }).catch(() => {
              })
            }
          }
        })
      },
      // 保存
      save() {
        this.$refs['formUser'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            let [params, url] = [];
            let form = this.formUser;
            params = {
              nickname: form.user,
              role_code: form.role,
              username: form.account,
              format: 'cors'
            }
            if(this.pwdChange) {
              Object.assign(params, {
                password: form.pwd
              });
            }

            if(this.isCreat) {
              url = 'org/perm/user';
            }else {
              Object.assign(params, {
                state: form.state,
                userid: this.userId
              });
              url = 'org/perm/user/info';
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
                // 重新登录
                let userInfo = Store.get('userInfo') || {};
                if(!this.isCreat && this.userId === userInfo.userid) {
                  this.logout();
                }else {
                  this.handleSizeChange();
                }

              } else if(data.respcd === config.code.USERERR) {
                this.$message.error(data.resperr);
              }else {
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
        if(this.basicAuth.includes('perm_user_edit')) {
          this.isCreat = false;
          this.showConfirm = true;
          this.userId = row.userid;
          Object.assign(this.formUser, {
            user: row.nickname,
            role: row.role_code,
            account: row.username,
            pwd: '******',
            state: row.state + ''
          })
        }
      },
      // 输入框聚焦改变时清空
      passChange(val) {
        if(!this.flag) {
          if(this.oldPass.length > val.length) {
            this.formUser.pwd = '';
          }else {
            let dom = document.querySelector("#end-length");
            let index = dom.selectionStart - 1;
            this.formUser.pwd = val.charAt(index) || '';
          }
          this.pwdChange = true;
          this.flag = true;
        }
      },

      // 失焦
      passBlur() {
        this.flag = false;
      },

      // 聚焦
      passFocus() {
        this.oldPass = this.formUser.pwd;
      },

      handleClose() {
        this.formUser = {
          user: '',
          role: '',
          account: '',
          pwd: '',
          state: ''
        };
        this.$refs['formUser'].resetFields();
        this.pwdChange = false;
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
          let form = this.form;
          axios.get(`${config.host}/org/perm/user/list`, {
            params: {
              nickname: form.user,
              role_name: form.role,
              state: form.state,
              offset: this.currentPage - 1,
              pageSize: this.pageSize,
              format: 'cors'
            }
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.userList = data.data;
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

      getRole() {
        axios.get(`${config.host}/org/perm/roles?format=cors`).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.roleList = data.data;
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      // 退出
      logout() {
        this.loading = true;
        axios.post(`${config.host}/org/user/logout?format=cors`)
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
              localStorage.clear();
              this.$router.push(`/login`);
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
          this.$message.error(this.$t('common.netError'));
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
