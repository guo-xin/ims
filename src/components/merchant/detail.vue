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
          <span class="basic-label">{{$t('merchant.detail.basic.la4')}}</span>
          <span class="basic-content">{{cate[form.userinfo.cate]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la5')}}</span>
          <span class="basic-content">{{form.userinfo.mcc_str}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la6')}}</span>
          <span class="basic-content">{{isSigned[form.userinfo.status]}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la7')}}</span>
          <span class="basic-content">{{form.userinfo.legalperson}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la8')}}</span>
          <span class="basic-content">{{form.userinfo.telephone}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la9')}}</span>
          <span v-if="form.userinfo.eep" class="basic-content">{{$t('merchant.newMerchant.doctype.type1')}}</span>
          <span v-else-if="form.userinfo.passport" class="basic-content">{{$t('merchant.newMerchant.doctype.type2')}}</span>
          <span v-else-if="form.userinfo.idnumber" class="basic-content">{{$t('merchant.newMerchant.doctype.type3')}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la10')}}</span>
          <span class="basic-content">{{form.number}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <span class="basic-label">{{$t('merchant.detail.basic.la11')}}</span>
          <span class="basic-content">{{form.userinfo.email}}</span>
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
          <span class="basic-content">{{form.userinfo.ci_expire_time}}</span>
        </el-col>
      </el-row>
    </section>

    <section class="rates">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.basic.paymenttitle')}}</div>
        <div class="divider"></div>
      </div>

      <div v-for="item in form.fee_ratios" :key="item.name">
        <h3>{{item.name}}</h3>
        <el-row v-for="fee in item.busicd" :key="fee.trade_type_name">
          <el-col :span="8">
            <span class="basic-label">{{fee.trade_type_name}}:</span>
            <span class="basic-content">{{fee.ratio}}</span>
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
          <span class="basic-content">{{form.bankinfo.headbankname}}</span>
        </el-col>
        <el-col :span="14">
          <span class="basic-label">{{$t('merchant.detail.basic.la18')}}</span>
          <span class="basic-content">{{form.bankinfo.bankuser}}</span>
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
          <span class="basic-label">{{$t('merchant.detail.basic.la21')}}</span>
          <span class="basic-content">{{form.userinfo.remit_amt}}</span>
        </el-col>
      </el-row>
    </section>

    <section v-if="pictures.length>0">
      <div class="banner">
        <div class="title">{{$t('merchant.detail.document.doctitle')}}</div>
        <div class="divider"></div>
        <el-row>
         <el-col :span="24">
           <span class="basic-content-p">
             <img :src="item.url" v-for="(item,url) in pictures" class="voucher_photo" :key="url"/>
          </span>
         </el-col>
       </el-row>
      </div>
    </section>

    <section class="audit-log" v-if="form.userinfo.status==0">
      <div class="banner">
        <div class="title">{{$t('audit.detail.title')}}</div>
        <div class="divider"></div>
      </div>
      <el-table :data="audit_logs" stripe v-loading="isLoading">
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
            {{ auditresult[scope.row.result] }}
          </template>
        </el-table-column>

        <el-table-column prop="memo"  :label="$t('audit.detail.table.memo')">
          <template slot-scope="scope">
            {{ scope.row.memo }}
          </template>
        </el-table-column>
      </el-table>
    </section>
    <footer>
      <el-button v-if="isEditable&&!isReEditable" @click="editHandler">{{$t('merchant.detail.edit')}}</el-button>
      <el-button v-if="isCreateShop&&!isReEditable" @click="createShop">{{$t('merchant.detail.createShop')}}</el-button>
    </footer>
    <footer v-if="isReEditable">
      <el-button @click="editHandler">{{$t('merchant.detail.redit')}}</el-button>
      <el-button @click="cancel">{{$t('merchant.detail.basic.close')}}</el-button>
    </footer>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
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
        isReEditable: false,
        isCreateShop: false,
        license: '',
        temp: [],
        audit_logs: [],
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
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
        statusList: [
          {name: this.$t('common.enable'), val: 3},
          {name: this.$t('common.disable'), val: 4},
          {name: this.$t('common.refuse'), val: 0},
          {name: this.$t('common.audit'), val: -1},
        ],
        period: {
          month: this.$t('merchant.detail.p.m'),
          week: this.$t('merchant.detail.p.w'),
          date: this.$t('merchant.detail.p.d'),
        },
        status: {
            0: this.$t('merchant.detail.up'),
            1: this.$t('merchant.detail.down')
         },
        auditresult: {
          '0': this.$t('audit.deny'),
          '1': this.$t('audit.succ'),
          '2': this.$t('audit.fail'),
          '-1': this.$t('audit.going'),
        },
        form: {
          number: '',
          userinfo: {
            userid: this.$route.query.userid || getParams('userid'), // 商户ID
            user_type: '',
            groupid: '',
            cate: '',
            address: '', // 公司地址
            provice: '',
            city: '',
            email: '',
            mobile: '',
            remit_amt: '',
            legalperson: '', // 公司联系人
            shopname: '', // 商户名称
            name: '', // 公司名称
            audit_status_str: '',
            jointime: '',
            mcc: '', // 店铺类型编码，仅可以填数字
            mcc_str: '' // 商户类型名称
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
        pictures: []
      }
    },
    created() {
      this.isEditable = this.$route.query.from === 'old'
      this.isReEditable = this.$route.query.from === 'edit'
      this.fetchDetailData()
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
            console.log(e);
          });
      },
      cancel() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      editHandler() {
        this.$router.push({name: 'mchntCreate', query: {command: 'edit', userid: this.form.userinfo.userid}})
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
            if (data.respcd === config.code.OK) {
                this.form = data.data
                this.picturesSelect(this.pictures, this.form.vouchers)
                this.form.userinfo.ci_expire_time = formatDate(this.form.userinfo.ci_expire_time, 'dd/MM/yyyy')
                this.form.userinfo.br_expire_time = formatDate(this.form.userinfo.br_expire_time, 'dd/MM/yyyy')
                this.form.number = this.form.userinfo['idnumber'] || this.form.userinfo['passport'] || this.form.userinfo['eep']
                this.isCreateShop = this.form.userinfo.cate === 'bigmerchant' ? 1 : 0
                this.isEditable = this.form.userinfo.status !== -1 ? 1 : 0
              if(data.data.userinfo.status == 0) {
                this.getAuditResult()
              }
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      createShop() {
        this.$router.push({name: 'createStore', query: {big_uid: this.form.userinfo.userid}})
      },
      picturesSelect(a, b) {
        for(let i of b) {
          if(i['name'] === "idcardfront" || i['name'] === 'licensephoto') {
             a.push(i)
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .mchnt-detail {
    background-color: #fff;
    padding: 0 $baseGap $baseGap $baseGap;
    .noborder {border:none !important;}
    footer {
      padding-top: $baseGap;
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
    .voucher_photo {
      width:300px;
      height:200px;
      display:inline-block;
      margin-left:$smGap;
      margin-top:$smGap;
    }
  }
</style>
