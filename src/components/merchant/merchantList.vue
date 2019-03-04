<template>
  <div class="merchant">
    <header class="page-header">
      <h2 class="page-title">{{$t('merchant.title')}}</h2>
      <div>
        <el-button size="large" type="primary" @click="createMerchant" v-if="authData.includes('mchnt_manage_create')">{{$t('merchant.create')}}</el-button>
        <el-button style="margin-left:6px;" size="large" type="primary" @click="patchImport" v-if="authData.includes('mchnt_manage_batch_create')">{{$t('merchant.patchImport')}}</el-button>
      </div>
    </header>
    <el-form class="search-form" :model="formData" ref="mchnt_list_form">
      <el-form-item :label="$t('merchant.form.mchtid')" prop="userid">
        <el-input v-model="formData.userid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.mchtname')" prop="shopname">
        <el-input v-model="formData.shopname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent1')" prop="qd_uid">
        <el-select v-model="formData.qd_uid" @change="selectChannelHandler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.agent2')" prop="qd_uid2">
        <el-select v-model="formData.qd_uid2" :placeholder="$t('merchant.form.ph')">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels2" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.form.audit_state')" prop="status">
        <el-select v-model="formData.status">
          <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="merchents" stripe v-loading="isLoading" @current-change="selectCurrentRowHandler">
      <el-table-column prop="userid" :label="$t('merchant.table.mchtid')">
        <template slot-scope="scope">
          {{ scope.row.userid }}
        </template>
      </el-table-column>

      <el-table-column prop="shopname" :label="$t('merchant.table.mchtname')">
        <template slot-scope="scope">
          {{ scope.row.shopname }}
        </template>
      </el-table-column>

      <el-table-column prop="address"  :label="$t('merchant.table.address')">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>

      <el-table-column prop="mobile"  :label="$t('merchant.table.mobile')">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>

      <el-table-column prop="qd_name"  :label="$t('merchant.table.agent1')">
        <template slot-scope="scope">
          {{ scope.row.qd_name }}
        </template>
      </el-table-column>

      <el-table-column prop="username" :label="$t('merchant.table.account')">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column prop="cate" :label="$t('merchant.table.industry')">
        <template slot-scope="scope">
          {{ scope.row.mcc_str }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.store')">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="shopList(scope.row.userid)">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="cate" :label="$t('merchant.table.detail')">
        <template slot-scope="scope">
          <el-button type="text">{{ $t('common.look') }}</el-button>
        </template>
      </el-table-column>

       <el-table-column prop="cate" :label="$t('merchant.table.merstatus')" width="140">
        <template slot-scope="scope">
          {{ isSigned[scope.row.status] }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.payment')" width="140">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status !== 3" v-if="scope.row.deploy == 1" type="text" @click.stop="paymentConfigure(scope.row.userid,scope.row.deploy)">{{ $t('merchant.payment.configured') }}</el-button>
          <el-button :disabled="scope.row.status !== 3" v-else type="text" @click.stop="paymentConfigure(scope.row.userid,scope.row.deploy)">{{ $t('merchant.payment.nonconfigured') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="merchents.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>

    <el-dialog
        :title="$t('merchant.table.payment')"
        :visible.sync="centerDialogVisible"
        :show-close="false"
        width="50%"
        left
        class="dialog merchant"
        @close="closeForm"
      >
      <el-radio class="radioType1" :disabled="paymentEdit.Isradio1" v-model="radio" label="1">{{$t('merchant.payment.radio1')}}</el-radio>
      <el-radio class="radioType2" :disabled="paymentEdit.Isradio2" v-model="radio" label="2">{{$t('merchant.payment.radio2')}}</el-radio>
      <el-form v-if="radio == 1" class="dialog_form" ref="payMentform">
        <div v-for="item in ratioListOne" :key="item.type" class="ratioType">
            <h4>{{ item.name }}</h4>
            <el-form-item class="form_item" prop="merchantID1" :label="$t('merchant.payment.merchantID1')">
                <el-input
                  v-model="item.buscid[0].mchntid"
                  :disabled="paymentEdit.IsPayment"
                >
                </el-input>
            </el-form-item>
            <el-form-item class="form_item" prop="merchChildID1" :label="$t('merchant.payment.merchChildID1')">
                <el-input
                  v-model="item.buscid[0].termid"
                  :disabled="paymentEdit.IsPayment"
                >
                </el-input>
            </el-form-item>
            <el-form-item class="form_item" prop="merchantPass1" :label="$t('merchant.payment.merchantPass1')">
                <el-input
                  v-model="item.buscid[0].key1"
                  :disabled="paymentEdit.IsPayment"
                >
                </el-input>
            </el-form-item>
            <el-checkbox-group class="checkbox" v-model="item.checkbox">
              <el-checkbox v-for="fee in item.busicd" :key="fee.trade_type_name" :label="fee.trade_type_name">{{fee.trade_type_name}}
              </el-checkbox>
            </el-checkbox-group>
        </div>
        <el-form-item class="dialog_button">
          <el-button type="text" @click="resetForm('payMentform')">{{ $t('common.CLOSE') }}</el-button>
          <el-button class="right" v-if="paymentEdit.dialogType" type="text" @click="changePayment()">{{ $t('common.SAVE') }}</el-button>
          <el-button class="right" v-else type="text" @click="editStatus()">{{ $t('common.EDIT') }}</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="radio == 2" class="dialog_form" ref="payMentform">
        <div v-for="item in ratioListTwo" :key="item.type" class="ratioType">
            <h4>{{ item.name }}</h4>
            <el-form-item class="form_item2" :label="$t('merchant.payment.merchantID2')">
                <el-select
                    v-model="item.buscid[0].mchntid"
                    :disabled="paymentEdit.IsTwoTimes">
                    <el-option v-for="buscid in item.buscid" :key="buscid.mchntid" :label="buscid.mchntid" :value="buscid.mchntid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="form_item2" :label="$t('merchant.payment.merchChildID2')">
                <el-input
                  v-model="item.buscid[0].termid"
                  :disabled="paymentEdit.IsTwoTimes"
                >
                </el-input>
            </el-form-item>
        </div>
        <el-form-item class="dialog_button">
          <el-button type="text" @click="resetForm('payMentform')">{{ $t('common.CLOSE') }}</el-button>
          <el-button class="right" v-if="paymentEdit.dialogType" type="text" @click="changePayment()">{{ $t('common.SAVE') }}</el-button>
          <el-button class="right" v-else type="text" @click="editStatus()">{{ $t('common.EDIT') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data() {
      return {
        isLoading: false,
        formData: {
          shopname: '',
          userid: '',
          qd_uid: '',
          qd_uid2: '',
          qd_name: '',
          qd_name2: '',
          status: ''
        },
        cate: {
          "merchant": this.$t('merchant.detail.cate.merchant'),
          "bigmerchant": this.$t('merchant.detail.cate.big'),
          "submerchant": this.$t('merchant.detail.cate.sub')
        },
        merchents: [],
        channels: [],
        channels2: [],
        statusList: [
          {name: this.$t('common.enable'), val: 3},
          {name: this.$t('common.disable'), val: 4},
          {name: this.$t('common.refuse'), val: 0},
          {name: this.$t('common.audit'), val: -1},
        ],
        isSigned: {
          "3": this.$t('common.enable'),
          "4": this.$t('common.disable'),
          "-1": this.$t('common.audit'),
          "0": this.$t('common.refuse')
        },
        total: 0,
        pageSize: 10,
        currentPage: 0,
        centerDialogVisible: false,
        paymentConfigures: [],
        baseRules: {
          'mchntid': [
            {required: true, message: this.$t('merchant.payment.rule1')}

          ],
          'termid': [
            {required: true, message: this.$t('merchant.payment.rule2')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(+val)) {
                  cb(new Error(this.$t('merchant.payment.rule3')));
                } else {
                  cb();
                }
              }
            }
          ]
        },
        paymentEdit: {
            dialogType: true,
            Isradio1: false, // 控制一清的按钮是否可编辑
            Isradio12: false, // 控制二清的按钮是否可编辑
            IsPayment: false, // 控制一清的输入框是否可编辑
            IsTwoTimes: false // 控制二清的select和input框是否可编辑
        },
        ratioListOne: [], // 控制一清的表单显示
        ratioListTwo: [], // 控制二清的表单显示
        ratios: [],
        radio: "2",
        radioType1: "一清",
        radioType2: "二清"
      }
    },
    computed: {
      authData() {
        return this.$store.state.permissionData
      }
    },
    created() {
      this.fetchData()
      this.getChannelList()
    },
    methods: {
      fetchRadio() {
        let p = {
          format: 'cors',
        }
        axios.get(`${config.host}/org/tools/get/hk/channelinfo`, {
        // axios.get(`/static/b.json`, {
          params: p
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.ratioListOne = this.changeJson(data.data.one)
              this.ratioListTwo = this.changeJson(data.data.two)
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      shopList(mchntId) {
        this.$router.push({
          path: 'shop_manage_list/',
          query: {userid: mchntId, from: 'old'}
        })
      },
      getAuditList() { // 审核列表数据
        axios.get(`${config.host}/org/tools/audit_status_map`, {
          params: {
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.statusList = data.data;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getChannelList() { // 获取1级渠道列表
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: '',
            status: 3,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
            this.channels = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannelHandler(groupid) { // 获取渠道列表数据
        this.formData.qd_uid2 = ''
        groupid && axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
            status: 3,
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.channels2 = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      fetchData(query) { // 获取商户列表数据
        if(query) {
          this.currentPage = 0
        }
        let p = {
          shopname: this.formData.shopname,
          userid: this.formData.userid,
          qd_uid: this.formData.qd_uid,
          status: this.formData.status,
          qd_name: '',
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          page_size: this.pageSize,
          format: 'cors'
        }
        if(this.formData.qd_uid2) {
          p.qd_uid = this.formData.qd_uid2
        }
        this.isLoading = true;
        axios.get(`${config.host}/org/mchnt/list`, {
          params: p})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
               this.merchents = data.data.mchnt_infos
               this.total = data.data.mchnt_cnt
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      reset() { // 表单重置
        this.$refs['mchnt_list_form'].resetFields();
        this.channels2 = [];
        this.fetchData('query');
      },
      createMerchant() { // 商户进件/新建商户
        this.$router.push({path: 'mchnt_manage_list/mchnt_create'})
      },
      patchImport() { // 批量进件
        this.$router.push({path: 'mchnt_manage_list/batch_import'})
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) { // 选择列表项，进入详情页
        this.$router.push({
          name: 'mchntDetail',
          query: {userid: currentRow.userid, from: 'old'}
        })
      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 0
        }
        this.fetchData()
      },
      paymentConfigure(userid, deploy) { // 支付配置状态查看或改变
          this.paymentEdit.type = deploy
          this.paymentEdit.userid = userid
          this.centerDialogVisible = true
          if(deploy === 0) { // 0表示未配置 edit控制select与input的可编辑状态，这里设置为可编辑，dialogType控制下方按钮的展示，这里设置为保存
            this.fetchRadio()
            this.paymentEdit.edit = false
            this.paymentEdit.dialogType = true
          }else {
            let p = {
                userid: userid,
                format: 'cors'
             }
            axios.get(`${config.host}/org/mchnt/hk/channel/info`, {
            // axios.get(`/static/a.json`, {
              params: p
            }).then((res) => {
              let data = res.data.data
              this.radio = data.type
              let deployDetails = []
              let keys = Object.keys(data.datas)
              let values = Object.values(data.datas)
              for(let i = 0 ;i < keys.length; i++){
                let item = {}
                item.name = keys[i]
                item.buscid = values[i]
                deployDetails.push(item)
              }
              if(data.type == 1) {
                this.paymentEdit.IsPayment = true
                this.paymentEdit.Isradio2 = true
                this.ratioListOne = deployDetails
              } else if(data.type == 2) {
                this.paymentEdit.Isradio1 = true
                this.paymentEdit.IsTwoTimes = true
                this.ratioListTwo = deployDetails
                this.revalue(this.ratioListTwo, deployDetails)
              }
              this.paymentEdit.edit = true
              this.paymentEdit.dialogType = false
            })
          }
      },
      editStatus() { // 将对话框的状态改为可编辑
        let that = this
        let p = {
          format: 'cors',
        }
        axios.get(`${config.host}/org/tools/get/hk/channelinfo`, {
        // axios.get(`/static/b.json`, {
          params: p
        }).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              if(that.radio === "1") {
                let List1 = that.changeJson(data.data.one)
                that.first(List1, that.ratioListOne)
                that.ratioListOne = List1
              }else if(that.radio === "2") {
                let List2 = that.changeJson(data.data.two)
                that.second(List2, that.ratioListTwo)
                that.ratioListTwo = List2
              }
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
        this.paymentEdit.edit = false
        this.paymentEdit.dialogType = true
        if(this.radio === "1") {
          this.paymentEdit.IsPayment = false
        }else {
          this.paymentEdit.IsTwoTimes = false
        }
      },
      resetForm(payMentform) {
          this.paymentEdit.Isradio1 = false
          this.paymentEdit.Isradio2 = false
          this.paymentEdit.IsPayment = false
          this.paymentEdit.IsTwoTimes = false
          this.centerDialogVisible = false
      },
      closeForm() {
          this.radio = "2"
          this.paymentEdit.Isradio1 = false
          this.paymentEdit.Isradio2 = false
          this.paymentEdit.IsTwoTimes = false
          // this.$refs['payMentform'].resetFields()
      },
      changePayment(payMentform) { // 保存用户支付配置的信息
        // debugger
        let url = this.paymentEdit.type == 0 ? ('/org/mchnt/hk/channel/bind') : ('/org/mchnt/hk/channel/edit')
        let channel_infos1 = []
        if(this.radio == 1) {
          channel_infos1 = this.channelsValue(1, this.ratioListOne)
        }else {
          channel_infos1 = this.channelsValue(2, this.ratioListTwo)
        }
        let params = {
          userid: this.paymentEdit.userid,
          type: this.radio,
          channel_infos: JSON.stringify(channel_infos1),
          format: 'cors'
        }
        axios.post(`${config.host}${url}`, qs.stringify(params), {}).then((res) => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.resetForm('payMentform')
            this.fetchData();
            let messageTip = this.paymentEdit.type == 0 ? this.$t('common.createSuccess') : this.$t('common.updateSuccess');
            this.$message.success(messageTip);
          } else {
            this.$message.error(data.respmsg);
          }
        })
      },
      changeJson(jsonA) { // 支付配置的接口数据返回比较难直接用，所以在此做了结构的修改
        let list = []
        jsonA.forEach(function(i){
            let item = {}
            item.buscid = Object.values(i)[0]
            item.name = Object.keys(i)[0]
            list.push(item)
        })
        return list
      },
      revalue(a, b) { // 为二清的支付配置赋值
          for(let i of a) {
            for(let j of b) {
              if(j['name'] === i['name']) {
                i['PID'] = j['buscid'][0].mchntid;
                i['mchid'] = j['buscid'][0].termid
              }
            }
          }
      },
      first(e, f) { // 每次点击编辑的时候重新请求了
        for(let i of e) {
          for(let j of f) {
            if(i['name'] === j['name']) {
              i['buscid'][0].mchntid = j['buscid'][0].mchntid
              i['buscid'][0].termid = j['buscid'][0].termid
              i['buscid'][0].key1 = j['buscid'][0].key1
              if(j['buscid'][0].id) {
                i['buscid'][0].id = j['buscid'][0].id
              }
            }
          }
        }
      },
      second(g, h) {
        for(let i of g) {
          for(let j of h) {
            if(i['name'] === j['name']) {
              i['buscid'][0].mchntid = j['buscid'][0].mchntid
              i['buscid'][0].termid = j['buscid'][0].termid
              if(j['buscid'][0].id) {
                i['buscid'][0].id = j['buscid'][0].id
              }
            }
          }
        }
      },
      channelsValue(key, c) { // 支付配置提交的通道配置信息结构需要进行处理
        let channelList = []
        // console.log(c)
        c.forEach(function(i) {
          if(key === 1) {
            // if(i.buscid[0].mchntid && i.buscid[0].key1 && i.buscid[0].termid) {
              let item = {}
              item.chnl_name = i.name
              item.chnl_id = i.buscid[0].chnlid
              item.key1 = i.buscid[0].key1
              item.mchntid = i.buscid[0].mchntid
              item.termid = i.buscid[0].termid
              item.id = i.buscid[0].id
              channelList.push(item)
            // }

          } else if(key === 2) {
            // if(i.buscid[0].mchntid && i.buscid[0].termid) {
              let item = {}
              item.chnl_name = i.name
              item.chnl_id = i.buscid[0].chnlid
              item.mchntid = i.buscid[0].mchntid
              item.termid = i.buscid[0].termid
              item.id = i.buscid[0].id
              channelList.push(item)
            // }
           }
        })
        // console.log(channelList)
        return channelList
      }
    }
  }
</script>
<style lang="scss">
  .table-hover .el-table__row {
    cursor: pointer;
  }
  .merchant.dialog {
      .el-dialog__header {
        border-bottom: 1px #2974FF solid;
      }
      box-shadow: 2px 2px 4px 0px rgba(29,29,36,0.1);
      border-radius: 2px;
      font-size: 24px;
      .ratioType {
        margin-top: 30px;
      }
      .el-radio {
        margin-left: 50px;
      }
      .radioType1 {
        margin-left: 20px;
      }
      .dialog_form {
        margin-left: 1%;
        .form_item {
          width: 29%;
          height: 11%;
          padding: 0;
          margin-right: 4%;
          .el-input {
            width: 100%;
          }
        }
        .form_item2 {
          width: 40%;
          height: 11%;
          padding: 0;
          margin-right: 4%;
          .el-input {
            width: 100%;
          }
        }
        .checkbox {
          margin-top: 20px;
        }
        .dialog_button {
          margin-left: 30%;
          margin-top: 2%;
          .right {
            margin-left: 30%;
          }
        }
      }
      h4 {
        position: relative;
        padding: 10px 0;
        margin: 0 0 20px;
        font-size: 20px;
        color: $titleColor;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50px;
          height: 2px;
          background-color: #232629;
        }
      }
  }
</style>
