<template>
  <div class="new-mchnt">
    <header class="page-header style2">
      <h2 class="page-title">{{this.isUpdate ? $t('merchant.newMerchant.title2') : $t('merchant.newMerchant.title1')}}</h2>
        <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span></el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step :title="$t('merchant.newMerchant.step1')"></el-step>
      <el-step :title="$t('merchant.newMerchant.step3')"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseinfo" :model="form.userinfo" :rules="baseRules">
      <h3>{{$t('merchant.newMerchant.basic.cap1')}}</h3>
      <el-form-item prop="username" :label="$t('merchant.newMerchant.form.account')">
        <el-input v-model.trim="form.userinfo.username"></el-input>
      </el-form-item>
      <el-form-item prop="shopname" :label="$t('merchant.newMerchant.form.shopname')">
        <el-input v-model.trim="form.userinfo.shopname"></el-input>
      </el-form-item>
      <el-form-item prop="name" :label="$t('merchant.newMerchant.form.name')">
        <el-input v-model.trim="form.userinfo.name"></el-input>
      </el-form-item>
      <el-form-item prop="legalperson" :label="$t('merchant.newMerchant.form.legal')">
        <el-input v-model.trim="form.userinfo.legalperson"></el-input>
      </el-form-item>
      <el-form-item prop="address" :label="$t('merchant.newMerchant.form.storeaddr')">
        <el-input v-model.trim="form.userinfo.address"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_username" :label="$t('merchant.newMerchant.form.contact')" v-if="!isUpdate">
        <el-input v-model.trim="form.userinfo.slsm_username"></el-input>
      </el-form-item>
      <el-form-item prop="telephone" :label="$t('merchant.newMerchant.form.cell')">
        <el-input v-model.trim="form.userinfo.telephone"></el-input>
      </el-form-item>
      <el-form-item prop="email" :label="$t('merchant.newMerchant.form.email')">
        <el-input v-model.trim="form.userinfo.email"></el-input>
      </el-form-item>
      <el-form-item prop="cate" :label="$t('merchant.newMerchant.form.cate')">
        <el-select v-model="form.userinfo.cate" @change="selectHandler('cate', $event)" ref="cate">
          <el-option :label="$t('merchant.newMerchant.form.sub')" value="merchant"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.big')" value="bigmerchant"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.chain')" value="submerchant"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user_type" :label="$t('merchant.newMerchant.form.scale')">
        <el-select v-model="form.userinfo.user_type" @change="selectHandler('user_type',$event)" ref="user_type">
          <el-option :label="$t('merchant.newMerchant.form.micro')" value="1"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.geti')" value="2"></el-option>
          <el-option :label="$t('merchant.newMerchant.form.ent')" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="mcc" :label="$t('merchant.newMerchant.form.type')">
        <el-select v-model="form.userinfo.mcc" @change="selectHandler('mcc_str',$event)" ref="mcc">
          <el-option :label="item.name" :value="item.id" v-for="(item, idx) in shopTypes" :key="idx"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="big_uid" :label="$t('merchant.newMerchant.form.main')" v-if="form.userinfo.cate==='submerchant'">
        <el-input v-model.trim="form.userinfo.big_uid" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_name" :label="$t('merchant.newMerchant.form.contact')" v-if="isUpdate">
        <el-input v-model.trim="form.qdinfo.slsm_name" type="text"></el-input>
      </el-form-item>

      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <el-form-item prop="tenpay_ratio">
        <span class="rate_label">{{$t('merchant.newMerchant.form.wei')}}</span><el-input-number v-model="form.fee_ratios.tenpay_ratio" :precision="3" :step="0.001" :min="0" :max="1" @change="numberChange"></el-input-number>
      </el-form-item>
      <el-form-item prop="alipay_ratio">
        <span class="rate_label">{{$t('merchant.newMerchant.form.ali')}}</span><el-input-number v-model="form.fee_ratios.alipay_ratio" :precision="3" :step="0.001" :min="0" :max="1"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- step2 -->
    <el-form v-show="active === 1" ref="bankinfos"  :model="form.bankinfo" :rules="bankRules">
      <h3>{{$t('merchant.newMerchant.step3')}}</h3>
      <el-form-item prop="bankuser" :label="$t('merchant.newMerchant.form.bankuser')">
        <el-input v-model="form.bankinfo.bankuser"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" :label="$t('merchant.newMerchant.form.bankaccount')">
        <el-input v-model="form.bankinfo.bankaccount"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" :label="$t('merchant.newMerchant.form.hbank')">
        <el-input v-model="form.bankinfo.headbankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankname" :label="$t('merchant.newMerchant.form.bbank')">
        <el-input v-model="form.bankinfo.bankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankProvince" :label="$t('merchant.newMerchant.form.bankProvice')">
        <el-input v-model="form.bankinfo.bankProvince"></el-input>
      </el-form-item>
      <el-form-item prop="bankCity" :label="$t('merchant.newMerchant.form.bankCity')">
        <el-input v-model="form.bankinfo.bankCity"></el-input>
      </el-form-item>
      <el-form-item prop="bankcode" :label="$t('merchant.newMerchant.form.code')">
        <el-input v-model="form.bankinfo.bankcode"></el-input>
      </el-form-item>
      <el-form-item prop="bankmobile" :label="$t('merchant.newMerchant.form.mobile')">
        <el-input v-model="form.bankinfo.bankmobile"></el-input>
      </el-form-item>
      <el-form-item prop="banktype" :label="$t('merchant.newMerchant.form.banktype')">
        <el-select v-model="form.bankinfo.banktype" ref="banktype">
          <el-option :label="$t('common.privata')" value="1"></el-option>
          <el-option :label="$t('common.pub')" value="2"></el-option>
        </el-select>
      </el-form-item>
      <h3>{{$t('merchant.newMerchant.form.doc')}}</h3>
      <el-row>
        <el-col :span="24">
          <div>
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="form.vouchers"
                v-loading="idcardfrontloading"
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
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.idfront')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmfront')}}</div>
            </el-col>
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="form.vouchers"
                v-loading="idcardbackloading"
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
                    tag: 'idcardback',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                <div v-if="voucherInfo.idcardback_url" class="avatar-wrap">
                  <img :src="voucherInfo.idcardback_url" class="avatar">
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

            <el-col :span="7">
              <el-upload
                :file-list="form.vouchers"
                v-loading="licensephotoloading"
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
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.oper')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmoper')}}</div>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <el-row style="padding-top:50px;">
        <el-col :span="24">
          <div>
             <el-col :span="7" class="up-item">
               <el-upload v-loading="openlicenseloading"
                          :file-list="form.vouchers"
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
                    tag: 'openlicense',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                 <div v-if="voucherInfo.openlicense_url" class="avatar-wrap">
                   <img :src="voucherInfo.openlicense_url" class="avatar">
                   <i class="img-tip">{{$t('common.reupload')}}</i>
                 </div>
                 <div v-else class="avatar-uploader-wrap">
                   <i class="avatar-uploader-icon el-icon-plus"></i>
                   <div class="avatar-desc">{{$t('merchant.newMerchant.form.lic')}}</div>
                   <div class="avatar-tip">{{$t('common.format')}}</div>
                 </div>
               </el-upload>
               <div class="image_info">{{$t('merchant.newMerchant.form.warmlic')}}</div>
             </el-col>

            <el-col :span="7" class="up-item">
              <el-upload v-loading="orgphotoloading"
                         :file-list="form.vouchers"
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
                    tag: 'orgphoto',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                <div v-if="voucherInfo.orgphoto_url" class="avatar-wrap">
                  <img :src="voucherInfo.orgphoto_url" class="avatar">
                  <i class="img-tip">{{$t('common.reupload')}}</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.org')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmorg')}}</div>
            </el-col>

            <el-col :span="7">
              <el-upload v-loading="delegateagreementloading"
                         :file-list="form.vouchers"
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
                    tag: 'delegateagreement',
                    format: 'cors',
                    enuserid: 'EPeRaNEt'
                }">
                <div v-if="voucherInfo.delegateagreement_url" class="avatar-wrap">
                  <img :src="voucherInfo.delegateagreement_url" class="avatar">
                  <i class="img-tip">{{$t('common.reupload')}}</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">{{$t('merchant.newMerchant.form.protocol')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('merchant.newMerchant.form.warmproto')}}</div>
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
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  import ElFormItem from "../../../node_modules/qfpay-element-ui/packages/form/src/form-item.vue";
  import _ from 'lodash'
  export default {
    components: {ElFormItem},
    data() {
      return {
        isLoading: false,
        licensephotoloading: false,
        orgphotoloading: false,
        openlicenseloading: false,
        idcardfrontloading: false,
        idcardbackloading: false,
        delegateagreementloading: false,
        isUpdate: false,
        active: 0, // 当前步骤,
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        form: {
          userinfo: {
            big_uid: '', // 连锁店总店UId
            userid: '',
            user_type: '',
            groupid: '',
            cate: '',
            address: '',
            provice: '',
            city: '',
            email: '',
            telephone: '',
            legalperson: '',
            shopname: '',
            name: '', // 公司名称
            audit_status: '',
            audit_status_str: '',
            jointime: '',
            mcc: '', // 店铺类型编码，仅可以填数字
            mcc_str: '',
            slsm_username: '' // 业务员账号
          },
          qdinfo: {
            slsm_name: '', // 业务员姓名
            slsm_uid: ''
          },
          fee_ratios: {
            tenpay_ratio: '', // 微信费率
            alipay_ratio: '' // 阿里费率
          },
          bankinfo: {
            bankaccount: '', // 开户行账号
            bankProvince: '', // 开户行所在省
            bankCity: '', // 所在市
            headbankname: '', // 总行
            bankname: '', // 支行
            bankuser: '', // 银行用户
            bankcode: '', // 联行号
            bankmobile: '', // 开户关联的手机号
            banktype: '', // 银行类型
            jointime: '' // 入网时间
          },
          vouchers: [], // 上传的凭据照片
        },
        shopTypes: [],
        voucherInfo: {
          orgphoto_url: '', // 组织机构代码证
          orgphoto_name: '',
          openlicense_url: '', // 开户许可证url
          openlicense_name: '',
          licensephoto_url: '', // 营业执照照片url
          licensephoto_name: '',
          idcardfront_url: '', // 身份证正面/法人身份证正面url
          idcardfront_name: '',
          idcardback_url: '', // 身份证背面/法人身份证背面url
          idcardback_name: '',
          delegateagreement_url: '',
          delegateagreement_name: '' // 业务代理协议
        },
        baseRules: {
          'cate': [
            {required: true, message: this.$t('merchant.newMerchant.rule1')}
          ],
          'shopname': [
            {required: true, message: this.$t('merchant.newMerchant.rule2')},
            {max: 60, min: 0, message: this.$t('merchant.newMerchant.rule10'), trigger: 'blur'}
            ],
          'name': [
            {required: true, message: this.$t('merchant.newMerchant.rule3')}
          ],
          'email': [
            { type: 'email', message: this.$t('merchant.newMerchant.rule4'), trigger: 'blur' }
          ],
          'telephone': [
            {
              validator: (rule, val, cb) => {
                 if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('merchant.newMerchant.rule6')));
                }else {
                  cb();
                }
              }
            }
          ]
        },
        bankRules: {
          'bankaccount': [
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.rule5')));
                }else {
                  cb();
                }
              },
              trigger: 'blur'
            }
          ],
          'bankmobile': [
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val)) {
                  cb(new Error(this.$t('merchant.newMerchant.rule6')));
                }else {
                  cb();
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },

    created() {
      if(this.$route.params) {
        this.isUpdate = this.$route.params.command === 'edit'
        if(this.isUpdate) {
          this.getDetailInfo();
        }else {
          this.baseRules['slsm_username'] = [
            {required: true, message: this.$t('merchant.newMerchant.rule7')}
          ]
        }
        this.getShopTypes()
      }
    },
    mounted() {
//      this.initSelection()
    },
    methods: {
      getShopTypes() {
        axios.get(`${config.host}/org/tools/mcc/list`, {
          params: {
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.shopTypes = data.data;
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
          if(_target) {
            let idx = _.findIndex(this.form.vouchers, function(_target) { return _target.name == file.response.data.tag; });
            this.form.vouchers[idx].name = file.response.data.tag;
            this.form.vouchers[idx].imgname = file.response.data.name;
            this.form.vouchers[idx].url = file.response.data.url;
          }else {
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
        if(flag || this.voucherInfo[name + '_url']) {
          axios.post(`${config.imgUpload}/util/v1/cpfile`, qs.stringify({
            enuserid: this.form.userinfo.userid,
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
            }else {
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
            userid: this.$route.params.userid,
            mode: 'info',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.form = data.data
              data.data.vouchers.forEach((item) => {
                this.voucherInfo[item.name + '_url'] = item.url
                this.voucherInfo[item.name + '_name'] = item.imgname
              })
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.isLoading = false;
          this.$message.error(this.$t('common.netError'));
        });
      },
      create() {
        let params1 = Object.assign(this.form.userinfo, this.form.fee_ratios, this.form.qdinfo)
        let parmas2 = Object.assign(this.form.bankinfo, {vouchers: JSON.stringify(this.form.vouchers)})
        let params = Object.assign(params1, parmas2)
        let url = this.isUpdate ? `${config.host}/org/mchnt/edit` : `${config.host}/org/mchnt/signup`
        params.format = 'cors'
        if(this.isUpdate) {
          delete params['slsm_username']
        }
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
        axios.post(url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
              this.$message.success(this.isUpdate ? this.$t('common.updateSuccess') : this.$t('common.createSuccess'))
              this.$router.push({
                name: 'mchntDetail',
                query: {userid: data.data.userid, from: (this.isUpdate ? 'edit' : 'new')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
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
            if (valid) {
              this.create()
            }
          })
        }
      },
      numberChange(v) {
//        console.log(this.form.fee_ratios.tenpay_ratio)
      },
      cancelHandler() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      selectHandler(key, val) {
        if(key === 'mcc_str') {
          this.form.userinfo.mcc_str = this.shopTypes[--val].name;
        }else if (key === 'cate') {
          if(val === 'submerchant') {
            this.baseRules['big_uid'] = [
              {required: true, message: this.$t('merchant.newMerchant.rule9')}
            ]
          }else {
            if(this.baseRules['big_uid']) {
              delete this.baseRules['big_uid']
            }
          }
        }else if(key === 'user_type') {

        }
      },
      initSelection() {
        let cats = {
          merchant: this.$t('merchant.newMerchant.form.sub'),
          bigmerchant: this.$t('merchant.newMerchant.form.big'),
          submerchant: this.$t('merchant.newMerchant.form.chain')
        };
        let userTypes = {
          "1": this.$t('merchant.newMerchant.form.micro'),
          "2": this.$t('merchant.newMerchant.form.geti'),
          "3": this.$t('merchant.newMerchant.form.ent')
        };
        let banktypes = {
          "1": this.$t('common.privata'),
          "2": this.$t('common.pub')
        }
        this.$refs['cate'].selected.label = cats[this.form.userinfo.cate];
        this.$refs['user_type'].selected.label = userTypes[this.form.userinfo.user_type];
        this.$refs['mcc'].selected.label = _.filter(this.shopTypes, { id: this.form.userinfo.mcc })['name']
        this.$refs['banktype'].selected.label = banktypes[this.form.bankinfo.banktype]
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
    .el-steps {
      /*padding-right: 75px;*/
      /*flex-basis: 50%;*/
    }
    .el-form {
      background-color: #F7F9FA;
      margin-bottom: 24px;
      padding: 15px 30px 30px 30px;
      .el-loading-mask {
        width: 287px;
      }
      h3 {
        position: relative;
        padding: 12px 0;
        margin: 0 0 20px;
        font-size: 20px;
        color: $titleColor;
        &:after{
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
          width:300px;
          .rate_label {
            font-size: 14px;
            color:#717283;
            padding:0 $smGap;
          }
        }
      }
      .el-form-item:nth-of-type(3n) {
        /*margin-right: 0;*/
      }
      /*.upload-comp {*/
        /*.pic-uploaded {*/
          /*width:285px;height:214px;*/
          /*display:inline-block;*/
        /*}*/
        /*.el-upload,.el-upload-dragger {*/
          /*width:285px;*/
        /*}*/
      /*}*/

      .upload-label {
        color: grey;font-size:14px;
        height: 204px;;width:100%;
        display:flex;align-items: center;
      }
      .up-item {
        margin-right:50px;
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
          top:0;
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
        width: 285px;
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
          padding-top:$smGap
        }
        .avatar-tip {
          color: #bdbdbd;
          font-size:$baseSize;
        }

      }
    }

  }
</style>
