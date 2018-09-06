<template>
  <div class="settleCreate">
    <header class="page-header style2">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T5') }}</h2>
      </div>
      <div class="header-right">
        <el-button type="text"  @click="close"><i class="el-icon-close"></i>{{  $t('common.close') }}</el-button>
      </div>
    </header>

    <el-form :ref="form" :model="form" :rules="formRules">
      <el-form-item :label="$t('settleMent.panel.modeName')" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.effectTime')" prop="date" class="date-form-item">
        <el-date-picker
          v-model="form.date"
          type="date"
          :editable="false"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.singleAmount')" prop="role" class="form-right-140">
        <el-input v-model="form.role"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-radio-group v-model="form.role">
          <el-radio :label="1">&gt;</el-radio>
          <el-radio :label="2">&gt;=</el-radio>
          <el-radio :label="3">&lt;</el-radio>
          <el-radio :label="4">&lt;=</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.payPass')" prop="role">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settleMent.table.payGoods')" prop="role">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.passCost')" prop="state" class="form-right-140">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user" style="width: 140px">
        <el-input v-model="form.user"></el-input>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleCircle')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('settleMent.panel.day')" value=1></el-option>
          <el-option :label="$t('settleMent.panel.week')" value=2></el-option>
          <el-option :label="$t('settleMent.panel.month')" value=3></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.floorType')" prop="state" class="form-right-140">
        <el-select v-model="form.state" :placeholder="$t('common.choose')">
          <el-option :label="$t('common.all')" value=""></el-option>
          <el-option :label="$t('authority.panel.open')" value=1></el-option>
          <el-option :label="$t('authority.panel.close')" value=9></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.floorCount')" prop="role" class="form-inline-label">
        <el-radio-group v-model="form.role">
          <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
          <el-radio :label="2">{{ $t('settleMent.panel.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('settleMent.table.isMode')" prop="role" class="form-inline-label">
        <el-radio-group v-model="form.role">
          <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
          <el-radio :label="2">{{ $t('settleMent.panel.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-table :data="ruleList">
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.table.order')" width="80">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.table.startVal')">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" align="center" :label="$t('settleMent.table.endVal')">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" align="center" :label="$t('settleMent.panel.passCost')">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" :label="$t('settleMent.table.firstRate')">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" :label="$t('settleMent.table.secondRate')">
          <template slot-scope="scope">
            <el-form-item>
              <el-input v-model="form.user"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="join_time" align="center" :label="$t('common.operate')" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="add()" v-if="ruleList.length < 3 && scope.$index >= ruleList.length - 1 ">{{ $t('common.add') }}</el-button>
            <el-button type="text" @click="dele()" v-if="ruleList.length > 1">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="desList" class="bottom-border">
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.panel.settleName')">
          <template slot-scope="scope">
            {{ countList[scope.$index].name }}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.panel.settleDetail')">
          <template slot-scope="scope">
            <div class="table-tr-pad">{{ $t('settleMent.table.income') }}</div>
            <div class="table-tr-pad">{{ $t('settleMent.table.expend') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" :label="$t('settleMent.table.countRules')" min-width="140">
          <template slot-scope="scope">
            <div class="table-tr-pad">{{ $t('settleMent.table.tradeAmount') + ' * ' + $t('settleMent.table.merchantRate') + ' - ' + countList[scope.$index].first }}</div>
            <div class="table-tr-pad">{{ countList[scope.$index].second ? ($t('settleMent.table.tradeAmount') +  '* ' + $t('settleMent.table.merchantRate') + ' - ' + countList[scope.$index].second) : '&nbsp;' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="join_time" align="center" :label="$t('settleMent.table.isSettle')">
          <template slot-scope="scope">
            <div class="table-tr-pad">
              <el-form-item>
                <el-radio-group v-model="form[scope.row.key1]">
                  <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('settleMent.panel.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="table-tr-pad">
              <el-form-item>
                <el-radio-group v-model="form[scope.row.key2]">
                  <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
                  <el-radio :label="2">{{ $t('settleMent.panel.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </el-form>

    <footer>
      <el-button size="large" type="primary" @click="save">{{ $t('common.save') }}</el-button>
      <el-button size="large" @click="reset">{{ $t('common.reset') }}</el-button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  // import qs from 'qs';

  export default {
    data() {
      return {
        loading: false,
        iconLoading: false,
        form: {
          user: '',
          role: '',
          date: new Date(),
          state: ''
        },
        ruleList: [
          {}
        ],
        countList: [
          {
            name: this.$t('settleMent.table.agent'),
            first: this.$t('settleMent.table.headCost'),
            second: this.$t('settleMent.table.firstCost')
          },
          {
            name: this.$t('settleMent.table.firstAgent'),
            first: this.$t('settleMent.table.firstCost'),
            second: this.$t('settleMent.table.secondCost')
          },
          {
            name: this.$t('settleMent.table.secondAgent'),
            first: this.$t('settleMent.table.secondCost'),
            second: ''
          }
        ],
        desList: [
          {
            key1: 'a',
            key2: 'b'
          },
          {
            key1: 'c',
            key2: 'd'
          },
          {
            key1: 'e',
            key2: 'f'
          }
        ],
        formRules: {

        }
      }
    },
    computed: {

    },
    created() {
      // this.getData();
    },
    methods: {
      // 保存
      save() {
        console.log(this.form, 8888)
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      add() {
        this.ruleList.push({});
      },

      dele() {
        this.ruleList.pop();
      },

      // 返回列表
      close() {
        this.$router.replace({
          name: 'settleMode'
        })
      },

      // 获取数据
      getData () {
        if (!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/perm/user/list`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
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

    }
  }
</script>

<style lang="scss">
  .settleCreate {
    padding: 0 $baseGap $baseGap;
    background-color: #fff;

    .page-header {
      margin-bottom: $midGap;
    }
    .settleCreate {
      padding: 0 $baseGap $baseGap;
      background-color: #fff;
    }

    footer {
      padding-top: $baseGap;
    }
    .form-right-140 {
      width: 140px;
    }
    table .el-form-item {
      width: 120px;
      margin: 0;
    }
    .bottom-border {
      td {
        border-bottom: 1px solid #ebeef5;
      }
    }
    .table-tr-pad {
      padding: 15px 0;
    }
  }
</style>
