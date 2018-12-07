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

       <el-table-column prop="cate" :label="$t('merchant.table.merstatus')">
        <template slot-scope="scope">
          {{ isSigned[scope.row.status] }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('merchant.table.payment')" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.deploy == 1" type="text" @click.stop="paymentConfigure(scope.row.userid,scope.row.deploy)">{{ $t('merchant.payment.configured') }}</el-button>
          <el-button v-else type="text" @click.stop="paymentConfigure(scope.row.userid,scope.row.deploy)">{{ $t('merchant.payment.nonconfigured') }}</el-button>
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
        width="40%"
        left
        class="dialog merchant"
        @close="closeForm"
      >
      <el-radio class="radioType1" v-model="radio" label="1">{{radioType1}}</el-radio>
      <el-radio class="radioType2" v-model="radio" label="2">{{radioType2}}</el-radio>
      <el-form :model="payMentform_disposable" class="dialog_form" :rules="baseRules" ref="payMentform">
        <div v-for="item in ratioList" :key="item.type" class="ratioType">
            <h4>{{item.name}}</h4>
            <el-form-item class="form_item" prop="merchantID" :label="$t('merchant.payment.merchantID')">
                <el-input
                  v-model="payMentform_disposable.merchantID"
                >
                </el-input>
            </el-form-item>
            <el-form-item class="form_item" prop="merchChildID" :label="$t('merchant.payment.merchantID')">
                <el-input
                  v-model="payMentform_disposable.merchChildID"
                >
                </el-input>
            </el-form-item>
            <el-form-item class="form_item" prop="merchantPass" :label="$t('merchant.payment.merchantPass')"> 
                <el-input
                  v-model="payMentform_disposable.merchantPass"
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
          <el-button v-if="paymentEdit.dialogType" type="text">{{ $t('common.SAVE') }}</el-button>
          <el-button v-else type="text" @click="editStatus()">{{ $t('common.EDIT') }}</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="payMentform_two" class="dialog_form"> 
        <div v-for="item in ratioList" :key="item.type" class="ratioType">
            <h4>{{item.name}}</h4>
            <el-form-item class="form_item" prop="merchantID" :label="$t('merchant.payment.merchantID')">
                <el-select v-model="payMentform_two.merchantID">
                    <el-option v-for="item in merchantID_list" :key="item.val" :label="item.val" :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="form_item" prop="merchChildID" :label="$t('merchant.payment.merchantID')">
                <el-input
                  v-model="payMentform_two.merchChildID"
                >
                </el-input>
            </el-form-item>
            <el-form-item class="form_item" prop="merchantPass" :label="$t('merchant.payment.merchantPass')"> 
                <el-input
                  v-model="payMentform_two.merchantPass"
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
          <el-button v-if="paymentEdit.dialogType" type="text">{{ $t('common.SAVE') }}</el-button>
          <el-button v-else type="text" @click="editStatus()">{{ $t('common.EDIT') }}</el-button>
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
          {name: this.$t('merchant.detail.up'), val: 3},
          {name: this.$t('merchant.detail.down'), val: 4},
          {name: this.$t('merchant.detail.audit'), val: 0},
          {name: this.$t('merchant.detail.refuse'), val: -1},
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
        payMentform_disposable: {
            merchantID: '',
            merchChildID: '',
            merchantPass: ''
        },
        payMentform_two: [],
        PIDlist: [],
        paymentEdit: {
            dialogType: true
        },
        ratioList: [],
        ratios: [],
        radio: "1",
        radioType1: "一清",
        radioType2: "俩清",
        merchantID_list: [
          {val: '1232334'},
          {val: '2234434'},
          {val: '2324344'}
        ]
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
      this.fetchSelectData()
      this.fetchRadio()
    },
    methods: {
      fetchRadio() {
        let p = {
          format: 'cors',
        }
        // axios.get(`${config.host}/org/tools/get/ratio`, {
        axios.get(`/static/a.json`, {
          params: p
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.ratioList = data.data;
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
        groupid && axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
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
      fetchSelectData() {
        let p = {
            type: "weixin",
            format: 'cors'
        }
        axios.get(`${config.host}/org/tools/get/channelinfo`, { // 获取select选项中的字段
            params: p
        }).then((res) => {
          this.PIDlist = res.data.data
        })
      },
      paymentConfigure(userid, deploy) { // 支付配置状态查看或改变
          this.paymentEdit.type = deploy
          this.paymentEdit.userid = userid
          this.centerDialogVisible = true 
          // debugger;
          if(deploy === 0) { // 0表示未配置 edit控制select与input的可编辑状态，这里设置为可编辑，dialogType控制下方按钮的展示，这里设置为保存 
            this.paymentEdit.edit = false    
            this.paymentEdit.dialogType = true   
            // this.$refs['payMentform'].resetFields()
          }else {
            let p = {
                userid: userid,
                format: 'cors'
             }
            axios.get(`${config.host}/org/mchnt/channel/info`, {
              params: p
            }).then((res) => {
              let data = res.data.data[0]
              this.payMentform.termid = data.termid
              this.payMentform.mchntid = data.mchntid
              this.paymentEdit.id = data.id
              this.paymentEdit.edit = true
              this.paymentEdit.dialogType = false
            })
          }  
      },
      editStatus() { // 将对话框的状态改为可编辑
        this.paymentEdit.edit = false
        this.paymentEdit.dialogType = true
      },
      resetForm(payMentform) {
          this.centerDialogVisible = false
      },
      closeForm() {
          this.payMentform = {
              mchntid: '',
              termid: ''
          }
          this.$refs['payMentform'].resetFields()
      },
      changePayment(payMentform) { // 保存用户支付配置的信息
        this.$refs[payMentform].validate((valid) => {
            if(valid) {
                let url = this.paymentEdit.type == 0 ? ('/org/mchnt/channel/bind') : ('/org/mchnt/channel/edit')
                let params = {
                  userid: this.paymentEdit.userid,
                  mchntid: this.payMentform.mchntid,
                  termid: this.payMentform.termid,
                  format: 'cors'
                }
                if (this.paymentEdit.type == 1) {
                  params['id'] = this.paymentEdit.id
                }
                axios.post(`${config.host}${url}`, qs.stringify(params), {}).then((res) => {
                  this.resetForm('payMentform')
                  let data = res.data;
                  if (data.respcd === config.code.OK) {
                    this.fetchData();
                    let messageTip = this.paymentEdit.type == 0 ? this.$t('common.createSuccess') : this.$t('common.updateSuccess');
                    this.$message.success(messageTip);
                  } else {
                    this.$message.error(data.respmsg);
                  }
                })
            }
        })
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
        margin-left: 15px;
        .form_item {
          width: 200px;
          height: 40px;
          padding: 0;
          .el-input {
            width: 200px;
          }
        }
        .checkbox {
          margin-top: 20px;
        }
        .dialog_button {
          margin-left: 80%;
          margin-top: 30px;
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
