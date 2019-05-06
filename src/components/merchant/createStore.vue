<template>
  <div class="new-store">
    <header class="page-header style2">
      <h2 class="page-title">
        {{this.isUpdate ? $t('shop.newStore.title2') : $t('shop.newStore.title1')}}</h2>
      <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span>
      </el-button>
    </header>
    <el-form :model="storeModel" :rules="storeRules" ref="store-form">
      <h3>{{$t('shop.detail.basic.subtitle')}}</h3>

      <el-form-item prop="shopname" :label="$t('shop.newStore.model.storename')">
        <el-input v-model.trim="storeModel.shopname"></el-input>
      </el-form-item>

      <el-form-item prop="short_name" :label="$t('shop.newStore.model.short_name')">
        <el-input v-model.trim="storeModel.short_name"></el-input>
      </el-form-item>

      <el-form-item prop="address" :label="$t('shop.newStore.model.storeaddress')">
        <el-input v-model.trim="storeModel.address"></el-input>
      </el-form-item>

      <el-form-item prop="telephone" :label="$t('shop.newStore.model.mobile')">
        <el-input
          v-model.trim="storeModel.telephone"
          maxlength="8"
          :disabled="isUpdate"></el-input>
      </el-form-item>

      <el-form-item prop="operating" :label="$t('shop.newStore.model.operation')">
        <el-input v-model.trim="storeModel.operating"></el-input>
      </el-form-item>


      <h3>{{$t('merchant.newMerchant.basic.cap2')}}</h3>
      <el-form-item v-if="!isUpdate">
        <el-select v-model="pid_select" :placeholder="$t('merchant.newMerchant.requiredRule.rule25')">
          <el-option
            v-for="item in list"
            :key="item.chnl_code"
            :label="item.pid_name"
            :value="item.pid_name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!isUpdate" class="el-button el-button--primary" @click="addList()">{{$t('common.confirm')}}</el-button>
      </el-form-item>

      <div class="payList" v-for="item in list_Select" :key="item.value">
        <el-form-item :label="item.pid_name">
          <el-input-number v-model="item.ratio" :precision="2" :step="0.01" :min="Number(item.ratioMin)"></el-input-number>
        </el-form-item>
        <el-form-item v-if="item.line_type !== ''" :label="$t('merchant.newMerchant.form.accessType')">
          <el-select :disabled="true" v-model="item.line_type">
            <el-option :label="$t('merchant.newMerchant.accessTypes.offline')" value="offline"></el-option>
            <el-option :label="$t('merchant.newMerchant.accessTypes.online')" value="online"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.finance_type !== ''" :label="$t('merchant.newMerchant.form.applicationType')">
          <el-select :disabled="true" v-model="item.finance_type">
            <el-option :label="$t('merchant.newMerchant.applicationTypes.direct')" value="direct"></el-option>
            <el-option :label="$t('merchant.newMerchant.applicationTypes.indirect')" value="indirect"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isUpdate" class="icon_remove" style="width:20px;margin-top:25px;">
          <i class="el-icon-remove" @click="pid_name_remove(item.pid_name)"></i>
        </el-form-item>
      </div>

      <h3>{{$t('merchant.detail.rates.setitle')}}</h3>

      <el-form-item prop="bankuser" :label="$t('merchant.newMerchant.form.accountName')">
        <el-input v-model.trim="storeModel.bankuser"></el-input>
      </el-form-item>

      <el-form-item prop="headbankname" :label="$t('merchant.newMerchant.form.accountType')">
        <el-input v-model.trim="storeModel.headbankname"></el-input>
      </el-form-item>

      <el-form-item prop="bankaccount" :label="$t('merchant.newMerchant.form.accountH')">
        <el-input v-model.trim="storeModel.bankaccount" @change="GetRemit"></el-input>
      </el-form-item>

      <el-form-item prop="bankProvince" :label="$t('merchant.newMerchant.form.accountAddress')">
        <el-input v-model.trim="storeModel.bankProvince"></el-input>
      </el-form-item>

      <el-form-item prop="bankcode" :label="$t('common.SWIFT')">
        <el-input v-model.trim="storeModel.bankcode"></el-input>
      </el-form-item>

      <el-form-item prop="remit_amt" :label="$t('merchant.newMerchant.form.moneySettment')">
        <el-input
          v-model.trim="storeModel.remit_amt"
          :disabled="IsRemit"
          maxlength='5'></el-input>
      </el-form-item>

      <h3>{{$t('merchant.detail.document.doctitle')}}</h3>
      <div class="uploaders">
        <!-- 经营场所内景照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
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
        <!-- 经营场所外景照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
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
        <!-- 收银台照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
          v-loading="paypointloading"
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
              format: 'cors',
              enuserid: 'EPeRaNEt'
          }">
          <div v-if="voucherInfo.paypoint_url" class="avatar-wrap">
            <img :src="voucherInfo.paypoint_url" class="avatar">
            <i class="img-tip">{{$t('common.reupload')}}</i>
          </div>
          <div v-else class="avatar-uploader-wrap">
            <i class="avatar-uploader-icon el-icon-plus"></i>
            <div class="avatar-desc">{{$t('shop.newStore.casher')}}</div>
            <div class="avatar-tip">{{$t('common.format')}}</div>
          </div>
        </el-upload>
        <!-- 补充资料照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
          v-loading="otherphotoloading"
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
              format: 'cors',
              enuserid: 'EPeRaNEt'
          }">
          <div v-if="voucherInfo.otherphoto_url" class="avatar-wrap">
            <img :src="voucherInfo.otherphoto_url" class="avatar">
            <i class="img-tip">{{$t('common.reupload')}}</i>
          </div>
          <div v-else class="avatar-uploader-wrap">
            <i class="avatar-uploader-icon el-icon-plus"></i>
            <div class="avatar-desc">{{$t('shop.newStore.other')}}</div>
            <div class="avatar-tip">{{$t('common.format')}}</div>
          </div>
        </el-upload>
        <!-- 补充资料照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
          v-loading="otherphotoloading"
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
              tag: 'otherphoto1',
              format: 'cors',
              enuserid: 'EPeRaNEt'
          }">
          <div v-if="voucherInfo.otherphoto1_url" class="avatar-wrap">
            <img :src="voucherInfo.otherphoto1_url" class="avatar">
            <i class="img-tip">{{$t('common.reupload')}}</i>
          </div>
          <div v-else class="avatar-uploader-wrap">
            <i class="avatar-uploader-icon el-icon-plus"></i>
            <div class="avatar-desc">{{$t('shop.newStore.other1')}}</div>
            <div class="avatar-tip">{{$t('common.format')}}</div>
          </div>
        </el-upload>
        <!-- 补充资料照片上传-->
        <el-upload
          :file-list="storeModel.vouchers"
          v-loading="otherphotoloading"
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
              tag: 'otherphoto2',
              format: 'cors',
              enuserid: 'EPeRaNEt'
          }">
          <div v-if="voucherInfo.otherphoto2_url" class="avatar-wrap">
            <img :src="voucherInfo.otherphoto2_url" class="avatar">
            <i class="img-tip">{{$t('common.reupload')}}</i>
          </div>
          <div v-else class="avatar-uploader-wrap">
            <i class="avatar-uploader-icon el-icon-plus"></i>
            <div class="avatar-desc">{{$t('shop.newStore.other2')}}</div>
            <div class="avatar-tip">{{$t('common.format')}}</div>
          </div>
        </el-upload>
      </div>
    </el-form>
    <footer>
      <el-button @click="next" :disabled="isLoading">{{$t('common.done')}}</el-button>
    </footer>
  </div>
</template>
<script>
  /* eslint-disable */
  import _ from 'lodash';
  import config from 'config';
  import axios from 'axios';
  import qs from 'qs';
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
        pid_select: [],
        list: [],
        list_Select: [],
        isUpdate: false,
        isLoading: false,
        IsRemit: false,
        goodsphotoloading: false,
        shopphotoloading: false,
        paypointloading: false,
        otherphotoloading: false,
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        storeModel: {
          big_uid: '',
          short_name: '',
          shopname: '',
          address: '',
          telephone: '',
          operating: '',
          headbankname: '', // 开户行名称
          bankuser: '', // 开户行
          bankaccount: '', // 银行账号
          bankProvince: '', // 银行地址
          bankcode: '', // SWIFT码
          remit_amt: null, // 结算资金起点
          vouchers: []
        },
        voucherInfo: {
          goodsphoto_url: '', // 经营场所内景照片url
          goodsphoto_name: '',
          shopphoto_url: '',
          shopphoto_name: '',
          paypoint_url: '', // 收银柜台照片url
          paypoint_name: '',
          otherphoto_url: '', // 补充资料照片
          otherphoto_name: '',
          otherphoto1_url: '', // 补充资料照片
          otherphoto1_name: '',
          otherphoto2_url: '', // 补充资料照片
          otherphoto2_name: ''
        },
        storeRules: {
          'shopname': [
            {required: true, message: this.$t('shop.newStore.rule1'), trigger: 'blur'},
            {max: 60, min: 0, message: this.$t('merchant.newMerchant.rule10'), trigger: 'blur'}
          ],
          'short_name': [
            {required: true, message: this.$t('shop.newStore.rule5'), trigger: 'blur'}
          ],
          'address': [
            {required: true, message: this.$t('shop.newStore.rule2'), trigger: 'blur'},
          ],
          'operating': [
            {required: true, message: this.$t('shop.newStore.rule4'), trigger: 'blur'},
          ],
          'telephone': [
            {required: true, message: this.$t('shop.newStore.rule3'), trigger: 'blur'},
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
        }
      }
    },
    created() {
      if (this.$route.query) {
        this.isUpdate = this.$route.query.command === 'edit' || getParams('command') === 'edit';
        this.storeModel.big_uid = this.$route.query.big_uid;
        this.getPid();
        this.isUpdate && this.getStoreInfo();
      }
    },
    methods: {
      getStoreInfo() {
        axios.get(`${config.host}/org/mchnt/sub/info`, {
          params: {
            userid: this.$route.query.userid || getParams('userid'),
            type: 'submerchant',
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.IsRemit = true;

              let da =  data.data;
              Object.assign(this.storeModel, {
                short_name: da.userinfo.short_name,
                shopname: da.userinfo.shopname,
                address: da.userinfo.address,
                telephone: da.userinfo.telephone,
                operating: da.userinfo.operating,
                headbankname: da.bankinfo.headbankname, // 开户行名称
                bankuser: da.bankinfo.bankuser, // 开户行
                bankaccount: da.bankinfo.bankaccount, // 银行账号
                bankProvince: da.bankinfo.bankProvince, // 银行地址
                bankcode: da.bankinfo.bankcode, // SWIFT码
                remit_amt: da.userinfo.remit_amt, // 结算资金起点
              });
              this.list_Select = da.fee_ratios;
              da.vouchers.forEach((item) =>{
                if(~'goodsphoto|shopphoto|paypoint|otherphoto|otherphoto1|otherphoto2'.indexOf(item.name)) {
                  this.storeModel.vouchers.push(item);
                  this.voucherInfo[item.name + '_url'] = item.url;
                  this.voucherInfo[item.name + '_name'] = item.imgname;
                }
              })
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      // 根据银行账号获得
      GetRemit() {
        axios.get(`${config.host}/org/tools/remit_amt`, {
          params: {
            bankaccount: this.storeModel.bankaccount,
            format: 'cors'
          }
        }).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.storeModel.remit_amt = data.data.remit_amt;
            if(data.data.remit_amt !== "") {
              this.IsRemit = true;
            }else {
              this.IsRemit = false;
            }
          }else {
            this.$message.error(data.respmsg);
          }
        })
      },

      cancelHandler() {
        this.$router.push({name: 'shop_manage_list'})
      },
      startAvatarUpload(event, file, fileList) {
        this[file['__ob__'].dep.subs[0].vm.$options.propsData.data.tag + 'loading'] = true;
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
          let _target = _.find(this.storeModel.vouchers, _.matchesProperty('name', file.response.data.tag))
          if (_target) {
            let idx = _.findIndex(this.storeModel.vouchers, function (_target) {
              return _target.name == file.response.data.tag;
            });
            this.storeModel.vouchers[idx].name = file.response.data.tag;
            this.storeModel.vouchers[idx].imgname = file.response.data.name;
            this.storeModel.vouchers[idx].url = file.response.data.url;
          } else {
            this.storeModel.vouchers.push({
              name: file.response.data.tag,
              imgname: file.response.data.name,
              url: file.response.data.url,
            });
          }
        } else {
          this.$message.error(res.resperr);
        }
        this[file['__ob__'].dep.subs[0].vm.$options.propsData.data.tag + 'loading'] = false;
      },
      avatarFailed(err, file) {
        this.$message.error(err);
      },
      checkPhotosIsUpdated() {
        if (!this.voucherInfo.goodsphoto_url) {
          this.$message.error(this.$t('merchant.newMerchant.rule28'));
          return false;
        }
        if (!this.voucherInfo.shopphoto_url) {
          this.$message.error(this.$t('merchant.newMerchant.rule29'));
          return false;
        }
        if (!this.voucherInfo.paypoint_url) {
          this.$message.error(this.$t('shop.newStore.warmcasher'));
          return false;
        }
        return true
      },

      next() {
        if(this.list_Select.length === 0) {
            this.$message.error(this.$t('merchant.newMerchant.requiredRule.rule25'))
        }else {
          this.$refs['store-form'].validate((valid) => { // && this.checkPhotosIsUpdated()
            if (valid) {
              if (this.isUpdate) {
                this.confirm()
              } else {
                this.commit()
              }
            }
          })
        }
      },

      confirm() {
        this.$confirm(this.$t('common.sure'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.commit()
        }).catch(() => {
        })
      },

      commit() {
        let params = Object.assign({}, this.storeModel)
        let url = this.isUpdate ? `${config.host}/org/mchnt/sub/edit` : `${config.host}/org/mchnt/sub/signup`
        params.format = 'cors';
        params.mchnt_ratios = JSON.stringify(this.list_Select);
        if (this.isUpdate) {
          params.type = 'submerchant';
          params.userid = this.$route.query.userid || getParams('userid')
        }
        let converted = _.map(_.cloneDeep(this.storeModel.vouchers), (item) => {
          return _.pick(item, ['name', 'imgname']);
        })
        params.vouchers = {};
        converted.forEach((item) => {
          let vals = _.values(item);
          params.vouchers[vals[0]] = vals[1]
        })
        params.vouchers.enuserid = 'EPeRaNEt';
        params.vouchers = JSON.stringify(params.vouchers);
        this.isLoading = true;
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
                name: 'shopDetail',
                query: {userid: data.data.submchnt_userid, from: (this.isUpdate ? 'edit' : 'new')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
            this.isLoading = false;
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
          this.isLoading = false;
        });
      },

      // 商户自动入网获取通道pid配置信息
      getPid() {
        axios.get(`${config.host}/org/tools/get_pid_info?format=cors`).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.list = res.data.data
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      addList() {
        let pid_select = this.pid_select;
        let pid_select_array = [];
        this.list_Select.forEach(element => {
          pid_select_array.push(element.pid_name)
        })
        this.list.forEach(element => {
          if(pid_select_array.indexOf(pid_select) > -1){
            this.$message.error(this.$t('common.payTip'));
          }else if(element.pid_name === pid_select){
            this.list_Select.push(element)
          }
        })
      },

      // 支付通道点击减号
      pid_name_remove(pid_name) {
        let new_list_select = this.list_Select.filter(element => {
          return element.pid_name !== pid_name
        });
        this.list_Select = new_list_select;
      }
    }
  }
</script>
<style lang="scss">
  .new-store {
    background-color: #fff;
    padding: 0 30px 20px 30px;
    .el-form {
      background-color: #F7F9FA;
      margin-top: 30px;
      margin-bottom: 24px;
      padding: 30px;
      .el-loading-mask {
        width: 300px;
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
          border: 1px dashed #CCCCD5;
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
      .avatar-uploader {
        display: inline-block;
        vertical-align: top;
        margin: 15px 15px 0 0;
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
          padding-top: $smGap
        }
        .avatar-tip {
          color: #bdbdbd;
          font-size: $baseSize;
        }

      }
    }
    .payList {
      .el-form-item {
        width: 220px;
        .el-form-item__content {
          width: 220px;
        }
      }
      .icon_remove {
        .el-form-item__content {
          font-size: 24px;
          .el-icon-remove {
            color: #409EFF;
          }
        }
      }
    }
  }
</style>
