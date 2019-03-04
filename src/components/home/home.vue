<template>
  <div class="home">
    <header class="page-header">
      <h2 class="page-title">{{$t('home.title')}}</h2>
    </header>
    <el-row type="flex" class="current-data">
      <el-col :span="6" class="item margin0">
        <div class="left-num">
          <div class="title">{{$t('home.curamt')}}</div>
          <div class="index">HK${{curdata.trade_amt / 100 | formatCurrency}}</div>
        </div>
        <div class="badge amount"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">{{$t('home.curcnt')}}</div>
          <div class="index">{{curdata.trade_cnt}}</div>
        </div>
        <div class="badge count"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">{{$t('home.curnewmchnt')}}</div>
          <div class="index">{{curdata.new_mchnt}}</div>
        </div>
        <div class="badge mchnt-num"></div>
      </el-col>
      <el-col :span="6" class="item">
        <div class="left-num">
          <div class="title">{{$t('home.curnewstore')}}</div>
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
        <div class="bars-legend">
          <div class="mer"><span class="mer-icon"></span>{{$t('home.bar.legend.mer')}}</div>
          <div class="submer"><span class="submer-icon"></span>{{$t('home.bar.legend.submer')}}</div>
        </div>
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
          <div class="cumu-item-val">HK${{total.total_amt / 100 | formatCurrency}}</div>
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
  import _ from 'lodash';
  require('../../assets/js/zChart.js');

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
          {
            "values": [
              {
                "y": 0,
                "x": "03"
              },
              {
                "y": 0,
                "x": "06"
              },
              {
                "y": 0,
                "x": "09"
              },
              {
                "y": 0,
                "x": "12"
              },
              {
                "y": 0,
                "x": "15"
              },
              {
                "y": 0,
                "x": "18"
              },
              {
                "y": 0,
                "x": "21"
              },
              {
                "y": 0,
                "x": "24"
              }
            ],
            "key": "商户"
          },
          {
            "values": [
              {
                "y": 0,
                "x": "03"
              },
              {
                "y": 0,
                "x": "06"
              },
              {
                "y": 0,
                "x": "09"
              },
              {
                "y": 0,
                "x": "12"
              },
              {
                "y": 0,
                "x": "15"
              },
              {
                "y": 0,
                "x": "18"
              },
              {
                "y": 0,
                "x": "21"
              },
              {
                "y": 0,
                "x": "24"
              }
            ],
            "key": "门店"
          }
        ],
        channelTrends: [
          {
            "cnt": "100",
            "name": this.$t('home.all'),
            "trade": "all"
          }
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
      this.createCurveInitData();
    },
    filters: {
      formatCurrency(value) {
        value = String(value)
        if (isNaN(value)) return
        if (!value) return '0.00';

        var intPart = Number(value) | 0; // 获取整数部分
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断

        var floatPart = ".00"; // 预定义小数部分
        var value2Array = value.split(".");

        // =2表示数据有小数位
        if (value2Array.length == 2) {
          floatPart = value2Array[1].toString(); // 拿到小数部分

          if (floatPart.length == 1) { // 补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
          } else {
            return intPartFormat + "." + floatPart;
          }

        } else {
          return intPartFormat + floatPart;
        }
      }
    },
      mounted() {
        this.getCurrentData();
        this.getTradeTrends(); // 交易趋势
        this.getMerchantTradeTrends(); // 商户交易趋势
        this.getChannelTradeAnalysis(); // 通道交易分析
        this.getTotalData()
      },
      methods: {
        createCurveInitData() {
          for (let i = 1; i <= 24; i++) {
            this.tradeTrends.push(
              {
                "cnt": 0,
                "amt": 0,
                "time": i
              }
            )
          }
        },
        sinAndCos() {
          let sin = [], cos = [];
          this.tradeTrends.forEach((v, i) => {
            sin.push({x: +v.time, y: (v.amt / 100).toFixed(2)})
            cos.push({x: +v.time, y: v.cnt});
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
        drawCurveChart(data) {
          let curveChart;
          nv.addGraph(() => {
            curveChart = nv.models.lineChart()
              .options({
                useInteractiveGuideline: true,
                margin: {left: 70},
                forceY: [0]
              });

            curveChart.xAxis
              .tickValues(this.tradeTrends.map((d) => { return d.time }))
              .tickFormat((d) => {
                if(!data.length) {
                  if(d % 3 === 0) {
                    return d + ':00'
                  }
                }else {
                  return d + ':00'
                }
              })
              .showMaxMin(false).staggerLabels(false)
            if (!data.length || _.every(data, {cnt: 0})) {
              curveChart.yDomain([0, 4000])
            }

            d3.select('#curves svg')
              .datum(this.sinAndCos())
              .transition().duration(2000)
              .call(curveChart);
            nv.utils.windowResize(curveChart.update);
          });
        },
        drawBarsChart() {
          let barchart, flag1 = 0, flag2 = 0;
          nv.addGraph(() => {
            barchart = nv.models.multiBarChart()
              .barColor((d, i) => {
                if (d.series == 0) return '#43B2FF';
                return '#7128B1'
              })
              .color(['#43B2FF', '#7128B1'])
              .duration(2000)
              .margin({bottom: 53, left: 84})
              .noData(this.$t('home.nodata'))
              .showControls(false)
              .showLegend(false)
              .groupSpacing(0.5)
              .stacked(false)
              .useInteractiveGuideline(false)
              .reduceXTicks(false).staggerLabels(false);

            barchart.xAxis
              .axisLabelDistance(35)
              .tickFormat(function (d) {
                return d + ':00'
              }).showMaxMin(false)
            barchart.yAxis
              .axisLabelDistance(-5)
              .tickFormat(d3.format('d'));

            this.mchntstore.forEach((item, i) => {
              if(i === 0) {
                flag1 = _.every(item.values, {y: 0})
              }else if(i === 1) {
                flag2 = _.every(item.values, {y: 0})
              }
            })
            if (flag1 && flag2) {
              barchart.yDomain([0, 4000])
            }
//            barchart.legend.dispatch.on('legendClick', (l, e) => {
//              console.log(l, e);
//            })
            d3.select('#bars svg').datum(this.mchntstore).transition().duration(2000).call(barchart);
            nv.utils.windowResize(barchart.update);
          });
        },
        drawPieChart(data) {
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
              .duration(1000)
              .margin({top: 0, left: 0})
              .padAngle(0)
              .donut(1)
              .showTooltipPercent(1)
              .arcsRadius(arcRadius)
              .labelType("key")
              .showLabels(true)
              .showLegend(true)
              .labelsOutside(true)
              .labelSunbeamLayout(0)
              .valueFormat(d3.format('d'))

            if (data.length === 0 || _.every(data, {cnt: '0'})) {
              piechart.color(['gray']);
              piechart.valueFormat(function(d) { return d.cnt }).showLabels(false)
            } else {
              piechart.color(['#0D7FF5', '#5C0AA3', '#FF0E4F', '#FFA2BB', '#01C5F1'])
            }
            d3.select("#pie svg")
              .datum(this.channelTrends)
              .transition().duration(1000)
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
                if (data.data.length) {
                  this.tradeTrends = data.data
                }
                this.drawCurveChart(data.data)
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
                if (data.data.length) {
                  this.mchntstore = data.data;
                }
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
                data.data.length > 0 && !_.every(data.data, {cnt: '0'}) && (this.channelTrends = data.data)
                this.drawPieChart(data.data)
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
                this.curdata = data.data;
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
                this.total = data.data;
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
  @import "../../../src/assets/css/zchart.css";

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
        padding-right:10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 2px 6px 8px 0px rgba(142, 169, 190, 0.1);
        border-radius: 8px;
        align-items: center;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .left-num, .badge {
          display: inline-block;
        }
        .left-num {
          padding: 10px 0 10px 20px;
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
          margin-left: 10px;

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
      height:24px;
      font-size:24px;
      font-weight:bold;
      color:rgba(29,29,36,1);
      line-height:24px;
      top: 20px;left:30px;
    }
    .bars-legend {
      font-size:  12px;
      position: absolute;
      right: 40px;
      top: 40px;
      display: -webkit-flex;
      align-items: center;
      .mer,.submer {
        margin-right: 30px;
        .mer-icon {
          display:inline-block;
          width:10px;height:10px;
          border-radius: 50%;
          background-color: rgb(67, 178, 255);
          margin-right:5px;
        }
        .submer-icon {
          display:inline-block;
          width:10px;height:10px;
          border-radius: 50%;
          background-color: rgb(79, 28, 123);
          margin-right:5px;
        }
      }
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
