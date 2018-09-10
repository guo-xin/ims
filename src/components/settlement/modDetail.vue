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
          <span class="detail-content">{{ detailData.name }}</span>
        </div>

        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.payPass') }}</span>
          <span class="detail-content">{{ detailData.chnlname }}</span>
        </div>
      </div>

      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.effectTime') }}</span>
          <span class="detail-content">{{ detailData.effect_time }}</span>
        </div>
        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.singleAmount') }}</span>
          <span class="detail-content">{{ enableList[detailData.enable_condition] }}<label style="padding-left: 20px">{{ detailData.enable_value }}</label></span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.passCost') }}</span>
          <span class="detail-content" v-if="detailData.type !== 1">{{ detailData.chnlcost_type === 1 ? $t('settleMent.panel.percent') : $t('settleMent.panel.staticAmount') }}</span>
          <span class="detail-content" v-else>{{ detailData.chnlcost_type === 1 ? detailData.chnlcost + '%' : detailData.chnlcost }}</span>
        </div>

        <div class="detail-right">
          <span class="detail-title">{{ $t('settleMent.panel.settleCircle') }}</span>
          <span class="detail-content">{{ cycleList[detailData.settlement_cycle] }}</span>
        </div>
      </div>
      <div class="detail-row">
        <div class="detail-left">
          <span class="detail-title">{{ $t('settleMent.panel.floorType') }}</span>
          <span class="detail-content">{{ typeList[detailData.type] }}</span>
        </div>
        <div class="detail-right" v-if="detailData.type !== 1">
          <span class="detail-title">{{ $t('settleMent.table.isMode') }}</span>
          <span class="detail-content">{{ detailData.is_default ? $t('settleMent.panel.yes') : $t('settleMent.panel.no') }}</span>
        </div>
      </div>

      <el-table :data="detailData.ladder_conf"  v-if="detailData.type === 2 || detailData.type === 3">
        <el-table-column align="center" :label="$t('settleMent.table.order')" width="80">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="start" align="center" :label="$t('settleMent.table.startVal')"></el-table-column>
        <el-table-column prop="end" align="center" :label="$t('settleMent.table.endVal')"></el-table-column>
        <el-table-column prop="chnlcost" align="center" :label="$t('settleMent.panel.passCost')"></el-table-column>
        <el-table-column prop="one" align="center" :label="$t('settleMent.table.firstRate')"></el-table-column>
        <el-table-column prop="two" align="center" :label="$t('settleMent.table.secondRate')"></el-table-column>
      </el-table>

      <el-table :data="countList" class="bottom-border">
        <el-table-column prop="name" align="center" :label="$t('settleMent.panel.settleName')"></el-table-column>
        <el-table-column align="center" :label="$t('settleMent.panel.settleDetail')">
          <template slot-scope="scope">
            <div class="table-tr-pad">{{ $t('settleMent.table.income') }}</div>
            <div class="table-tr-pad">{{ $t('settleMent.table.expend') }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.countRules')" min-width="140">
          <template slot-scope="scope">
            <div class="table-tr-pad">{{ $t('settleMent.table.tradeAmount') + ' * ' + $t('settleMent.table.merchantRate') + ' - ' + scope.row.first }}</div>
            <div class="table-tr-pad">{{ scope.row.second ? ($t('settleMent.table.tradeAmount') +  '* ' + $t('settleMent.table.merchantRate') + ' - ' + scope.row.second) : '&nbsp;' }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.isSettle')">
          <template slot-scope="scope">
            <div class="table-tr-pad">{{ (chnlList[scope.$index] || {})['in'] ? $t('settleMent.panel.yes') : $t('settleMent.panel.no') }}</div>
            <div class="table-tr-pad">{{ (chnlList[scope.$index] || {})['out'] ? $t('settleMent.panel.yes') : $t('settleMent.panel.no')}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <footer>
      <el-button size="large" type="primary" @click="edit" v-if="basicAuth.includes('clearing_template_edit')">{{ $t('common.edit') }}</el-button>
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
        enableList: {
          gt: '>',
          ge: ">=",
          lt: '<',
          le: '<='
        },
        cycleList: {
          1: this.$t('settleMent.panel.day'),
          2: this.$t('settleMent.panel.week'),
          3: this.$t('settleMent.panel.month')
        },
        typeList: {
          1: this.$t('settleMent.panel.noEffect'),
          2: this.$t('settleMent.table.tradeNum'),
          3: this.$t('settleMent.table.tradeAmount')
        },
        chnlList: [],
        tempId: null,
        detailData: {

        }
      }
    },
    computed: {
      basicAuth() {
        return this.$store.state.permissionData || [];
      }
    },
    created() {
      // 清除数据
      localStorage.removeItem('detailData');

      this.tempId = this.$route.query.id;
      this.getData();
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
        localStorage.setItem('detailData', JSON.stringify(this.detailData));
        this.$router.replace({
          name: 'modCreate',
          query: {
            id: this.tempId
          }
        })
      },
      // 获取数据
      getData () {
        if (!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/org/clearing/temp/info?temp_id=${this.tempId}`).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.detailData = data.data || {};
              this.chnlList = this.detailData.settlement_conf || [];
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
  .modDetail {
    padding: 0 $baseGap $baseGap;
    background-color: #fff;
    .page-header {
      margin-bottom: $midGap;
    }

    footer {
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
    .bottom-border {
      td {
        border-bottom: 1px solid #ebeef5;
      }
    }
    .table-tr-pad {
      padding: 15px 0;
      height: 40px;
      box-sizing: content-box;
      line-height: 40px;
    }
  }
</style>
