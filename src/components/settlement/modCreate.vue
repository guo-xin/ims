<template>
  <div class="settleCreate" v-loading="loading" :element-loading-text="$t('common.loading')">
    <header class="page-header style2">
      <div class="header-left">
        <h2 class="page-title">{{ isCreat ? $t('settleMent.crumbs.T5') : $t('settleMent.crumbs.T6') }}</h2>
      </div>
      <div class="header-right">
        <el-button type="text"  @click="close"><i class="el-icon-close"></i>{{  $t('common.close') }}</el-button>
      </div>
    </header>

    <el-form ref="form" :model="form" :rules="formRules">
      <el-form-item :label="$t('settleMent.panel.modeName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.effectTime')" prop="effect_time" class="date-form-item">
        <el-date-picker
          v-model="form.effect_time"
          type="date"
          :editable="false"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false"
          :picker-options="dateRange">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.payPass')" prop="chnlcode">
        <el-select v-model="form.chnlcode" :placeholder="$t('common.choose')">
          <el-option v-for="(item, index) in passList" :label="item.chnlname" :value="item.chnlid" :key="index"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('settleMent.panel.settleCircle')" prop="settlement_cycle">
        <el-select v-model="form.settlement_cycle" :placeholder="$t('common.choose')">
          <el-option :label="$t('settleMent.panel.day')" value=1></el-option>
          <el-option :label="$t('settleMent.panel.week')" value=2></el-option>
          <el-option :label="$t('settleMent.panel.month')" value=3></el-option>
        </el-select>
      </el-form-item>

      <div class="row-inline">
        <el-form-item :label="$t('settleMent.panel.singleAmount')" prop="enable_value" class="form-right-140">
          <el-input v-model="form.enable_value"></el-input>
        </el-form-item>
        <el-form-item prop="enable_condition">
          <el-radio-group v-model="form.enable_condition">
            <el-radio :label="'gt'">&gt;</el-radio>
            <el-radio :label="'ge'">&gt;=</el-radio>
            <el-radio :label="'lt'">&lt;</el-radio>
            <el-radio :label="'le'">&lt;=</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="row-inline">
        <el-form-item :label="$t('settleMent.panel.passCost')" prop="chnlcost_type" class="form-right-140" style="margin-right: 10px">
          <el-select v-model="form.chnlcost_type" :placeholder="$t('common.choose')">
            <el-option :label="$t('settleMent.panel.percent')" value=1></el-option>
            <el-option :label="$t('settleMent.panel.staticAmount')" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="chnlcost" ref="chnlcost" class="form-right-140" v-if="form.type === '1' || !form.type">
          <el-input v-model="form.chnlcost"></el-input>
        </el-form-item>
      </div>

      <el-form-item :label="$t('settleMent.panel.floorType')" prop="type" class="form-right-140">
        <el-select v-model="form.type" :placeholder="$t('common.choose')" @change="typeChange">
          <el-option :label="$t('settleMent.panel.noEffect')" value=1></el-option>
          <el-option :label="$t('settleMent.table.tradeNum')" value=2></el-option>
          <el-option :label="$t('settleMent.table.tradeAmount')" value=3></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settleMent.panel.floorCount')" v-if="form.type === '2' || form.type === '3'" prop="use_ladder" class="form-inline-label">
        <el-radio-group v-model="form.use_ladder">
          <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('settleMent.panel.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('settleMent.table.isMode')" prop="is_default" class="form-inline-label" :style="$i18n.locale === 'en' ? {'width': '350px'} : ''">
        <el-radio-group v-model="form.is_default">
          <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
          <el-radio :label="0">{{ $t('settleMent.panel.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('settleMent.table.modeState')" prop="status" class="form-inline-label">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">{{ $t('settleMent.table.open') }}</el-radio>
          <el-radio :label="0">{{ $t('settleMent.table.close') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-table :data="ruleList" v-if="form.type === '2' || form.type === '3'" class="table-width">
        <el-table-column align="center" :label="$t('settleMent.table.order')" width="80" class-name="margin-40">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.startVal')">
          <template slot-scope="scope">
            <el-form-item :prop="'start' + scope.$index">
              <el-input v-model="form['start' + scope.$index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.endVal')">
          <template slot-scope="scope">
            <el-form-item :prop="'end' + scope.$index">
              <el-input v-model="form['end' + scope.$index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.panel.passCost')">
          <template slot-scope="scope">
            <el-form-item :prop="'chnlcost' + scope.$index">
              <el-input v-model="form['chnlcost' + scope.$index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.firstRate')">
          <template slot-scope="scope">
            <el-form-item :prop="'one' + scope.$index">
              <el-input v-model="form['one' + scope.$index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('settleMent.table.secondRate')">
          <template slot-scope="scope">
            <el-form-item :prop="'two' + scope.$index">
              <el-input v-model="form['two' + scope.$index]"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('common.operate')" min-width="120" class-name="margin-40">
          <template slot-scope="scope">
            <el-button type="text" @click="add()" v-if="ruleList.length < 3 && scope.$index >= ruleList.length - 1 ">{{ $t('common.add') }}</el-button>
            <el-button type="text" @click="dele()" v-if="ruleList.length > 1">{{ $t('common.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="countList" class="bottom-border">
        <el-table-column prop="name" align="center" :label="$t('settleMent.panel.settleName')">
        </el-table-column>
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
            <div class="table-tr-pad">
              <el-form-item :prop="'income' + scope.$index">
                <el-radio-group v-model="form['income' + scope.$index]">
                  <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
                  <el-radio :label="0">{{ $t('settleMent.panel.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="table-tr-pad">
              <el-form-item :prop="'expend' + scope.$index">
                <el-radio-group v-model="form['expend' + scope.$index]">
                  <el-radio :label="1">{{ $t('settleMent.panel.yes') }}</el-radio>
                  <el-radio :label="0">{{ $t('settleMent.panel.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </el-form>
    <footer>
      <el-button size="large" @click="close" v-if="!isCreat">{{ $t('common.close') }}</el-button>
      <el-button size="large" :loading="iconLoading" type="primary" @click="save">{{ $t('common.save') }}</el-button>
      <el-button size="large" @click="reset" v-if="isCreat">{{ $t('common.reset') }}</el-button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import { formatDate } from '../../common/js/util';
  import qs from 'qs';

  export default {
    data() {
      let numCheck = (rule, val, cb) => {
        if((val + '').indexOf("-") > -1) {
          cb(new Error(this.$t('settleMent.msg.t4')));
        } else if(!/^\d+(\.\d{1,2})?$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t5')));
        } else {
          cb();
        }
      };

      let numStart0 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else if(this.form.end0 && +val > +this.form.end0) {
          cb(new Error(this.$t('settleMent.msg.t17')));
        } else {
          cb();
        }
      };
      let numEnd0 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*?$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else {
          if(this.form.start0) {
            this.$refs['form'].validateField('start0');
          }
          cb();
        }
      };
      let numStart1 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else if(this.form.end1 && +val > +this.form.end1) {
          cb(new Error(this.$t('settleMent.msg.t17')));
        } else {
          cb();
        }
      };

      let numEnd1 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*?$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else {
          if(this.form.start1) {
            this.$refs['form'].validateField('start1');
          }
          cb();
        }
      };

      let numStart2 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else if(this.form.end2 && +val > +this.form.end2) {
          cb(new Error(this.$t('settleMent.msg.t17')));
        } else {
          cb();
        }
      };
      let numEnd2 = (rule, val, cb) => {
        if(this.form.type === '2' && !/^[1-9]\d*?$/.test(val)) {
          cb(new Error(this.$t('settleMent.msg.t16')));
        } else {
          if(this.form.start2) {
            this.$refs['form'].validateField('start2');
          }
          cb();
        }
      };

      let date = new Date();
      date = date.valueOf() + 24 * 3600 * 1000;

      return {
        loading: false,
        iconLoading: false,
        dateRange: {
          disabledDate: (time) => {
            return time.getTime() < (Date.now());
          }
        },
        isCreat: false,
        passList: [],
        form: {
          name: '',
          effect_time: new Date(date),
          enable_value: null,
          enable_condition: '',
          chnlcode: '',
          settlement_cycle: '',
          chnlcost_type: '',
          chnlcost: null,
          type: '1',
          use_ladder: 1,
          is_default: 1,
          status: 1,
          income0: 1,
          expend0: 1,
          income1: 1,
          expend1: 1,
          income2: 0,
          expend2: 0,
          start0: null,
          end0: null,
          chnlcost0: null,
          one0: null,
          two0: null,
          start1: null,
          end1: null,
          chnlcost1: null,
          one1: null,
          two1: null,
          start2: null,
          end2: null,
          chnlcost2: null,
          one2: null,
          two2: null
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
        formRules: {
          name: [
            { required: true, message: this.$t('settleMent.msg.t1') },
            { max: 20, message: this.$t('settleMent.msg.t2') }
          ],
          enable_value: [
            { required: true, message: this.$t('settleMent.msg.t3') },
            { validator: numCheck }
          ],
          enable_condition: [
            { required: true, message: this.$t('settleMent.msg.t6') }
          ],
          chnlcode: [
            { required: true, message: this.$t('settleMent.msg.t7') }
          ],
          settlement_cycle: [
            { required: true, message: this.$t('settleMent.msg.t8') }
          ],
          chnlcost_type: [
            { required: true, message: this.$t('settleMent.msg.t9') }
          ],
          chnlcost: [
            { required: true, message: this.$t('settleMent.msg.t10') }
          ],
          start0: [
            { required: true, message: this.$t('settleMent.msg.t12') },
            { validator: numCheck },
            { validator: numStart0 }
          ],
          end0: [
            { required: true, message: this.$t('settleMent.msg.t13') },
            { validator: numCheck },
            { validator: numEnd0 }
          ],
          chnlcost0: [
            { required: true, message: this.$t('settleMent.msg.t10') },
            { validator: numCheck }
          ],
          one0: [
            { required: true, message: this.$t('settleMent.msg.t14') },
            { validator: numCheck }
          ],
          two0: [
            { required: true, message: this.$t('settleMent.msg.t15') },
            { validator: numCheck }
          ],
          start1: [
            { required: true, message: this.$t('settleMent.msg.t12') },
            { validator: numCheck },
            { validator: numStart1 }
          ],
          end1: [
            { required: true, message: this.$t('settleMent.msg.t13') },
            { validator: numCheck },
            { validator: numEnd1 }
          ],
          chnlcost1: [
            { required: true, message: this.$t('settleMent.msg.t10') },
            { validator: numCheck }
          ],
          one1: [
            { required: true, message: this.$t('settleMent.msg.t14') },
            { validator: numCheck }
          ],
          two1: [
            { required: true, message: this.$t('settleMent.msg.t15') },
            { validator: numCheck }
          ],
          start2: [
            { required: true, message: this.$t('settleMent.msg.t12') },
            { validator: numCheck },
            { validator: numStart2 }
          ],
          end2: [
            { required: true, message: this.$t('settleMent.msg.t13') },
            { validator: numCheck },
            { validator: numEnd2 }
          ],
          chnlcost2: [
            { required: true, message: this.$t('settleMent.msg.t10') },
            { validator: numCheck }
          ],
          one2: [
            { required: true, message: this.$t('settleMent.msg.t14') },
            { validator: numCheck }
          ],
          two2: [
            { required: true, message: this.$t('settleMent.msg.t15') },
            { validator: numCheck }
          ]
        }
      }
    },

    created() {
      if(this.$route.query.create) {
        this.isCreat = true;
      }else {
        let detailData = JSON.parse(localStorage.getItem('detailData'));
        Object.assign(this.form, {
            name: detailData.name,
            effect_time: new Date(detailData.effect_time),
            enable_value: detailData.enable_value,
            enable_condition: detailData.enable_condition,
            settlement_cycle: detailData.settlement_cycle + '',
            chnlcost_type: detailData.chnlcost_type + '',
            chnlcost: detailData.chnlcost,
            type: detailData.type + '',
            use_ladder: detailData.use_ladder,
            is_default: detailData.is_default,
            status: detailData.status,
            income0: detailData.settlement_conf[0].in,
            expend0: detailData.settlement_conf[0].out,
            income1: detailData.settlement_conf[1].in,
            expend1: detailData.settlement_conf[1].out,
            income2: detailData.settlement_conf[2].in,
            expend2: detailData.settlement_conf[2].out,
            start0: (detailData.ladder_conf[0] || {}).start,
            end0: (detailData.ladder_conf[0] || {}).end,
            chnlcost0: (detailData.ladder_conf[0] || {}).chnlcost,
            one0: (detailData.ladder_conf[0] || {}).one,
            two0: (detailData.ladder_conf[0] || {}).two,
            start1: (detailData.ladder_conf[1] || {}).start,
            end1: (detailData.ladder_conf[1] || {}).end,
            chnlcost1: (detailData.ladder_conf[1] || {}).chnlcost,
            one1: (detailData.ladder_conf[1] || {}).one,
            two1: (detailData.ladder_conf[1] || {}).two,
            start2: (detailData.ladder_conf[2] || {}).start,
            end2: (detailData.ladder_conf[2] || {}).end,
            chnlcost2: (detailData.ladder_conf[2] || {}).chnlcost,
            one2: (detailData.ladder_conf[2] || {}).one,
            two2: (detailData.ladder_conf[2] || {}).two
          }
        )
        this.ruleList = detailData.ladder_conf;
      }
      this.getList();
    },
    methods: {
      // 保存
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            let form = this.form;
            let time = new Date(form.effect_time);
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0);

            let [params, url] = [];
            params = {
              name: form.name,
              effect_time: formatDate(time, 'yyyy-MM-dd HH:mm:ss'),
              enable_value: form.enable_value,
              enable_condition: form.enable_condition,
              chnlid: form.chnlcode,
              settlement_cycle: form.settlement_cycle,
              chnlcost_type: form.chnlcost_type,
              chnlcost: form.chnlcost,
              type: form.type,
              use_ladder: form.use_ladder,
              is_default: form.is_default,
              status: form.status,
              format: 'cors',
              settlement_conf: JSON.stringify(
                [
                  {in: form.income0, out: form.expend0},
                  {in: form.income1, out: form.expend1},
                  {in: form.income2, out: form.expend2},
                ]
              )
            }
            if(form.type !== '1' ) {
              let list = this.ruleList.map((val, index) => {
                return ({
                  start: form['start' + index],
                  end: form['end' + index],
                  chnlcost: form['chnlcost' + index],
                  one: form['one' + index],
                  two: form['two' + index]
                });
              })
              Object.assign(params, {
                ladder_conf: JSON.stringify(list),
                chnlcost: 0
              })
            }
            if(this.isCreat) {
              url = 'org/clearing/temp';
            }else {
              Object.assign(params, {
                temp_id: this.$route.query.id
              })
              url = 'org/clearing/temp/info';
            }
            axios.post(`${config.host}/${url}`, qs.stringify(params)).then((res) => {
              this.iconLoading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: this.$t('common.opSucc')
                });
                this.$router.push({name: 'settleMode'});
              }else {

                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.iconLoading = false;
              this.$message.error(this.$t('common.netError'));
            })
          }
        });
      },

      // 重置
      reset() {
        this.$refs['form'].resetFields();
      },

      // 阶梯类型改变
      typeChange(val) {
        // 清空通道成本并移除校验
        this.$refs['chnlcost'] && this.$refs['chnlcost'].resetField();

        Object.assign(this.form, {
          use_ladder: 1,
          start0: null,
          end0: null,
          chnlcost0: null,
          one0: null,
          two0: null,
          start1: null,
          end1: null,
          chnlcost1: null,
          one1: null,
          two1: null,
          start2: null,
          end2: null,
          chnlcost2: null,
          one2: null,
          two2: null
        })

        this.ruleList = [{}];
      },

      // 增加规则
      add() {
        this.ruleList.push({});
      },

      // 删除规则
      dele() {
        this.ruleList.pop();
      },

      // 返回列表
      close() {
        this.$router.replace({
          name: 'settleMode'
        })
      },

      // 获取通道列表
      getList () {
        let list = this.$store.state.passList;
        if(list) {
          this.passList = list;
          if(!this.isCreat) {
            let detailData = JSON.parse(localStorage.getItem('detailData'));
            this.form.chnlcode = detailData.chnlid + '';
          }
        }else {
          this.loading = true;
          axios.get(`${config.host}/org/clearing/temp/chnls?format=cors`).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.passList = data.data;
              this.$store.state.passList = data.data;
              if(!this.isCreat) {
                let detailData = JSON.parse(localStorage.getItem('detailData'));
                this.form.chnlcode = detailData.chnlid + '';
              }
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          });
        }
      }
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
    .row-inline {
      display: inline-block;
    }
    footer {
      padding-top: $baseGap;
    }
    .form-right-140 {
      width: 140px;
    }
    .table-width {
      .cell {
        padding: 0 10px;
      }
      .margin-40 .cell {
        margin-bottom: 30px;
      }
      .el-form-item {
        width: 100%;
        margin-right: 10px;
        margin-bottom: 30px;
      }
      .el-form-item__error {
        text-align: left;
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
      .el-form-item {
        width: 100%;
      }
    }
  }
</style>
