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

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseinfo" :model="formData" :rules="baseRules">
      <h3>{{$t('merchant.newMerchant.basic.cap1')}}</h3>

      <el-form-item :label="$t('merchant.newMerchant.form.channel')" prop="primary_uid" v-if="!isUpdate">
        <el-select v-model="formData.primary_uid" @change="selectChannelHandler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels1" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.channel2')" prop="secondary_uid" v-if="!isUpdate">
        <el-select v-model="formData.secondary_uid" :placeholder="$t('merchant.form.ph')" @change="selectChannel2Handler">
          <el-option :label="item.name" :value="item.qd_uid" v-for="item in channels2" :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.saleMan')" prop="sls_uid" v-if="!isUpdate">
        <el-select v-model="formData.sls_uid">
         <el-option :label="item.name" :value="item.userid" v-for="item in salesperson" :key="item.userid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.status')" prop="status" v-if="isUpdate&&isStatus">
        <el-select v-model="formData.status">
         <el-option :label="item.name" :value="item.val" v-for="item in statusList" :key="item.val"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.contact')" prop="slsm_name" v-if="isUpdate">
          <el-input id="op_type" v-model="formData.slsm_name"
                :placeholder="$t('merchant.newMerchant.rule43')"
                readonly
                class="sub-account-item-info"><template slot="append"><i class="el-icon-arrow-down tree-indic" @click.stop="showTreeComponent"></i></template>
          </el-input>
          <el-tree id="op-type-tree" :data="salesperson" :props="defaultProps"        @node-click="handleNodeClick"
                v-show="isShowTree"
                node-key="uid"
                ref="tree"
                style="position:absolute;top:38px;z-index:9;width:299px;overflow-y:auto;height:320px;"></el-tree>
      </el-form-item>

      <el-form-item prop="shopname" :label="$t('merchant.newMerchant.form.meiname')">
        <el-input
          v-model.trim="formData.shopname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.mertype')" prop="cate">
        <el-select v-model="formData.cate" ref="cate" :disabled="isUpdate">
          <el-option :label="$t('merchant.newMerchant.form.sub')" value="merchant"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.big')" value="bigmerchant"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="email" :label="$t('merchant.newMerchant.form.postT')">
        <el-input
          v-model.trim="formData.email"
          :disabled="isUpdate"></el-input>
      </el-form-item>

      <el-form-item prop="legalperson" :label="$t('merchant.newMerchant.form.concatName')">
        <el-input v-model.trim="formData.legalperson"></el-input>
      </el-form-item>

      <el-form-item prop="telephone" :label="$t('merchant.newMerchant.form.concatNumber')">
        <el-input
          v-model.trim="formData.telephone"
          :disabled="isUpdate"
          maxlength='8'></el-input>
      </el-form-item>

      <el-form-item prop="documentType" :label="$t('merchant.newMerchant.form.documentType')">
        <el-select
            v-model="formData.documentType"
            :disabled="isUpdate">
          <el-option :label="$t('merchant.newMerchant.doctype.type2')" value="passport"></el-option>
          <el-option :label="$t('merchant.newMerchant.doctype.type1')" value="eep"></el-option>
          <el-option :label="$t('merchant.newMerchant.doctype.type3')" value="idnumber"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="documentNum" :label="$t('merchant.newMerchant.form.doucumentNum')">
        <el-input
          v-model.trim="formData.documentNum"
          maxlength='15'
        ></el-input>
      </el-form-item>

      <el-form-item prop="mcc" :label="$t('merchant.newMerchant.form.industry')">
        <el-select v-model.trim="formData.mcc" ref="mcc">
          <el-option :label="item.name" :value="item.id" v-for="item in shopTypes" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="address" :label="$t('merchant.newMerchant.form.addressT')">
        <el-input v-model.trim="formData.address"></el-input>
      </el-form-item>

      <el-form-item prop="br" :label="$t('merchant.newMerchant.form.BRnumber')">
        <el-input v-model.trim="formData.br"></el-input>
      </el-form-item>

      <el-form-item prop="br_expire_time" :label="$t('merchant.newMerchant.form.BRvality')">
        <el-date-picker
          v-model.trim="formData.br_expire_time"
          type="date"
          format='dd/MM/yyyy'
          value-format="yyyy/MM/dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item prop="ci" :label="$t('merchant.newMerchant.form.CInumber')">
        <el-input v-model.trim="formData.ci"></el-input>
      </el-form-item>

      <el-form-item prop="ci_expire_time" :label="$t('merchant.newMerchant.form.CIvality')">
        <el-date-picker
          v-model.trim="formData.ci_expire_time"
          type="date"
          format='dd/MM/yyyy'
          value-format="yyyy/MM/dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <div :label="item.name" v-for="(item, index0) in radioList" :key="item.name" prop="tenpay_ratio">
        <h4>{{item.name}}</h4>
        <el-form-item :label="fee.trade_type_name" v-for="(fee, index) in item.busicd" :error="fee.error" :key="fee.trade_type_name">
            <el-input-number @change="ratioMinRule($event, fee.ratioMin, fee.trade_type, index, index0)" v-model="fee.ratio" :precision="2" :step="0.01" :min="0" :max="5"></el-input-number>
        </el-form-item>
      </div>

      <h3>{{$t('merchant.newMerchant.basic.cap3')}}</h3>
      <el-form-item prop="bankuser" :label="$t('merchant.newMerchant.form.accountName')">
        <el-input v-model.trim="formData.bankuser"></el-input>
      </el-form-item>

      <el-form-item prop="headbankname" :label="$t('merchant.newMerchant.form.accountType')">
        <el-input v-model.trim="formData.headbankname"></el-input>
      </el-form-item>

      <el-form-item prop="bankaccount" :label="$t('merchant.newMerchant.form.accountH')">
        <el-input v-model.trim="formData.bankaccount" @change="GetRemit"></el-input>
      </el-form-item>

      <el-form-item prop="bankProvince" :label="$t('merchant.newMerchant.form.accountAddress')">
        <el-input v-model.trim="formData.bankProvince"></el-input>
      </el-form-item>

      <el-form-item prop="bankcode" :label="$t('common.SWIFT')">
        <el-input v-model.trim="formData.bankcode"></el-input>
      </el-form-item>

      <el-form-item prop="remit_amt" :label="$t('merchant.newMerchant.form.moneySettment')">
        <el-input
          v-model.trim="formData.remit_amt"
          :disabled="IsRemit"
          maxlength='5'></el-input>
      </el-form-item>
    </el-form>
    <!-- step2 -->
    <el-form v-show="active === 1" ref="bankinfos" :model="formData" :rules="bankRules">
      <section v-if="!isUpdate">
        <h3>{{$t('merchant.newMerchant.basic.cap4')}}</h3>
        <el-form-item prop="shopnameT" :label="$t('merchant.newMerchant.form.storename')">
          <el-input v-model.trim="formData.shopnameT"></el-input>
        </el-form-item>

        <el-form-item prop="addressT" :label="$t('merchant.newMerchant.form.storeAddress')">
          <el-input
            v-model.trim="formData.addressT"
            maxlength='50'
          ></el-input>
        </el-form-item>

        <el-form-item prop="telephoneT" :label="$t('merchant.newMerchant.form.storephone')">
          <el-input
            v-model.trim="formData.telephoneT"
            maxlength='8'
          ></el-input>
        </el-form-item>

        <el-form-item prop="operatingT" :label="$t('merchant.newMerchant.form.storeoperating')">
          <el-input v-model.trim="formData.operatingT"></el-input>
        </el-form-item>
      </section>

      <el-row>
        <el-col :span="24">
          <div class="uploader-wrap">
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="formData.vouchers"
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
                    tag: 'idcardfront',
                    enuserid: 'EPeRaNEt',
                    format: 'cors'
                }">
                <div v-if="voucherInfo.idcardfront_url" class="avatar-wrap">
                  <img :src="voucherInfo.idcardfront_url" class="avatar">
                  <span class="img-tip">{{$t('common.reupload')}}</span>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.idcardfront')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmfront')}}</div> -->
            </el-col>
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="formData.vouchers"
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
                    tag: 'licensephoto',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                <div v-if="voucherInfo.licensephoto_url" class="avatar-wrap">
                  <img :src="voucherInfo.licensephoto_url" class="avatar">
                  <i class="img-tip">{{$t('common.reupload')}}</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.licensephoto')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmlicense')}}</div> -->
            </el-col>
            <el-col :span="7" class="up-item" v-if="!isUpdate">
              <el-upload
                :file-list="formData.vouchers"
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
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.goodsphoto')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmgood')}}</div> -->
            </el-col>
            <el-col :span="7" class="up-item" v-if="!isUpdate">
              <el-upload
                :file-list="formData.vouchers"
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
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.shopphoto')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmshop')}}</div> -->
            </el-col>
            <el-col :span="7" class="up-item" v-if="!isUpdate">
              <el-upload
                :file-list="formData.vouchers"
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
                    tag: 'paypoint',
                    enuserid: 'EPeRaNEt',
                    format: 'cors'
                }">
                <div v-if="voucherInfo.paypoint_url" class="avatar-wrap">
                  <img :src="voucherInfo.paypoint_url" class="avatar">
                  <span class="img-tip">{{$t('common.reupload')}}</span>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.paypoint')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmpaypoint')}}</div> -->
            </el-col>
            <el-col :span="7" class="up-item" v-if="!isUpdate">
              <el-upload
                :file-list="formData.vouchers"
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
                    tag: 'otherphoto',
                    enuserid: 'EPeRaNEt',
                    format: 'cors'
                }">
                <div v-if="voucherInfo.otherphoto_url" class="avatar-wrap">
                  <img :src="voucherInfo.otherphoto_url" class="avatar">
                  <span class="img-tip">{{$t('common.reupload')}}</span>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.picture.otherphoto')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <!-- <div class="image_info">{{$t('merchant.newMerchant.form.warmother')}}</div> -->
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
  import { formatDate } from '../../common/js/util';
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
        isStatus: false,
        IsRemit: false,
        active: 0, // 当前步骤,
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        qd_uid: '', // 所有代理商id
        isShowTree: false,
        forFlag: false,
        formData: {
          cate: '', // 注册商户的类型
          shopname: '', // 商户名称
          mcc: '', // 商家类型
          status: '', // 商户类型
          address: '', // 商户地址
          legalperson: '', // 公司联系人
          telephone: '', // 公司联系人电话
          email: '', // 邮箱
          headbankname: '', // 开户行名称
          bankuser: '', // 开户行
          bankaccount: '', // 银行账号
          bankProvince: '', // 银行地址
          bankcode: '', // SWIFT码
          remit_amt: '', // 结算资金起点
          ci: '', // ci编号
          ci_expire_time: '', // ci有效期
          br: '', // br编号
          br_expire_time: '', // br有效期
          shopnameT: '', // 门店地址
          telephoneT: '', // 门店联系电话
          addressT: '', // 门店地址
          operatingT: '', // 店铺营业时间
          vouchers: [], // 上传的凭据照片
          documentType: '', // 证件类型
          documentNum: '',
          primary_uid: '', // 一级代理商id
          secondary_uid: '', // 二级代理商id
          sls_uid: '', // 业务员id
          slsm_name: '', // 业务员姓名
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
          {name: this.$t('common.enable'), val: 3},
          {name: this.$t('common.disable'), val: 4}
        ],
        voucherInfo: {
          idcardfront_url: '',
          idcardfront_name: '',
          licensephoto_url: '',
          licensephoto_name: '',
          goodsphoto_url: '', // 经营场所内景照片url
          goodsphoto_name: '',
          shopphoto_url: '',
          shopphoto_name: '',
          paypoint_url: '',
          paypoint_name: '',
          otherphoto_url: '',
          otherphoto_name: ''
        },
        baseRules: {
          'sls_uid': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule1')}
          ],
          'cate': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule2')}
          ],
          'shopname': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule3')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'email': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule4'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            },
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'legalperson': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule5')}
          ],
          'telephone': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule6')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            }
          ],
          'documentType': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule7')}
          ],
          'documentNum': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule8')}
          ],
          'mcc': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule9')}
          ],
          'address': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule10')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'br': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule11')},
            {max: 25, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule7'), trigger: 'blur'}
          ],
          'br_expire_time': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule12')}
          ],
          'ci': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule13')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule2')));
                } else {
                  cb();
                }
              }
            },
            {max: 25, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule7'), trigger: 'blur'}
          ],
          'ci_expire_time': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule14')}
          ],
          'bankuser': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule15')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule7'), trigger: 'blur'}
          ],
          'headbankname': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule16')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'bankaccount': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule17')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            },
            {max: 15, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule6'), trigger: 'blur'}
          ],
          'bankProvince': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule18')},
            {max: 50, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule8'), trigger: 'blur'}
          ],
          'bankcode': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule24')}
          ],
          'remit_amt': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule19')},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            }
            // {max: 5, min: 0, message: this.$t('merchant.newMerchant.lengthRule.rule2')}
          ]
        },
        bankRules: {
          'shopnameT': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule20'), trigger: 'blur'},
          ],
          'addressT': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule21'), trigger: 'blur'},
          ],
          'telephoneT': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule22'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.specialRule.rule1')));
                } else {
                  cb();
                }
              }
            }
          ],
          'operatingT': [
            {required: true, message: this.$t('merchant.newMerchant.requiredRule.rule23'), trigger: 'blur'},
          ]
        },
        radioList: []
      }
    },
    created() {
      if (this.$route.query) {
        this.isUpdate = this.$route.query.command === 'edit' || getParams('command') === 'edit'
        !this.isUpdate && this.getChannelList()
        !this.isUpdate && this.getSalesPersonList();
        !this.isUpdate && this.fetchRadio()
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
    watch: {
      "formData.secondary_uid"() {
        this.fetchRadio(this.formData.secondary_uid)
      }
    },
    methods: {
      // 费率的接口请求
      fetchRadio(agentUid, fees = []) {  // fee 更新ratio
        let params = {
          format: 'cors'
        }
        if (agentUid) {
          params.agent_uid = agentUid
        }
        if (agentUid && fees.length === 0) { // 切换业务员
          fees = [...this.radioList]
        }
        axios.get(`${config.host}/org/tools/get/ratio`, {
          params
        }).then((res) => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            let ratios = data.data;
            if (fees.length > 0) {
              ratios.map((ratio, index) => {
                fees.map((fee, fIndex) => {
                  if (ratio.name === fee.name) {
                    ratio.busicd.map((item) => {
                      fee.busicd.map((fitem) => {
                        if (item.trade_type === fitem.trade_type) {
                          if (agentUid && fees.length === 0) {
                            item.ratioMin = fitem.ratioMin
                          } else {
                            item.ratio = fitem.ratio
                          }
                        }
                      })
                    })
                  }
                })
              })
            }
            this.radioList = ratios;
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      ratioMinRule(value, ratioMin, trade_type, index, index0) { // 费率填写提示信息的处理
        if(value === undefined ) {
          setTimeout(() => {
          this.radioList[index0]['busicd'][index]['ratio'] = 0;
          }, 0)
        }
        let errorMessage = value < ratioMin ? this.$t('common.MINRatio')+`${ratioMin}` : ''
        this.radioList.map((radio) => {
          radio.busicd.map((item) => {
            if (trade_type === item.trade_type) {
              this.$set(item, 'error', errorMessage)
            } else {
              item.error = ''
            }
          })
        })
      },
      handleNodeClick(data, node) { // 编辑商户的修改业务员部分
        if(data.isLeaf && Object.prototype.toString.call(data.slsm) === "[object Undefined]") {
           this.formData.sls_uid = data.uid;
           this.formData.slsm_name = data.name;
           this.isShowTree = false;
           this.fetchRadio(node.parent.data.uid)
          //  this.revalue(this.radioList, this.radioListInfo)
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
      // checkPhotosIsUpdated() { // 图片设置的必传后又改为非必传
      //   if (!this.voucherInfo.idcardfront_url && !this.isUpdate) { // && this.form.vouchers.includes('shopphoto')
      //     this.$message.error(this.$t('merchant.newMerchant.rule44'));
      //     return false;
      //   }
      //   if (!this.voucherInfo.licensephoto_url && !this.isUpdate) { // && this.form.vouchers.includes('shopphoto')
      //     this.$message.error(this.$t('merchant.newMerchant.rule45'));
      //     return false;
      //   }
      //   if (!this.voucherInfo.goodsphoto_url && !this.isUpdate) { // && this.form.vouchers.includes('goodsphoto')
      //     this.$message.error(this.$t('merchant.newMerchant.rule28'));
      //     return false;
      //   }
      //   if (!this.voucherInfo.shopphoto_url && !this.isUpdate) { // && this.form.vouchers.includes('shopphoto')
      //     this.$message.error(this.$t('merchant.newMerchant.rule29'));
      //     return false;
      //   }
      //   if (!this.voucherInfo.paypoint_url && !this.isUpdate) { // && this.form.vouchers.includes('shopphoto')
      //     this.$message.error(this.$t('merchant.newMerchant.rule46'));
      //     return false;
      //   }
      //   return true
      // },
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
              this.channels2 = (groupid ? data.data.list: []);
              this.formData.secondary_uid = ''
              this.fetchRadio(groupid)
              this.getSalesPersonList()
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      selectChannel2Handler(groupid) { // 选择二级代理商
        this.fetchRadio(groupid)
        this.getSalesPersonList()
      },
      getSalesPersonList() {
        axios.get(`${config.host}/org/tools/slsm`, {
          params: {
            agent_uid: this.formData.secondary_uid || this.formData.primary_uid,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.salesperson = data.data;
              this.formData.sls_uid = ''
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
          let _target = _.find(this.formData.vouchers, _.matchesProperty('name', file.response.data.tag))
          if (_target) {
            let idx = _.findIndex(this.formData.vouchers, function (_target) {
              return _target.name == file.response.data.tag;
            });
            this.formData.vouchers[idx].name = file.response.data.tag;
            this.formData.vouchers[idx].imgname = file.response.data.name;
            this.formData.vouchers[idx].url = file.response.data.url;
          } else {
            this.formData.vouchers.push({
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
              this.IsRemit = true

              let uinfo = data.data.userinfo;
              let fees = data.data.fee_ratios
              let qdinfo = data.data.qdinfo;
              let vouchers = data.data.vouchers
              let bankinfo = data.data.bankinfo

              this.formData.status = uinfo.status
              this.formData.sls_uid = qdinfo.sls_uid
              this.formData.vouchers = vouchers
              this.formData.shopname = uinfo.shopname; // 商户名称
              this.formData.cate = uinfo.cate; // 商户类型
              this.formData.mcc = +uinfo.mcc; // 行业类别
              this.formData.documentNum = uinfo.idnumber || uinfo.eep || uinfo.passport
              this.formData.address = uinfo.address; //
              this.formData.legalperson = uinfo.legalperson; // 联系人姓名
              this.formData.telephone = uinfo.telephone; // 联系电话
              this.formData.email = uinfo.email; // 邮箱地址
              this.formData.br = uinfo.br; // br编号
              this.formData.br_expire_time = uinfo.br_expire_time; // br有效期
              this.formData.ci = uinfo.ci; // ci编号
              this.formData.ci_expire_time = uinfo.ci_expire_time; // ci有效期
              this.formData.headbankname = bankinfo.headbankname //
              this.formData.bankProvince = bankinfo.bankProvince //
              this.formData.bankuser = bankinfo.bankuser //
              this.formData.bankaccount = bankinfo.bankaccount //
              this.formData.bankcode = bankinfo.bankcode //
              this.formData.remit_amt = uinfo.remit_amt
              // this.radioList = fee

              this.isStatus = this.formData.status == 3 || this.formData.status == 4

              if(uinfo.passport) {
                this.formData.documentType = "passport"
              } else if (uinfo.idnumber) {
                this.formData.documentType = "idnumber"
              } else {
                this.formData.documentType = "eep"
              }
              this.fetchRadio(qdinfo.qd_uid, fees)
              // this.revalue(this.radioList, this.radioListInfo)
              this.repicture(this.voucherInfo, vouchers)
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
            if(l.uid === this.formData.sls_uid) {
              this.formData.slsm_name = l.name;
              this.forFlag = true;
              return;
            }
          }
          if(this.forFlag) {
            return;
          }
        }
      },
      create() { // 创建商户的提交
        let form = {
          mchnt: {
            cate: this.formData.cate, // 注册商户的类型
            sls_uid: this.formData.sls_uid, // 业务员id
            shopname: this.formData.shopname, // 商户名称
            mcc: this.formData.mcc, // 商家类型
            address: this.formData.address, // 公司地址
            legalperson: this.formData.legalperson, // 公司联系人
            telephone: this.formData.telephone, // 公司联系人电话
            email: this.formData.email, // 邮箱
            headbankname: this.formData.headbankname, // 开户银行
            bankuser: this.formData.bankuser, // 银行账户名称
            bankaccount: this.formData.bankaccount, // 银行账号
            bankProvince: this.formData.bankProvince, // 银行地址
            bankcode: this.formData.bankcode, // SWIFT码
            remit_amt: this.formData.remit_amt, // 结算资金起点
            ci: this.formData.ci, // ci编号
            ci_expire_time: this.formData.ci_expire_time, // ci有效期
            br: this.formData.br, // br编号
            br_expire_time: this.formData.br_expire_time, // br有效期
            status: this.formData.status
          },
          store: {
            shopname: this.formData.shopnameT, // 门店地址
            telephone: this.formData.telephoneT, // 门店联系电话
            address: this.formData.addressT, // 门店地址
            operating: this.formData.operatingT, // 店铺营业时间
          },
          vouchers: [], // 上传的凭据照片
        }
        let params = {}
        form.mchnt[this.formData.documentType] = this.formData.documentNum
        let radioListValue = this.refee(this.radioList)
        // console.log(radioListValue, 4444)
        params.mchnt = JSON.stringify(form.mchnt)
        params.store = JSON.stringify(form.store)
        params.mchnt_ratios = JSON.stringify(radioListValue)
        let url = this.isUpdate ? `${config.host}/org/mchnt/edit` : `${config.host}/org/mchnt/signup`
        params.format = 'cors'
        // params.tenpay_ratio = parseFloat(params.tenpay_ratio).toFixed(2)
        if (!this.isUpdate) {
          let converted = _.map(_.cloneDeep(this.formData.vouchers), (item) => {
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
          let converted = _.map(_.cloneDeep(this.formData.vouchers), (item) => {
            return _.pick(item, ['name', 'imgname']);
          })
          params.vouchers = {}
          converted.forEach((item) => {
            let vals = _.values(item)
            params.vouchers[vals[0]] = vals[1]
          })
          params.vouchers.enuserid = 'EPeRaNEt';
          form.vouchers = params.vouchers
          params.vouchers = JSON.stringify(params.vouchers)
          form.type = 'bigmerchant'
          form.userid = this.$route.query.userid || getParams('userid')
          params.type = 'bigmerchant';
          params.userid = this.$route.query.userid || getParams('userid')
          delete form.store;
          delete params.store
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
          }).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.isLoading = false
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
                localStorage.setItem('new_baseinfo', JSON.stringify(this.form))
              }
            }
          })
        } else if (this.active === 1) { // 第二步
          this.$refs['bankinfos'].validate((valid) => {
            if (valid) {
              this.isLoading = true
              this.create()
            }
          })
        }
      },
      cancelHandler() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      repicture(c,d) { // 编辑显示俩张图片
        for(let i of d) {
          if(i['name'] === 'idcardfront') {
            c['idcardfront_url'] = i['url'];
          } else if(i['name'] === 'licensephoto') {
            c['licensephoto_url'] = i['url']
          }
        }
      },
      refee(f) { // 注册及编辑的费率结构修改
        let e = []
        for(let i of f) {
          for(let j of i.busicd){
            e.push(j)
          }
        }
        return e
      },
      GetRemit() { // 根据银行账号获得
        axios.get(`${config.host}/org/tools/remit_amt`, {
          params: {
            bankaccount: this.formData.bankaccount,
            format: 'cors'
          }
        }).then((res) => {
          let data = res.data
          if(data.respcd === config.code.OK) {
            this.formData.remit_amt = data.data.remit_amt;
            if(data.data.remit_amt !== "") {
              this.IsRemit = true
            }else {
              this.IsRemit = false
            }
          }else {
            this.$message.error(data.respmsg);
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .new-mchnt {
    background-color: #fff;
    padding: 0 30px;
    .up-item {
      margin-top: 10px;
    }
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
        padding: 12px 0;
        margin: 0 0 20px;
        font-size: 20px;
        color: #1D1D24;
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
      .el-form-item {
        width: 300px;
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
