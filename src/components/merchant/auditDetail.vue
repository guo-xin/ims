<template>
  <div class="mchnt-detail">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('merchant.detail.basic.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('merchant.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.basic.subtitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la1')}}</span>
          <span class="basic-content">{{form.qdinfo.qd_name}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la2')}}</span>
          <span class="basic-content">{{form.qdinfo.slsm_name}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la3')}}</span>
          <span class="basic-content">{{form.userinfo.shopname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la24')}}</span>
          <span class="basic-content">{{cate[form.userinfo.cate]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la11')}}</span>
          <span class="basic-content">{{form.userinfo.contact_email}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la6')}}</span>
          <span class="basic-content">{{isSigned[form.userinfo.status]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la7')}}</span>
          <span class="basic-content">{{form.userinfo.contact}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.userinfo.telephone}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la9')}}</span>
          <span v-if="form.userinfo.eep" class="basic-content">{{$t('merchant.newMerchant.doctype.type2')}}</span>
          <span v-else-if="form.userinfo.passport" class="basic-content">{{$t('merchant.newMerchant.doctype.type1')}}</span>
          <span v-else-if="form.userinfo.idnumber" class="basic-content">{{$t('merchant.newMerchant.doctype.type3')}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la10')}}</span>
          <span class="basic-content">{{form.number}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la5')}}</span>
          <span class="basic-content">{{form.userinfo.mcc_str}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la12')}}</span>
          <span class="basic-content">{{form.userinfo.address}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la13')}}</span>
          <span class="basic-content">{{form.userinfo.br}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la14')}}</span>
          <span class="basic-content">{{form.userinfo.br_expire_time}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la15')}}</span>
          <span class="basic-content">{{form.userinfo.ci}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la16')}}</span>
          <span class="basic-content">{{form.userinfo.businessaddr}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la22')}}</span>
          <span class="basic-content">{{form.userinfo.website}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la23')}}</span>
          <span class="basic-content">{{form.userinfo.legalperson}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la4')}}</span>
          <span class="basic-content">{{merchantType[form.userinfo.user_type]}}</span>
        </el-col>
      </el-row>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.basic.paymenttitle')}}</div>
        <div class="divider"></div>
      </div>

      <!-- <div v-for="item in form.fee_ratios" :key="item.name">
        <h3>{{item.name}}</h3>
        <el-row v-for="fee in item.busicd" :key="fee.trade_type_name">
          <el-col :span="8">
            <span class="basic-label">{{fee.trade_type_name}}:</span>
            <span class="basic-content">{{fee.ratio}}</span>
          </el-col>
        </el-row>
      </div> -->
      <div v-for="item in form.fee_ratios" :key="item.pid_name">
        <h3>{{item.pid_name}}</h3>
        <el-row>
          <el-col :span="8">
            <span class="basic-label">{{$t('merchant.newMerchant.form.ratio')}}:</span>
            <span class="basic-content">{{item.ratio}}</span>
          </el-col>
          <el-col :span="8" v-show="item.line_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.accessType')}}:</span>
            <span class="basic-content">{{accessType[item.line_type]}}</span>
          </el-col>
          <el-col :span="8" v-show="item.finance_type !== ''">
            <span class="basic-label">{{$t('merchant.newMerchant.form.applicationType')}}:</span>
            <span class="basic-content">{{applicationType[item.finance_type]}}</span>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.rates.setitle')}}</div>
        <div class="divider"></div>
      </div>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la17')}}</span>
          <span class="basic-content">{{form.bankinfo.bankuser}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la18')}}</span>
          <span class="basic-content">{{form.bankinfo.headbankname}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la19')}}</span>
          <span class="basic-content">{{form.bankinfo.bankaccount}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la20')}}</span>
          <span class="basic-content">{{form.bankinfo.bankProvince}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('shop.detail.basic.la13')}}</span>
          <span class="basic-content">{{form.bankinfo.bankcode}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la21')}}</span>
          <span class="basic-content">{{form.userinfo.remit_amt}}</span>
        </el-col>
      </el-row>
    </section>

    <section v-if="pictures.length>0" class="rates">
      <div class="banner">
        <div class="title">{{$t('audit.detail.storeInfo.title')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="24">
           <span class="basic-content-p">
             <img :src="item.url" v-for="(item,url) in pictures" class="voucher_photo" :key="url"/>
          </span>
        </el-col>
      </el-row>
    </section>

    <section v-if="dossierPictures.length>0">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.document.doctitle1')}}</div>
        <div class="divider"></div>
        <el-row>
         <el-col :span="24">
           <span class="basic-content-p">
             <img :src="item.url" v-for="(item,url) in dossierPictures" class="voucher_photo" :key="url"/>
          </span>
         </el-col>
       </el-row>
      </div>
    </section>

    <section class="audit-log">
      <div class="banner">
        <div class="title">{{$t('audit.detail.title')}}</div>
        <div class="divider"></div>
      </div>
      <el-table :data="audit_logs" stripe>
        <el-table-column prop="create_user" :label="$t('audit.detail.table.creator')">
          <template slot-scope="scope">
            {{ scope.row.create_user }}
          </template>
        </el-table-column>

        <el-table-column prop="create_date" :label="$t('audit.detail.table.create_date')">
          <template slot-scope="scope">
            {{ scope.row.create_date }}
          </template>
        </el-table-column>

        <el-table-column prop="result"  :label="$t('audit.detail.table.result')">
          <template slot-scope="scope">
            {{ status[scope.row.result] }}
          </template>
        </el-table-column>

        <el-table-column prop="memo"  :label="$t('audit.detail.table.memo')">
          <template slot-scope="scope">
            {{ scope.row.memo }}
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="do-audit" v-loading="isLoading">
      <div class="banner">
        <div class="title">{{$t('audit.detail.doit')}}</div>
        <div class="divider"></div>
      </div>
      <el-row>
        <el-col :span="2">
          <span class="basic-label">{{$t('audit.detail.table.memo')}}</span>
        </el-col>
        <el-col :span="22">
          <el-form ref="memo" :model="memo" class="memo-form" :rules="auditRules">
            <el-form-item prop="memo" label="">
              <el-input v-model.trim="memo.memo"
                        type="textarea"
                        :rows="8"
                        resize="none"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-button type="primary" @click="confirm('pass')">{{$t('audit.detail.pass')}}</el-button>
        <el-button type="primary" @click="confirm('deny')">{{$t('audit.detail.re')}}</el-button>
        <!-- <el-button type="primary" @click="judgeHandler('pass', $event)" ref="passed" name="1">{{$t('audit.detail.pass')}}</el-button>
        <el-button type="primary" @click="judgeHandler('deny', $event)" ref="rejected" name="0">{{$t('audit.detail.re')}}</el-button> -->
      </el-row>
    </section>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  import { formatDate } from '../../common/js/util'
  const getParams = (key) => {
    // 获取参数
    let url = window.location.hash.split('?')[1] || '';
    // 正则筛选地址栏
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    // 匹配目标参数
    let result = url.match(reg)
    // 返回参数值
    return result ? decodeURIComponent(result[2]) : ''
  }
  export default {
    data() {
      return {
        isLoading: false,
        isEditable: false,
        temp: [],
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big')
        },
        banktype: {
          "1": this.$t('common.privata'),
          "2": this.$t('common.pub')
        },
        isSigned: {
          "3": this.$t('common.enable'),
          "4": this.$t('common.disable'),
          "-1": this.$t('common.audit'),
          "0": this.$t('common.refuse')
        },
        merchantType: {
          2: this.$t('merchant.newMerchant.form.personal'),
          3: this.$t('merchant.newMerchant.form.enterprise')
        },
        status: {
          '0': this.$t('audit.deny'),
          '1': this.$t('audit.succ'),
          '2': this.$t('audit.fail'),
          '-1': this.$t('audit.going'),
        },
        number: '',
        form: {
          userinfo: {
            userid: this.$route.query.userid || getParams('userid'),
            user_type: '',
            groupid: '',
            cate: '',
            address: '',
            provice: '',
            city: '',
            email: '',
            mobile: '',
            remit_amt: '',
            legalperson: '',
            shopname: '',
            name: '', // 公司名称
            audit_status: '',
            audit_status_str: '',
            jointime: '',
            mcc: '', // 店铺类型编码，仅可以填数字
            mcc_str: ''
          },
          fee_ratios: {
            tenpay_ratio: '',
            alipay_ratio: '',
          },
          qdinfo: {
            qd_name: '', // 所属代理商名称
            qd_uid: '', //  所属代理商ID
            slsm_name: '', // 业务员名称
            slsm_uid: '', //  业务员ID
            slsm_mobile: '' // 业务员手机号
          },
          bankinfo: {
            headbankname: '',
            bankuser: '',
            bankaccount: '',
            bankProvince: ''
          }
        },
        accessType: {
          'offline': this.$t('merchant.newMerchant.accessTypes.offline'),
          'online': this.$t('merchant.newMerchant.accessTypes.online')
        },
        applicationType: {
          'direct': this.$t('merchant.newMerchant.applicationTypes.direct'),
          'indirect': this.$t('merchant.newMerchant.applicationTypes.indirect')
        },
        pictures: [],
        dossierPictures: [],
        audit_logs: [],
        memo: {
          memo: ''
        },
        auditRules: {
        }
      }
    },
    created() {
      this.isEditable = this.$route.query.from === 'old'
      this.fetchDetailData()
      this.getAuditResult();
    },
    methods: {
      getAuditResult() {
        axios.get(`${config.host}/org/tools/audit_logs_list`, {
          params: {
            userid: this.form.userinfo.userid,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === '0000') {
              this.audit_logs = data.data;
            } else {
              this.$message.error(data.respmsg);
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      },
      picturesSelect(a, b) {
        for(let i of b) {
          if(i['name'] === "idcardfront" || i['name'] === 'licensephoto') {
            a.push(i)
          }
        }
      },
      dossierSelect(a, b) {
        for(let i of b) {
          if(i['name'] === "ciphoto" || i['name'] === 'bankcheckphoto') {
             a.push(i)
          }
        }
      },
      confirm(status) {
        if (status === 'deny') {
          this.auditRules['memo'] = [
            {required: true, message: this.$t('audit.detail.msg1')}
          ]
        } else {
          this.auditRules['memo'] = []
          this.$refs['memo'].clearValidate('memo')
        }
        this.$refs['memo'].validate((valid) => {
          if (valid) {
            this.$confirm(this.$t('common.sure'), this.$t('common.tip'), {
              confirmButtonText: this.$t('common.confirm'),
              cancelButtonText: this.$t('common.cancel'),
              type: 'warning'
            }).then(() => {
              this.judgeHandler(status)
            }).catch(() => {
            })
          }
        })
      },
      judgeHandler(status) {
        this.isLoading = true;
        let params = {
          userid: this.form.userinfo.userid,
          audit_status: status === 'pass' ? 1 : 0,
          memo: this.memo.memo,
          format: 'cors'
        };
        axios.post(`${config.host}/org/mchnt/audit`, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res) => {
          let data = res.data;
          this.isLoading = false;
          if (data.respcd === config.code.OK) {
            this.$message.success(this.$t('audit.detail.done'))
            this.$router.push({
              name: 'mchnt_audit_list'
            })
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      cancel() {
        this.$router.push({name: 'mchnt_audit_list'})
      },
      editHandler() {
        this.$router.push({name: 'mchntCreate', params: {command: 'edit', userid: this.form.userinfo.userid}})
      },
      fetchDetailData() {
        axios.get(`${config.host}/org/mchnt/info`, {
          params: {
            userid: this.form.userinfo.userid,
            type: 'bigmerchant',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === '0000') {
                this.form = data.data;
              this.picturesSelect(this.pictures, this.form.vouchers)
              this.dossierSelect(this.dossierPictures, this.form.vouchers)
              this.form.userinfo.ci_expire_time = formatDate(this.form.userinfo.ci_expire_time, 'dd/MM/yyyy')
              this.form.userinfo.br_expire_time = formatDate(this.form.userinfo.br_expire_time, 'dd/MM/yyyy')
              this.form.number = this.form.userinfo['idnumber'] || this.form.userinfo['passport'] || this.form.userinfo['eep']
            } else {
              this.$message.error(data.respmsg);
            }
          })
          .catch((e) => {
          this.isLoading = false;
          // console.log(e);
        });
      }
    }
  }
</script>
<style lang="scss">
  .mchnt-detail {
    background-color: #fff;
    padding: 0 $baseGap;
    padding-bottom: $baseGap;
    .voucher_photo {
      width: 300px;
      height: 200px;
      display: inline-block;
      margin-left: 10px;
      margin-top: 10px;
    }
    .noborder {border:none !important;}
    .do-audit {
      .memo-form {
        width:100%;
        .el-form-item {
          width:100%;
        }
      }
    }
    footer {
      padding-bottom: 30px;
    }
    .banner {
        padding: 28px $baseGap 0 0; margin-bottom: $miderGap;
        .title {
          font-size:$bigSize;
          font-weight:bold;
          color:#1D1D24;
        }
        .divider {
          width:50px;
          height:2px;
          margin-top:$miderGap;
          background-color:#232629;
        }
    }

    .basic,.shop,.rates,.payment {
      .el-row {
        padding: $smGap 0 0 0;
        .basic-label {
          font-size:$baseSize;
          font-weight:$bolderW;
          color:rgba(29,29,36,1);
          line-height:$baseSize;
        }
        .basic-content {
          margin-left: $smGap;
          font-size:$baseSize;
          font-weight:$baseW;
          color:#717283;
          line-height:$baseSize;
        }
      }
    }
    .payment {
      .voucher_photo {
        width:200px;
        height:150px;
        display:inline-block;
        margin-left:$smGap;
      }
    }
  }
</style>
