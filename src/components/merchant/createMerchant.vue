<template>
  <div class="new-mchnt">
    <header class="page-header style2">
      <h2 class="page-title">{{this.isUpdate ? '修改商户' : '添加商户'}}</h2>
        <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>关闭</span></el-button>
    </header>
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="结算信息"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="baseinfo" :model="form.userinfo" :rules="baseRules">
      <h3>{{$t('merchant.newMerchant.basic.cap1')}}</h3>
      <el-form-item prop="username" label="商户账号">
        <el-input v-model.trim="form.userinfo.username"></el-input>
      </el-form-item>
      <el-form-item prop="shopname" label="商户名称">
        <el-input v-model.trim="form.userinfo.shopname"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="公司名称">
        <el-input v-model.trim="form.userinfo.name"></el-input>
      </el-form-item>
      <el-form-item prop="legalperson" label="法人姓名">
        <el-input v-model.trim="form.userinfo.legalperson"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="店铺地址">
        <el-input v-model.trim="form.userinfo.address"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮件">
        <el-input v-model.trim="form.userinfo.email"></el-input>
      </el-form-item>
      <el-form-item prop="cate" label="注册商户">
        <el-select v-model="form.userinfo.cate" @change="selectHandler('cate', $event)" ref="cate">
          <el-option label="普通子商户" value="merchant"></el-option>
          <el-option label="大商户" value="bigmerchant"></el-option>
          <el-option label="连锁门店" value="submerchant"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="user_type" label="商户类型">
        <el-select v-model="form.userinfo.user_type" @change="selectHandler('user_type',$event)" ref="user_type">
          <el-option label="小微" value="1"></el-option>
          <el-option label="个体" value="2"></el-option>
          <el-option label="企业" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="mcc" label="店铺类型">
        <el-select v-model="form.userinfo.mcc" @change="selectHandler('mcc_str',$event)" ref="mcc">
          <el-option :label="item.name" :value="item.id" v-for="(item, idx) in shopTypes" :key="idx"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="big_uid" label="连锁店总店UID" v-if="form.userinfo.cate==='submerchant'">
        <el-input v-model.trim="form.userinfo.big_uid" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="slsm_name" label="业务员账号" v-if="isUpdate">
        <el-input v-model.trim="form.qdinfo.slsm_name" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="业务员联系方式">
        <el-input v-model.trim="form.userinfo.mobile"></el-input>
      </el-form-item>

      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <el-form-item prop="tenpay_ratio" label="商户费率">
        <span class="rate_label">微信支付：</span><el-input-number v-model="form.fee_ratios.tenpay_ratio" :precision="3" :step="0.001" :min="0" :max="1" @change="numberChange"></el-input-number>
      </el-form-item>
      <el-form-item prop="alipay_ratio" label="商户费率">
        <span class="rate_label">支付宝：</span><el-input-number v-model="form.fee_ratios.alipay_ratio" :precision="3" :step="0.001" :min="0" :max="1"></el-input-number>
      </el-form-item>
    </el-form>
    <!-- step2 -->
    <el-form v-show="active === 1" ref="bankinfos"  :model="form.bankinfo" :rules="bankRules">
      <h3>结算信息</h3>
      <el-form-item prop="bankuser" label="账户名称">
        <el-input v-model="form.bankinfo.bankuser"></el-input>
      </el-form-item>
      <el-form-item prop="bankaccount" label="清算账号">
        <el-input v-model="form.bankinfo.bankaccount"></el-input>
      </el-form-item>
      <el-form-item prop="headbankname" label="总行名称">
        <el-input v-model="form.bankinfo.headbankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankname" label="支行名称">
        <el-input v-model="form.bankinfo.bankname"></el-input>
      </el-form-item>
      <el-form-item prop="bankProvince" label="银行省">
        <el-input v-model="form.bankinfo.bankProvince"></el-input>
      </el-form-item>
      <el-form-item prop="bankCity" label="银行市">
        <el-input v-model="form.bankinfo.bankCity"></el-input>
      </el-form-item>
      <el-form-item prop="bankcode" label="联行号">
        <el-input v-model="form.bankinfo.bankcode"></el-input>
      </el-form-item>
      <el-form-item prop="bankmobile" label="预留手机号">
        <el-input v-model="form.bankinfo.bankmobile"></el-input>
      </el-form-item>
      <el-form-item prop="banktype" label="银行账户类型">
        <el-select v-model="form.bankinfo.banktype" ref="banktype">
          <el-option label="对私" value="1"></el-option>
          <el-option label="对公" value="2"></el-option>
        </el-select>
      </el-form-item>
      <h3>上传凭证</h3>
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
                  <span class="img-tip">重新上传</span>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">点击添加法人身份证正面照</div>
                  <div class="avatar-tip">支持jpg／png格式</div>
                </div>
              </el-upload>
              <div class="image_info">* 必须使用有效期内的二代身份证，身份证号码及头像清晰可见，完整身份证正面照。</div>
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
                  <i class="img-tip">重新上传</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">点击添加法人身份证反面照</div>
                  <div class="avatar-tip">支持jpg／png格式</div>
                </div>
              </el-upload>
              <div class="image_info">* 必须使用有效期内的二代身份证，有效期清晰可见，完整身份证反面照。</div>
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
                  <i class="img-tip">重新上传</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">点击添加营业执照照片</div>
                  <div class="avatar-tip">支持jpg／png格式</div>
                </div>
              </el-upload>
              <div class="image_info">* 必须使用有效期之内的营业执照，需要证件完整且文字清晰可见。</div>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <el-row style="padding-top:40px;">
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
                   <i class="img-tip">重新上传</i>
                 </div>
                 <div v-else class="avatar-uploader-wrap">
                   <i class="avatar-uploader-icon el-icon-plus"></i>
                   <div class="avatar-desc">点击添加开户许可证照片</div>
                   <div class="avatar-tip">支持jpg／png格式</div>
                 </div>
               </el-upload>
               <div class="image_info">* 请上传有效的开户许可证照片，保证画面清晰，内容完整。</div>
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
                  <i class="img-tip">重新上传</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">点击添加组织机构照片</div>
                  <div class="avatar-tip">支持jpg／png格式</div>
                </div>
              </el-upload>
              <div class="image_info">* 请上传有效的组织机构照片，保证画面清晰，内容完整。</div>
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
                  <i class="img-tip">重新上传</i>
                </div>
                <div v-else class="avatar-uploader-wrap">
                  <i class="avatar-uploader-icon el-icon-plus"></i>
                  <div class="avatar-desc">点击添加商户协议照片</div>
                  <div class="avatar-tip">支持jpg／png格式</div>
                </div>
              </el-upload>
              <div class="image_info">* 请上传有效的商户协议照片，保证画面清晰，内容完整。</div>
            </el-col>
          </div>
        </el-col>
      </el-row>

    </el-form>

    <footer v-if="isUpdate">
      <el-button v-show="active === 0" type="primary" @click="next">下一步</el-button>
      <el-button v-show="active === 1" @click="pre">上一步</el-button>
      <el-button v-show="active === 1" @click="next">完成</el-button>
    </footer>
    <footer v-else>
      <el-button type="primary" @click="next">
        {{active === 1 ? '完成' : '下一步'}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">上一步</el-button>
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
            big_uid: '',
            userid: '',
            user_type: '',
            groupid: '',
            cate: '',
            address: '',
            provice: '',
            city: '',
            email: '',
            mobile: '',
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
            slsm_name: '',
            slsm_uid: ''
          },
          fee_ratios: {
            tenpay_ratio: '',
            alipay_ratio: ''
          },
          bankinfo: {
            bankaccount: '',
            bankProvince: '',
            bankCity: '',
            headbankname: '',
            bankname: '',
            bankuser: '',
            bankcode: '',
            bankmobile: '',
            banktype: '',
            jointime: ''
          },
          vouchers: [],
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
            {required: true, message: '请选择注册商户'}
          ],
          'shopname': [
            {required: true, message: '请输入商户名称'}
            ],
          'name': [
            {required: true, message: '请输入公司名称'}
          ],
          'email': [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        },
        bankRules: {
          'bankaccount': [
            {
              validator: (rule, val, cb) => {
                if(val === '') {
                  cb();
                } else if (!/^[0-9]*$/.test(val)) {
                  cb(new Error('银行卡账户必须是数字'));
                }
              },
              trigger: 'blur'
            }
          ],
          'bankmobile': [
            {
              validator: (rule, val, cb) => {
                if(val === '') {
                  cb();
                } else if (!/^[0-9]*$/.test(val)) {
                  cb(new Error('手机号必须是数字'));
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
            {required: true, message: '请输入业务员账号'}
          ]
        }
        this.getShopTypes()
      }
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
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
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
              this.$message.success('上传成功');
            }else {
              this.voucherInfo[name + '_url'] = '';
              this.$message.error('上传失败')
            }
          }).catch(() => {
            console.log('请求失败');
            this.voucherInfo[name] = '';
          })
        }
      },
      avatarFailed(err, file) {
        this.$message.error(err);
        console.log(file);
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
              this.initSelection()
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
              this.$message.success(this.isUpdate ? '修改成功' : '创建成功')
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
//          this.$refs['bankinfos'].validate((valid) => {
//            if (valid) {
//              console.log(222)
//              this.create()
//            }
//          })
          this.create()
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
              {required: true, message: '请输入连锁店总店UID'}
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
          merchant: '普通子商户',
          bigmerchant: '大商户',
          submerchant: '连锁门店'
        };
        let userTypes = {
          "1": '小微',
          "2": '个体',
          "3": '企业'
        };
        let banktypes = {
          "1": '对私',
          "2": '对公'
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
      padding-right: 75px;
      /*flex-basis: 33.33%;*/
    }
    .el-form {
      background-color: #F7F9FA;
      margin-bottom: 24px;
      padding: 15px 30px 30px 30px;
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
            padding: 0 $smGap;
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
