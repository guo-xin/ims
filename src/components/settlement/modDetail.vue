<template>
  <div class="modDetail">
    <header class="page-header style2">
      <div class="header-left">
        <h2 class="page-title">{{ $t('settleMent.crumbs.T7') }}</h2>
      </div>
      <div class="header-right">
        <el-button type="text"  @click="close"><i class="el-icon-close"></i>{{  $t('common.close') }}</el-button>
      </div>
    </header>
    <div class="panel-body">
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.modeName') }}</span>
          <span class="detail-content">3333</span>
        </div>
        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.payPass') }}</span>
          <span class="detail-content">ererer</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.effectTime') }}</span>
          <span class="detail-content">3333</span>
        </div>
        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.table.payGoods') }}</span>
          <span class="detail-content">ererer</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.singleAmount') }}</span>
          <span class="detail-content">3333</span>
        </div>
        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.passCost') }}</span>
          <span class="detail-content">ererer</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.settleCircle') }}</span>
          <span class="detail-content">3333</span>
        </div>
        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.floorType') }}</span>
          <span class="detail-content">ererer</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.table.isMode') }}</span>
          <span class="detail-content">3333</span>
        </div>
      </div>
      <el-table :data="ruleList">
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.table.order')" width="80"></el-table-column>
        <el-table-column prop="nickname" align="center" :label="$t('settleMent.table.startVal')">
          <template slot-scope="scope">
            111
          </template>
        </el-table-column>
        <el-table-column prop="role_name" align="center" :label="$t('settleMent.table.endVal')">
          <template slot-scope="scope">
            2222
          </template>
        </el-table-column>
        <el-table-column prop="role_name" align="center" :label="$t('settleMent.panel.passCost')">
          <template slot-scope="scope">
            3333
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" :label="$t('settleMent.table.firstRate')">
          <template slot-scope="scope">
            4444
          </template>
        </el-table-column>
        <el-table-column prop="username" align="center" :label="$t('settleMent.table.secondRate')">
          <template slot-scope="scope">
            333444555
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="desList">
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

            </div>
            <div class="table-tr-pad">

            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer>
      <el-button size="large" type="primary" @click="edit">{{ $t('common.edit') }}</el-button>
      <el-button size="large" @click="close">{{ $t('common.close') }}</el-button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      return {
        loading: false,
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

      }
    },
    computed: {

    },
    created() {
      // this.getData();
    },
    methods: {
      // 返回列表
      close() {
        this.$router.replace({
          name: 'settleMode'
        })
      },

      // 编辑
      edit() {
        this.$router.replace({
          name: 'settleCreate'
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

<style scoped lang="scss">
  .page-header {
    margin-bottom: $midGap;
  }
  .modDetail {
    padding: 0 $baseGap $baseGap;
    background-color: #fff;
  }

  .el-main footer {
    padding-top: $baseGap;
  }
  .detail-row {
    font-size: $baseSize;
    display: flex;
    padding-bottom: 15px;
    .detail-left {
      flex: 1;
    }
    .detail-right {
      flex: 2;
    }
    .detail-title {
      color: $titleColor;
      font-weight: bold;
    }
    .detail-content {
      padding-left: $smGap;
      color: $submenu-font-color;
    }
  }
  .table-tr-pad {
    padding: 15px 0;
  }
</style>
