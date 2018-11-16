<template>
  <div class="new-mchnt">
    <header class="page-header style2">
      <h2 class="page-title">
        {{this.isUpdate ? $t('merchant.newMerchant.title2') : $t('merchant.newMerchant.title1')}}</h2>
      <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span>
      </el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step :title="$t('merchant.newMerchant.step1')"></el-step>
      <el-step :title="$t('merchant.newMerchant.step3')"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseinfo" :model="form" :rules="baseRules">
      <h3>{{$t('merchant.newMerchant.basic.cap1')}}</h3>

      <el-form-item :label="$t('merchant.form.agent1')" prop="primary_uid" v-if="!isUpdate">
        <el-select v-model="form.primary_uid" @change="selectChannelHandler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels1" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('merchant.form.agent2')" prop="secondary_uid" v-if="!isUpdate">
        <el-select v-model="form.secondary_uid" :placeholder="$t('merchant.form.ph')" @change="selectChannel2Handler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels2" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.contact')" prop="sls_uid" v-if="!isUpdate">
        <el-select v-model="form.sls_uid" ref="sls">
         <el-option :label="item.name" :value="item.userid" v-for="item in salesperson" :key="item.userid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.contact')" prop="sls_uid" v-if="isUpdate">

        <el-input id="op_type" v-model="form.sls_name"
                  :placeholder="$t('merchant.newMerchant.rule43')"
                  readonly
                  class="sub-account-item-info"><template slot="append"><i class="el-icon-arrow-down tree-indic" @click.stop="showTreeComponent"></i></template>
        </el-input>
        <el-tree id="op-type-tree" :data="salesperson" :props="defaultProps" @node-click="handleNodeClick"
                 v-show="isShowTree"
                 style="position:absolute;top:38px;z-index:9;width:299px;overflow-y:auto;height:320px;"></el-tree>
      </el-form-item>

      <el-form-item prop="shopname" :label="$t('merchant.newMerchant.form.shopname')">
        <el-input v-model.trim="form.shopname"></el-input>
      </el-form-item>

      <el-form-item prop="cate" :label="$t('merchant.newMerchant.form.cate')">
        <el-select v-model="form.cate" ref="cate" :disabled="isUpdate">
          <el-option :label="$t('merchant.newMerchant.form.sub')" value="merchant"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.big')" value="bigmerchant"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="mcc" :label="$t('merchant.newMerchant.form.type1')">
        <el-select v-model="form.mcc" ref="mcc">
          <el-option :label="item.name" :value="item.id" v-for="item in shopTypes" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="status" :label="$t('merchant.newMerchant.form.type2')" v-if="isUpdate">
        <el-select v-model="form.status">
          <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>

      <h3 style="padding:0;margin:0;font-size:0;color:transparent;" class="no-divider">&nbsp;</h3>
      <el-form-item :label="$t('merchant.newMerchant.form.bd')" prop="memo" class="memo">
        <el-input type="textarea" v-model="form.memo" :rows="3" resize="none"></el-input>
      </el-form-item>

      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <el-form-item prop="is_contract" :label="$t('merchant.newMerchant.form.is_contract')">
        <el-select v-model="form.is_contract" :placeholder="$t('merchant.newMerchant.form.cf')">
          <el-option :label="item.name" :value="item.value" v-for="item in signedList" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="settlement_time" :label="$t('merchant.newMerchant.form.period')">
        <el-select v-model="form.settlement_time">
          <el-option :label="item.name" :value="item.value" v-for="item in settlements" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="tenpay_ratio" :label="$t('merchant.newMerchant.form.ratio')+'(%)'">
        <el-input-number v-model.trim="form.tenpay_ratio" :precision="2" :step="0.01" :min="0"
                         :max="5"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- step2 -->
    <el-form v-show="active === 1" ref="bankinfos" :model="form" :rules="bankRules">
      <h3>{{$t('merchant.newMerchant.step3')}}</h3>
      <el-form-item prop="name" :label="$t('merchant.newMerchant.form.name')">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>

      <el-form-item prop="licensenumber" :label="$t('merchant.newMerchant.form.licensenumber')">
        <el-input v-model.trim="form.licensenumber"></el-input>
      </el-form-item>

      <el-form-item prop="location" :label="$t('merchant.newMerchant.form.location')">
        <el-select v-model="form.location">
          <el-option :label="$t('merchant.newMerchant.form.loc1')" value="SG"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.loc2')" value="MY"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="address" :label="$t('merchant.newMerchant.form.address')">
        <el-input v-model.trim="form.address"></el-input>
      </el-form-item>
      <el-form-item prop="legalperson" :label="$t('merchant.newMerchant.form.legal')">
        <el-input v-model.trim="form.legalperson"></el-input>
      </el-form-item>

      <el-form-item prop="telephone" :label="$t('merchant.newMerchant.form.cell')">
        <el-input v-model.trim="form.telephone"></el-input>
      </el-form-item>

      <el-form-item prop="post" :label="$t('merchant.newMerchant.form.post')">
        <el-input v-model.trim="form.post"></el-input>
      </el-form-item>

      <el-form-item prop="email" :label="$t('merchant.newMerchant.form.email')">
        <el-input v-model.trim="form.email" :disabled="isUpdate"></el-input>
      </el-form-item>

      <el-form-item prop="bankuser" :label="$t('merchant.newMerchant.form.bankuser')">
        <el-input v-model="form.bankuser"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" :label="$t('merchant.newMerchant.form.bankaccount')">
        <el-input v-model.trim="form.bankaccount"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" :label="$t('merchant.newMerchant.form.hbank')">
        <el-input v-model.trim="form.headbankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankname" :label="$t('merchant.newMerchant.form.bbank')">
        <el-input v-model.trim="form.bankname"></el-input>
      </el-form-item>

      <el-form-item prop="bankcode" :label="$t('merchant.newMerchant.form.code')">
        <el-input v-model.trim="form.bankcode"></el-input>
      </el-form-item>
      <section v-if="!isUpdate">
        <h3>{{$t('merchant.newMerchant.form.doc')}}</h3>
        <el-form-item prop="storename" :label="$t('merchant.newMerchant.form.storename')">
          <el-input v-model.trim="form.storename"></el-input>
        </el-form-item>

        <el-form-item prop="storetelephone" :label="$t('merchant.newMerchant.form.storephone')">
          <el-input v-model.trim="form.storetelephone"></el-input>
        </el-form-item>

        <el-form-item prop="storelocation" :label="$t('merchant.newMerchant.form.storelocation')">
          <el-select v-model="form.storelocation">
            <el-option :label="$t('merchant.newMerchant.form.loc1')" value="SG"></el-option>
            <el-option :label="$t('merchant.newMerchant.form.loc2')" value="MY"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="storeaddress" :label="$t('merchant.newMerchant.form.storeaddress')">
          <el-input v-model.trim="form.storeaddress"></el-input>
        </el-form-item>

        <el-form-item prop="storepost" :label="$t('merchant.newMerchant.form.storepost')">
          <el-input v-model.trim="form.storepost"></el-input>
        </el-form-item>

        <el-form-item prop="storeadditional" :label="$t('merchant.newMerchant.form.addition')">
          <el-input v-model.trim="form.storeadditional"></el-input>
        </el-form-item>

        <el-form-item prop="storeoperating" :label="$t('merchant.newMerchant.form.storeoperating')">
          <el-input v-model.trim="form.storeoperating"
                    :placeholder="$t('merchant.newMerchant.form.timeformat')"></el-input>
        </el-form-item>

        <el-form-item prop="website" :label="$t('merchant.newMerchant.form.website')">
          <el-input v-model.trim="form.website"></el-input>
        </el-form-item>
      </section>

      <el-row v-if="!isUpdate">
        <el-col :span="24">
          <div class="uploader-wrap">
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="form.vouchers"
                v-loading="goodsphotoloading"
                :on-progress="startAvatarUpload"
                class="avatar-uploader"
                :action="uploadInterface"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="avatarSuccess"
                :on-error="avatarFailed"
                :data="{
                    category: 1,
                    source: 1,
                    tag: 'goodsphoto',
                    enuserid: 'EPeRaNEt',
                    format: 'cors'
                }">
                <div v-if="voucherInfo.goodsphoto_url" class="avatar-wrap">
                  <img :src="voucherInfo.goodsphoto_url" class="avatar">
                  <span class="img-tip">{{$t('common.reupload')}}</span>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.idfront')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmfront')}}</div>
            </el-col>
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="form.vouchers"
                v-loading="shopphotoloading"
                :on-progress="startAvatarUpload"
                class="avatar-uploader"
                :action="uploadInterface"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="avatarSuccess"
                :on-error="avatarFailed"
                :data="{
                    category: 1,
                    source: 1,
                    tag: 'shopphoto',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                <div v-if="voucherInfo.shopphoto_url" class="avatar-wrap">
                  <img :src="voucherInfo.shopphoto_url" class="avatar">
                  <i class="img-tip">{{$t('common.reupload')}}</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.idback')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmback')}}</div>
            </el-col>

          </div>
        </el-col>
      </el-row>
    </el-form>

    <footer v-if="isUpdate">
      <el-button v-show="active === 0" type="primary" @click="next">{{$t('common.next')}}</el-button>
      <el-button v-show="active === 1" @click="pre">{{$t('common.prev')}}</el-button>
      <el-button v-show="active === 1" @click="next">{{$t('common.done')}}</el-button>
    </footer>
    <footer v-else>
      <el-button type="primary" @click="next">
        {{active === 1 ? $t('common.done') : $t('common.next')}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">{{$t('common.prev')}}</el-button>
    </footer>
  </div>
</template>
<script>
  /* eslint-disable */
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  import ElFormItem from "../../../node_modules/qfpay-element-ui/packages/form/src/form-item.vue";
  import _ from 'lodash'
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
    components: {ElFormItem},
    data() {
      return {
        isLoading: false,
        goodsphotoloading: false,
        shopphotoloading: false,
        isUpdate: false,
        active: 0, // 当前步骤,
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        qd_uid: '', // 所有代理商id
        isShowTree: false,
        forFlag: false,
        form: {
          status: '',
          primary_uid: '', // 一级代理商id
          secondary_uid: '', // 二级代理商id
          sls_uid: '', // 业务员id
          sls_name: '', // 业务员姓名
          shopname: '', // 商户名称
          mcc: '', // 一级商家类型，仅可以填数字
          memo: '', // 简介
          is_contract: '', // 是否签署合同
          settlement_time: '', // 按月、周、或日结算日期
          tenpay_ratio: '', // 服务费率
          standard_ratio: 0, // 基准费率
          name: '', // 公司名称
          licensenumber: '', // 公司注册号码（UEN）
          location: '', // 公司地区
          address: '', // 公司地址
          legalperson: '', // 公司联系人
          telephone: '', // 公司联系人电话
          cate: '',
          email: '',
          headbankname: '', // 总行
          bankname: '', // 支行
          bankuser: '', // 银行用户
          bankcode: '', // 联行号
          storename: '', // 店铺名称
          storetelephone: '', // 店铺联系电话
          storelocation: '', // 店铺位置
          storeaddress: '', // 店铺地址
          storepost: '', // 店铺邮编
          storeadditional: '', // 店铺附加服务
          storeoperating: '', // 店铺营业时间
          website: '', // 店铺网址
          vouchers: [], // 上传的凭据照片
        },
        shopTypes: [], // 一级渠道的店铺类型列表
//        shopTypes2: [], // 二级渠道的店铺类型列表
        channels1: [],
        channels2: [],
        salesperson: [],
        defaultProps: {
          children: 'slsm',
          label: 'name',
          value: 'uid'
        },
        signedList: [
          {value: 1, name: this.$t('merchant.detail.signed.yes')},
          {value: 0, name: this.$t('merchant.detail.signed.no')}
        ],
        settlements: [
          {value: 'month', name: this.$t('merchant.detail.p.m')},
          {value: 'week', name: this.$t('merchant.detail.p.w')},
          {value: 'date', name: this.$t('merchant.detail.p.d')},
        ],
        statusList: [
          {name: this.$t('merchant.detail.up'), val: 0},
          {name: this.$t('merchant.detail.down'), val: 1}
        ],
        voucherInfo: {
          goodsphoto_url: '', // 经营场所内景照片url
          goodsphoto_name: '',
          shopphoto_url: '',
          shopphoto_name: ''
        },
        baseRules: {
          'mcc': [
            {required: true, message: this.$t('merchant.newMerchant.rule38')}
          ],
          'is_contract': [
            {required: true, message: this.$t('merchant.newMerchant.rule39')}
          ],
          'settlement_time': [
            {required: true, message: this.$t('merchant.newMerchant.rule40')}
          ],
          'memo': [
            {required: true, message: this.$t('merchant.newMerchant.rule34')}
          ],
          'cate': [
            {required: true, message: this.$t('merchant.newMerchant.rule1')}
          ],
          'sls_uid': [
            {required: true, message: this.$t('merchant.newMerchant.rule11')}
          ],
          'shopname': [
            {required: true, message: this.$t('merchant.newMerchant.rule2')},
            {max: 60, min: 0, message: this.$t('merchant.newMerchant.rule10'), trigger: 'blur'}
          ],
          'tenpay_ratio': [
            {
              validator: (rule, val, cb) => {
                if (+val <= this.form.standard_ratio) {
                  cb(new Error(this.$t('merchant.newMerchant.rule13') + this.form.standard_ratio));
                } else {
                  cb();
                }
              }
            }
          ]
        },
        bankRules: {
          'email': [
            {required: true, message: this.$t('merchant.newMerchant.rule30'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.rule4')));
                } else {
                  cb();
                }
              }
            }
          ],
          'telephone': [
            {required: true, message: this.$t('merchant.newMerchant.rule35'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.rule6')));
                } else {
                  cb();
                }
              }
            }
          ],
          'post': [
            {required: true, message: this.$t('merchant.newMerchant.rule36'), trigger: 'blur'}
          ],
          'name': [
            {required: true, message: this.$t('merchant.newMerchant.rule3')}
          ],
          'licensenumber': [
            {required: true, message: this.$t('merchant.newMerchant.rule14')}
          ],
          'location': [
            {required: true, message: this.$t('merchant.newMerchant.rule15')}
          ],
          'address': [
            {required: true, message: this.$t('merchant.newMerchant.rule16')}
          ],
          'legalperson': [
            {required: true, message: this.$t('merchant.newMerchant.rule17')}
          ],
          'headbankname': [
            {required: true, message: this.$t('merchant.newMerchant.rule18')}
          ],
          'bankname': [
            {required: true, message: this.$t('merchant.newMerchant.rule37')}
          ],
          'bankcode': [
            {required: true, message: this.$t('merchant.newMerchant.rule19')}
          ],
          'bankuser': [
            {required: true, message: this.$t('merchant.newMerchant.rule20')}
          ],
          'storename': [
            {required: true, message: this.$t('merchant.newMerchant.rule21')}
          ],
          'storelocation': [
            {required: true, message: this.$t('merchant.newMerchant.rule23')}
          ],
          'storeaddress': [
            {required: true, message: this.$t('merchant.newMerchant.rule24')}
          ],
          'storepost': [
            {required: true, message: this.$t('merchant.newMerchant.rule25')}
          ],
          'storeadditional': [
            {required: true, message: this.$t('merchant.newMerchant.rule26')}
          ],
          'storeoperating': [
            {required: true, message: this.$t('merchant.newMerchant.rule27')}
          ],
          'storetelephone': [
            {required: true, message: this.$t('merchant.newMerchant.rule22'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.rule6')));
                } else {
                  cb();
                }
              }
            }
          ],
          'bankaccount': [
            {required: true, message: this.$t('merchant.newMerchant.rule32'), trigger: 'blur'},
          ],
          'bankmobile': [
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.rule6')));
                } else {
                  cb();
                }
              },
              trigger: 'blur'
            }
          ],
          'website': [
            {required: true, message: this.$t('merchant.newMerchant.rule41'), trigger: 'blur'}
          ]
        }
      }
    },

    created() {
      if (this.$route.query) {
        this.isUpdate = this.$route.query.command === 'edit' || getParams('command') === 'edit'
        !this.isUpdate && this.getChannelList()
        !this.isUpdate && this.getSalesPersonList();
        this.getFee()
        !this.isUpdate && this.getShopTypes()
        this.isUpdate && this.getAllSalesperson();
      }
    },
    mounted() {
      var _self = this;
      document.addEventListener('click', (evt) => {
        if ('el-tree-node'.indexOf(evt.target.className) == -1) {
          if (_self.isShowTree) this.isShowTree = false;
        }
        if (evt.target.parentNode && evt.target.parentNode.id === 'op_type' && evt.target.className.indexOf('el-input__icon el-icon-caret-bottom') === -1) {
          evt.preventDefault();
          _self.showTreeComponent(evt);
        }
      }, false);
    },
    methods: {
      handleNodeClick(node) {
        console.log(node);
        if(+node.isLeaf && Object.prototype.toString.call(node.slsm) === "[object Undefined]") {
          console.log('f')
           this.form.sls_uid = node.uid;
           this.form.sls_name = node.name;
           this.isShowTree = false;
        }
      },
      showTreeComponent(e) {
        this.isShowTree = true;
      },
      getAllSalesperson() {
        axios.get(`${config.host}/org/tools/org/slsms`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
               this.salesperson = data.data;
               this.getShopTypes()
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      checkPhotosIsUpdated() {
        if (!this.voucherInfo.goodsphoto_url && !this.isUpdate) { // && this.form.vouchers.includes('goodsphoto')
          this.$message.error(this.$t('merchant.newMerchant.rule28'));
          return false;
        }
        if (!this.voucherInfo.shopphoto_url && !this.isUpdate) { // && this.form.vouchers.includes('shopphoto')
          this.$message.error(this.$t('merchant.newMerchant.rule29'));
          return false;
        }
        return true
      },
      getFee(agentUid) {
        let p = {
          format: 'cors',
        }
        if (agentUid) {
          p.agent_uid = agentUid
        }
        axios.get(`${config.host}/org/tools/get/fee`, {
          params: p
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.form.standard_ratio = data.data.qd_fee;
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
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.channels1 = data.data.list;
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannelHandler(groupid) { // 获取二级渠道列表数据
        axios.get(`${config.host}/org/tools/qudao/list`, {
          params: {
            groupid: groupid,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.channels2 = data.data.list;
//              this.secondary_uid = ''
              this.getFee(groupid)
              this.getSalesPersonList(groupid)
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannel2Handler(groupid) {
        this.getFee(groupid)
        this.getSalesPersonList(groupid)
      },
      getSalesPersonList(uid) {
        axios.get(`${config.host}/org/tools/slsm`, {
          params: {
            agent_uid: uid || this.qd_uid || '',
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.salesperson = data.data;
              this.form.sls_uid = ''
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      getShopTypes(mcc1) {
        axios.get(`${config.host}/org/tools/mcc/list`, {
          params: {
            mcc: mcc1 || '',
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              if (mcc1) {
                this.shopTypes2 = data.data
              } else {
                this.shopTypes = data.data;
              }
              if (this.isUpdate) {
                this.getDetailInfo()
              }
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      startAvatarUpload(event, file, fileList) {
        this[file['__ob__'].dep.subs[0].vm.data.tag + 'loading'] = true;
      },
      beforeAvatarUpload(file) {
        const isRightImgType = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isRightImgType) {
          this.$message.error(this.$t('merchant.newMerchant.rule8'));
        }
        return isRightImgType;
      },
      avatarSuccess(res, file, fileList) {
        let data = res.data;
        if (res.respcd === config.code.OK) {
          this.voucherInfo[data.tag + '_url'] = data.url;
          this.voucherInfo[data.tag + '_name'] = data.name;
          let _target = _.find(this.form.vouchers, _.matchesProperty('name', file.response.data.tag))
          if (_target) {
            let idx = _.findIndex(this.form.vouchers, function (_target) {
              return _target.name == file.response.data.tag;
            });
            this.form.vouchers[idx].name = file.response.data.tag;
            this.form.vouchers[idx].imgname = file.response.data.name;
            this.form.vouchers[idx].url = file.response.data.url;
          } else {
            this.form.vouchers.push({
              name: file.response.data.tag,
              imgname: file.response.data.name,
              url: file.response.data.url,
            });
          }
        } else {
          this.$message.error(res.resperr);
        }
        this[file['__ob__'].dep.subs[0].vm.data.tag + 'loading'] = false;
      },
      imgUpload(name, flag) {
        if (flag || this.voucherInfo[name + '_url']) {
          axios.post(`${config.imgUpload}/util/v1/cpfile`, qs.stringify({
            enuserid: this.form.userid,
            imgurl: this.voucherInfo[name + '_url'],
            format: 'cors'
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.voucherInfo[name + '_name'] = data.data.name;
              this.$message.success(this.$t('common.uploadSucc'));
            } else {
              this.voucherInfo[name + '_url'] = '';
              this.$message.error(this.$t('common.uploadFailed'))
            }
          }).catch(() => {
            console.log('请求失败');
            this.voucherInfo[name] = '';
          })
        }
      },
      avatarFailed(err, file) {
        this.$message.error(err);
      },
      getDetailInfo() {
        axios.get(`${config.host}/org/mchnt/info`, {
          params: {
            userid: this.$route.query.userid || getParams('userid'),
            type: 'bigmerchant',
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              let uinfo = data.data.userinfo;
              let fee = data.data.fee_ratios
              let qdinfo = data.data.qdinfo;
              let bankinfo = data.data.bankinfo;

              this.form.cate = uinfo.cate
              this.form.shopname = uinfo.shopname;
              this.form.memo = uinfo.memo;
              this.form.tenpay_ratio = fee.tenpay_ratio;
              this.qd_uid = qdinfo.qd_uid;
              this.form.sls_uid = qdinfo.sls_uid;
              this.form.mcc = +uinfo.mcc;
              this.form.memo = uinfo.memo;
              this.form.is_contract = uinfo.is_contract;
              this.form.settlement_time = uinfo.settlement_time;
              this.form.name = uinfo.name;
              this.form.licensenumber = uinfo.licensenumber;
              this.form.location = uinfo.location_code;
              this.form.address = uinfo.address;
              this.form.legalperson = uinfo.legalperson;
              this.form.telephone = uinfo.telephone;
              this.form.post = uinfo.post;
              this.form.email = uinfo.email;
              this.form.headbankname = bankinfo.headbankname;
              this.form.bankcode = bankinfo.bankcode;
              this.form.bankuser = bankinfo.bankuser;
              this.form.bankaccount = bankinfo.bankaccount;
              this.form.bankname = bankinfo.bankname;
              this.form.status = +uinfo.status;
              this.getSalesPersonName(this.salesperson); // 匹配树形结构的销售员name
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      getSalesPersonName(list) {
        for(let l of list) {
          if(l.slsm && l.slsm.length > 0) {
            this.getSalesPersonName(l.slsm);
          }else {
            if(l.uid === this.form.sls_uid) {
              this.form.sls_name = l.name;
              this.forFlag = true;
              return;
            }
          }
          if(this.forFlag) {
            return;
          }
        }
      },
      create() {
        let params = Object.assign({}, this.form)
        let url = this.isUpdate ? `${config.host}/org/mchnt/edit` : `${config.host}/org/mchnt/signup`
        params.format = 'cors'
        params.tenpay_ratio = parseFloat(params.tenpay_ratio).toFixed(2)
        if (!this.isUpdate) {
          let converted = _.map(_.cloneDeep(this.form.vouchers), (item) => {
            return _.pick(item, ['name', 'imgname']);
          })
          params.vouchers = {}
          converted.forEach((item) => {
            let vals = _.values(item)
            params.vouchers[vals[0]] = vals[1]
          })
          params.vouchers.enuserid = 'EPeRaNEt';
          params.vouchers = JSON.stringify(params.vouchers)
        } else {
          params.type = 'bigmerchant';
          params.userid = this.$route.query.userid || getParams('userid')
          delete params.storename;
          delete params.storetelephone;
          delete params.storelocation;
          delete params.storeaddress;
          delete params.storepost;
          delete params.storeadditional;
          delete params.storeoperating;
          delete params.website;
          delete params.sls_name
          if (!params.primary_uid) {
            delete params.primary_uid
          }
          if (!params.secondary_uid) {
            delete params.secondary_uid
          }
        }

        axios.post(url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message.success(this.isUpdate ? this.$t('common.updateSuccess') : this.$t('common.createSuccess'))
              this.$router.push({
                name: 'mchntDetail',
                query: {userid: data.data.mchnt_userid, from: (this.isUpdate ? 'edit' : 'new')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      pre() {
        if (this.active-- <= 0) this.active = 0
      },
      next() {
        if (this.active === 0) { // 第一步
          this.$refs['baseinfo'].validate((valid) => {
            if (valid) {
              this.active += 1
              if (!this.isUpdate) {
                localStorage.setItem('new_baseinfo', JSON.stringify(this.form.userinfo))
              }
            }
          })
        } else if (this.active === 1) { // 第二步
          this.$refs['bankinfos'].validate((valid) => {
            if (valid && this.checkPhotosIsUpdated()) {
              this.create()
            }
          })
        }
      },
      cancelHandler() {
        this.$router.push({name: 'mchnt_manage_list'})
      }
    }
  }
</script>
<style lang="scss">
  .new-mchnt {
    background-color: #fff;
    padding: 0 30px;
    footer {
      padding-bottom: 30px;
    }
    .el-form .no-divider:after {
      background-color: transparent;
    }
    .el-form {
      background-color: #F7F9FA;
      margin-bottom: 24px;
      padding: 15px 30px 30px 30px;
      .el-loading-mask {
        width: 300px;
      }
      .sub-account-item-info {
        position: relative;
        #op_type {
          text-align: left;
        }
        .el-input-group__append {
          padding:0 !important;
          .tree-indic {
            width: 32px;
            height: 30px;
            line-height: 32px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
          }
        }
        .el-input__icon {
          position: absolute;
          width: 35px;
          height: 100%;
          right: 0;
          top: 0;
          text-align: center;
          color: #d9d0bf;
          transition: all .3s;
        }
      }

      h3 {
        position: relative;
        padding: 30px 0;
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
      .el-form-item {
        /*width: 300px;*/
        display: inline-block;
        vertical-align: top;
        margin-right: 80px;
        .el-form-item__content {
          width: 300px;
          .rate_label {
            font-size: 14px;
            color: #717283;
            padding: 0 $smGap;
          }
        }
      }
      .el-form-item.memo {
        width: 940px;
        .el-form-item__content {
          width: 100%;
        }
      }
      .uploader-wrap {
        padding-top: 20px;
      }
      .upload-label {
        color: grey;
        font-size: 14px;
        height: 204px;;
        width: 100%;
        display: flex;
        align-items: center;
      }
      .up-item {
        margin-right: 24px;
      }
      .image_info {
        font-size: 14px;
        color: #8a8c92;
        height: 16px;
        line-height: 16px;
        padding: 10px 0;
        text-align: center;
        width: 285px;
        .down-doc {
          color: #FE9B20;
          text-decoration: underline;
          text-decoration-color: #FE9B20;
          font-style: italic;
        }
      }
      .avatar-wrap {
        position: relative !important;
        .avatar {
          width: 285px;
          height: 214px;
          display: block;
        }
        .img-tip {
          width: 285px;
          height: 214px;
          line-height: 214px;
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.5);
          display: none;
          z-index: 9999;
          font-size: 16px;
        }
        &:hover .img-tip {
          display: block;
          /*animation: growUp .5s ease;*/
          -webkit-animation-name: growUp;
          -webkit-animation-duration: 500ms;
          -webkit-animation-iteration-count: 1;
          -webkit-animation-timing-function: ease-in-out;
        }
        @-webkit-keyframes growUp {
          0% {
            height: 0px;
          }
          100% {
            height: 100%;
          }
        }
      }
      .avatar-uploader-wrap {
        width: 298px;
        height: 214px;
        background-color: #f2f2f2;
        text-align: center;
        border: 1px dashed #CCCCD5;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .avatar-uploader-icon {
          width: 50px;
          height: 50px;
          display: inline-block;
          border-radius: 50%;
          line-height: 50px;
          text-align: center;
          border: 1px dashed #c2c2c2;
          color: #c2c2c2;
          font-size: $bigSize;
        }
        .avatar-desc {
          font-size: $baseSize;
          color: #8a8c92;
          padding-top: $smGap
        }
        .avatar-tip {
          color: #bdbdbd;
          font-size: $baseSize;
        }

      }
    }

  }
</style>
