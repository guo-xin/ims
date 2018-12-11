<template>
  <div class="home">
    <header class="page-header">
      <h2 class="page-title">{{$t('home.title')}}</h2>
    </header>
    <el-row type="flex" class="current-data">
      <el-col :span="6" class="item margin0">
        <div class="left-num">
          <div class="title">当日交易金额</div>
          <div class="index">HK${{curdata.trade_amt}}</div>
        </div>
        <div class="badge amount"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">当日交易笔数</div>
          <div class="index">{{curdata.trade_cnt}}</div>
        </div>
        <div class="badge count"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">当日新增商户</div>
          <div class="index">{{curdata.new_mchnt}}</div>
        </div>
        <div class="badge mchnt-num"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">当日新增门店</div>
          <div class="index">{{curdata.new_submchnt}}</div>
        </div>
        <div class="badge store-num"></div>
      </el-col>
    </el-row>
    <el-row type="flex" class="with-3d-shadow with-transitions curve" id="curves">
      <div class="curve-title">{{$t('home.curve.title')}}</div>
      <svg></svg>
    </el-row>
    <el-row type="flex" class="with-3d-shadow with-transitions second-row">
      <el-col :span="15" class="" id="bars">
        <div class="bars-title">{{$t('home.bar.title')}}</div>
        <svg></svg>
      </el-col>
      <el-col :span="9" class="" id="pie">
        <div class="pie-title">{{$t('home.pie.title')}}</div>
        <svg></svg>
      </el-col>
    </el-row>
    <section id="cumu">
      <h2 class="cumu-title">{{$t('home.cumu.title')}}</h2>
      <el-row type="flex" class="cumu-row">
        <el-col :span="12" class="left">
          <div class="cumu-item-label">{{$t('home.cumu.totle_mount')}}</div>
          <div class="cumu-item-val">HK${{total.total_amt}}</div>
        </el-col>
        <el-col :span="12" class="right">
          <div class="cumu-item-label">{{$t('home.cumu.totle_count')}}</div>
          <div class="cumu-item-val">{{total.total_cnt}}</div>
        </el-col>
      </el-row>

      <el-row type="flex" class="cumu-row">
        <el-col :span="12" class="left">
          <div class="cumu-item-label">{{$t('home.cumu.totle_mchnt_num')}}</div>
          <div class="cumu-item-val">{{total.total_mchnt_num}}</div>
        </el-col>
        <el-col :span="12" class="right">
          <div class="cumu-item-label">{{$t('home.cumu.totle_store_num')}}</div>
          <div class="cumu-item-val">{{total.total_submchnt_num}}</div>
        </el-col>
      </el-row>

      <el-row type="flex" class="cumu-row">
        <el-col :span="12" class="left">
          <div class="cumu-item-label">{{$t('home.cumu.totle_agent_num')}}</div>
          <div class="cumu-item-val">{{total.total_qd_num}}</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
  import * as d3 from 'd3';
  import config from 'config'
  import axios from 'axios';

  require('../../assets/js/nv.d3.min.js');
  export default {
    data() {
      return {
        curdata: {
          new_mchnt: 0,
          new_submchnt: 0,
          trade_amt: 0,
          trade_cnt: 0
        },
        tradeTrends: [],
        mchntstore: [
//          {
//            values: [{x: "3:00", y: 80}, {x: "6:00", y: 137}, {x: "9:00", y: 185}, {x: "12:00", y: 119}, {
//              x: "15:00",
//              y: 112
//            }, {x: "18:00", y: 112}, {x: "21:00", y: 112}],
//            key: "mchnt"
//          },
//          {
//            values: [{x: "3:00", y: 92}, {x: "6:00", y: 64}, {x: "9:00", y: 137}, {
//              x: "12:00",
//              y: 57
//            }, {x: "15:00", y: 111}, {x: "18:00", y: 46}, {x: "21:00", y: 85}],
//            key: "submchnt"
//          }
        ],
        channelTrends: [
//          {
//            "cnt": "20639",
//            "name": "微信",
//            "trade": "weixin"
//          }, {
//            "cnt": "36439",
//            "name": "支付宝",
//            "trade": "alipay"
//          }, {
//            "cnt": "92509",
//            "name": "微信HK",
//            "trade": "weixin_hk"
//          }, {
//            "cnt": "67429",
//            "name": "银联",
//            "trade": "unionpay"
//          }, {
//            "cnt": "43788",
//            "name": "支付宝hk",
//            "trade": "alipay_hk"
//          }
        ],
        total: {
          total_amt: 0,
          total_cnt: 0,
          total_qd_num: 0,
          total_submchnt_num: 0,
          total_mchnt_num: 0
        }
      }
    },
    created() {
      this.getCurrentData();
      this.getTradeTrends(); // 交易趋势
      this.getMerchantTradeTrends(); // 商户交易趋势
      this.getChannelTradeAnalysis(); // 通道交易分析
      this.getTotalData()
    },
    mounted() {

    },
    methods: {
      sinAndCos() {
        let sin = [], cos = [];
//        for (var i = 0; i < 100; i++) {
//          sin.push({x: i, y: i % 10 == 5 ? null : Math.sin(i / 10)});
//          cos.push({x: i, y: 0.5 * Math.cos(i / 10)});
//        }
        this.tradeTrends.forEach((v, i) => {
           sin.push({x: v.time, y: +v.amt})
           cos.push({x: v.time, y: +v.cnt});
        })
        return [
          {
            values: sin,
            key: this.$t('home.amt'),
            color: "#2974FF",
          },
          {
            values: cos,
            key: this.$t('home.cnt'),
            color: "#FF5C1F"
          }
        ];
      },
      drawCurveChart() {
        let curveChart, data;
        nv.addGraph(() => {
          curveChart = nv.models.lineChart()
            .options({
              duration: 2000,
              useInteractiveGuideline: true,
              margin: {left: 70},
              noData: '没有可用数据'
            })
          ;
          curveChart.xAxis.staggerLabels(false)
          ;
          curveChart.yAxis
            .tickFormat(d3.format(',.2f'))
          ;
          data = this.sinAndCos();
          d3.select('#curves svg')
            .datum(data)
            .transition().duration(2000)
            .call(curveChart);
          nv.utils.windowResize(curveChart.update);
        });
      },
      drawBarsChart() {
        let barchart;
        nv.addGraph(() => {
          barchart = nv.models.multiBarChart()
            .barColor((d, i) => {
              if (d.series == 0) return '#43B2FF';
              return '#7128B1'
            })
            .color(['#43B2FF', '#7128B1'])
            .duration(2000)
            .margin({bottom: 53, left: 84})
            .noData('没有可用数据')
            .showControls(false)
            .showLegend(true)
            .groupSpacing(0.5)
            .stacked(false)
            .useInteractiveGuideline(true)
            .reduceXTicks(false).staggerLabels(false);

          barchart.xAxis
            .axisLabelDistance(35)
            .showMaxMin(false);
          barchart.yAxis
            .axisLabelDistance(-5)
            .tickFormat(d3.format('d'));

          d3.select('#bars svg').datum(this.mchntstore).transition().duration(2000).call(barchart);
          nv.utils.windowResize(barchart.update);
        });
      },
      drawPieChart() {
        let piechart,
            arcRadius = [
          {inner: 0.5, outer: 0.6},
          {inner: 0.5, outer: 0.6},
          {inner: 0.5, outer: 0.6},
          {inner: 0.5, outer: 0.6},
          {inner: 0.5, outer: 0.6}
        ];
        nv.addGraph(() => {
          piechart = nv.models.pieChart()
            .x(function (d) {
              return d.name
            })
            .y(function (d) {
              return d.cnt
            })
            .height(360)
            .margin({top: 0, left: 0})
            .padAngle(0.02)
            .donut(1)
            .donutRatio(0.75)
            .showTooltipPercent(1)
            .arcsRadius(arcRadius)
            .labelType("key")
            .showLabels(1)
            .labelsOutside(1)
            .labelSunbeamLayout(0)
            .noData('没有可用数据')
//            .legend({width: '70px', position: {right: 20}, align: 'center'})

          d3.select("#pie svg")
            .datum(this.channelTrends)
            .transition().duration(3000)
            .call(piechart);
          nv.utils.windowResize(piechart.update)
        });
      },
      getTradeTrends() {
        axios.get(`${config.host}/org/stat/td_detail`, { // 曲线图
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
//              this.tradeTrends = data.data
              this.drawCurveChart()
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getMerchantTradeTrends() { //  柱状图数据，商户交易趋势
        axios.get(`${config.host}/org/stat/td_mchnt`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.mchntstore = data.data;
              this.drawBarsChart()
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getChannelTradeAnalysis() { // 饼图 通道交易分析
        axios.get(`${config.host}/org/stat/td_trade`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              data.data.length > 0 && (this.channelTrends = data.data)
              this.drawPieChart()
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getCurrentData() {
        axios.get(`${config.host}/org/stat/td_data`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.curdata = data.data
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getTotalData() {
        axios.get(`${config.host}/org/stat/total_data`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.total = data.data
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../src/assets/css/nv.d3.min.css";

  .home {
    .current-data {
      justify-content: space-between;
      -webkit-justify-content: space-between;
      .margin0 {
        margin: 0 !important;
      }
      .flex {
        display: -webkit-flex;
        display: -o-flex;
        display: -ms-flex;
      }
      .item {
        height: 80px;
        margin-left: 16px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 6px 8px 0px rgba(142, 169, 190, 0.1);
        border-radius: 8px;
        align-items: center;
        display: -webkit-flex;
        .left-num, .badge {
          display: inline-block;
        }
        .left-num {
          padding: 10px 0px 10px 20px;
          width: 174px;
          .title {
            font-size: 14px;
            font-weight: 400;
            color: #717283;
            margin-bottom: 10px;
          }
          .index {
            color: #1D1D24;
            font-size: 24px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .badge {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          margin-left: 20px;

        }
        .amount {
          background: url(../../assets/common_img/amount@2x.png) center center no-repeat rgba(41, 116, 255, 1);
          background-size: 42px 42px;
        }
        .count {
          background: url(../../assets/common_img/count@2x.png) center center no-repeat rgba(122, 63, 255, 1);
          background-size: 42px 42px;
        }
        .mchnt-num {
          background: url(../../assets/common_img/mchnt@2x.png) center center no-repeat rgba(255, 92, 31, 1);
          background-size: 42px 42px;
        }
        .store-num {
          background: url(../../assets/common_img/store@2x.png) center center no-repeat rgba(255, 214, 65, 1);
          background-size: 42px 42px;
        }
      }
    }
    .curve {
      background: rgba(255, 255, 255, 1);
      box-shadow: 2px 6px 8px 0px rgba(142, 169, 190, 0.1);
      border-radius: 8px;
      margin-top: 30px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    #curves {
      height:400px;
      padding: 38px 30px 0 30px;position:relative;
    }
    .bars-title,.curve-title,.pie-title {
      position: absolute;
      width:261px;
      height:24px;
      font-size:24px;
      font-weight:bold;
      color:rgba(29,29,36,1);
      line-height:24px;
      top: 20px;left:30px;
    }
    .second-row {
      margin-top: 30px;
      height: 356px;
      #bars, #pie {
        position:relative;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 6px 8px 0px rgba(142, 169, 190, 0.1);
        border-radius: 8px;
        padding-top: 38px;
      }
      #pie {padding-top: 50px;}
      #bars {
        margin-right: 30px;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    #cumu {
      background: rgba(255, 255, 255, 1);
      box-shadow: 2px 6px 8px 0px rgba(142, 169, 190, 0.1);
      border-radius: 8px;
      margin-top: 30px;
      padding: 10px 30px 30px 30px;
      .cumu-title {
        margin-bottom: 0;
        padding-bottom: 15px;
        border-bottom: 2px solid rgba(204, 204, 213, 1);
      }
      .cumu-row {
        margin-top: 8px;
        height: 108px;
        .left {
          background: rgba(204, 204, 213, 0.1);
        }
        .right {
          margin-left: 10px;
          background: rgba(204, 204, 213, 0.1);
        }
        .cumu-item-label {
          font-size: 18px;
          font-weight: 400;
          line-height: 18px;
          padding: 20px 0 10px 15px;
          color: #717283;
        }
        .cumu-item-val {
          font-size: 36px;
          font-weight: 500;
          color: #1D1D24;
          line-height: 40px;
          padding: 5px 0 10px 15px;
        }
      }
    }

  }
</style>
