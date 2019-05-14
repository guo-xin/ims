<template>
  <div class="new-salesman">
    <header class="page-header style2">
      <h2 class="page-title">
        {{this.isUpdate ? $t('salesman.newsale.title2') : $t('salesman.newsale.title1')}}</h2>
      <el-button type="text" @click="cancelHandler"><i class="el-icon-close"></i><span>{{$t('common.close')}}</span>
      </el-button>
    </header>
    <el-form :model="salesModel" :rules="salesRules" ref="sales-form">
      <h3>{{$t('salesman.newsale.cap1')}}</h3>

      <el-form-item :label="$t('merchant.newMerchant.form.channel')" prop="salesModel" v-if="!isUpdate">
        <el-select v-model="salesModel.primary_uid" @change="getChannelList(salesModel.primary_uid, true)">
          <el-option v-for="item in channels1" :label="item.name" :value="item.qd_uid"  :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('merchant.newMerchant.form.channel2')" prop="secondary_uid" v-if="!isUpdate">
        <el-select v-model="salesModel.secondary_uid" :placeholder="$t('merchant.form.ph')">
          <el-option v-for="item in channels2" :label="item.name" :value="item.qd_uid"  :key="item.qd_uid"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="qd_name" :label="$t('merchant.detail.basic.la1')" v-if="isUpdate">
        <el-input v-model.trim="salesModel.qd_name" disabled></el-input>
      </el-form-item>

      <el-form-item prop="salesname" :label="$t('salesman.newsale.model.salesname')">
        <el-input v-model.trim="salesModel.salesname"></el-input>
      </el-form-item>

      <el-form-item prop="email" :label="$t('salesman.newsale.model.email')">
        <el-input v-model.trim="salesModel.email" :disabled="isUpdate"></el-input>
      </el-form-item>

      <el-form-item prop="mobile" :label="$t('salesman.newsale.model.mobile')">
        <el-input v-model.trim="salesModel.mobile" :disabled="isUpdate"></el-input>
      </el-form-item>

      <el-form-item prop="idnumber" :label="$t('salesman.newsale.model.idnumber')">
        <el-input v-model.trim="salesModel.idnumber"></el-input>
      </el-form-item>

      <el-form-item prop="password" :label="$t('salesman.newsale.model.password')">
        <el-input v-model.trim="salesModel.password" auto-complete="new-password" type="password"></el-input>
      </el-form-item>

      <el-form-item prop="confirm_password" :label="$t('salesman.newsale.model.confirm_password')">
        <el-input v-model.trim="salesModel.confirm_password" auto-complete="new-password" type="password"></el-input>
      </el-form-item>

      <el-form-item :label="$t('salesman.newsale.model.status')" prop="status" v-if="isUpdate">
        <el-select v-model="salesModel.status">
          <el-option :label="$t('salesman.engaged')" value="0"></el-option>
          <el-option :label="$t('salesman.retired')" value="1"></el-option>
        </el-select>
      </el-form-item>
      <h3>{{$t('salesman.newsale.cap2')}}</h3>
      <el-row>
        <el-col :span="24">
          <div class="uploader-wrap">
            <!-- 身份证正面照-->
            <el-col :span="7" class="up-item">
              <el-upload
                :file-list="salesModel.vouchers"
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
                  <div class="avatar-desc">{{$t('salesman.newsale.pic1')}}</div>
                  <div class="avatar-tip">{{$t('common.format')}}</div>
                </div>
              </el-upload>
              <div class="image_info">{{$t('salesman.newsale.pic1warn')}}</div>
            </el-col>

          </div>
        </el-col>
      </el-row>
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
        isUpdate: false,
        isLoading: false,
        idcardfrontloading: false,
        channels1: [],
        channels2: [],
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        salesModel: {
          qd_name: '',
          primary_uid: '',
          secondary_uid: '',
          salesname: '',
          mobile: '',
          email: '',
          password: '',
          confirm_password: '',
          idnumber: '',
          idcardfront: '',
          status: ''
        },
        voucherInfo: {
          idcardfront_url: '', // 证件照正面照片url
          idcardfront_name: '',
        },
        salesRules: {
          'salesname': [
            {required: true, message: this.$t('salesman.newsale.rule1'), trigger: 'blur'},
            {max: 20, min: 0, message: this.$t('salesman.newsale.rule2'), trigger: 'blur'}
          ],
          'email': [
            {required: true, message: this.$t('salesman.newsale.rule3'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)) {
                  cb(new Error(this.$t('salesman.newsale.rule11')));
                } else {
                  cb();
                }
              }
            }
          ],
          'password': [
            {required: true, message: this.$t('salesman.newsale.rule4'), trigger: 'blur'},
            {max: 18, min: 0, message: this.$t('salesman.newsale.rule5'), trigger: 'blur'}
          ],
          'confirm_password': [
            {required: true, message: this.$t('salesman.newsale.rule6'), trigger: 'blur'},
            {max: 18, min: 0, message: this.$t('salesman.newsale.rule7'), trigger: 'blur'}
          ],
          'mobile': [
            {required: true, message: this.$t('salesman.newsale.rule8'), trigger: 'blur'},
            {max: 11, min: 0, message: this.$t('salesman.newsale.rule9'), trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (!/^[0-9]*$/.test(val) && val != '') {
                  cb(new Error(this.$t('salesman.newsale.rule10')));
                } else {
                  cb();
                }
              }
            }
          ],
          'idnumber': [
            {required: true, message: this.$t('salesman.newsale.rule12'), trigger: 'blur'},
            {max: 20, min: 0, message: this.$t('salesman.newsale.rule13'), trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.$route.query) {
        this.isUpdate = this.$route.query.command === 'edit' || getParams('command') === 'edit';
        if(this.isUpdate) {
          this.getSalesInfo();
        } else {
          this.getChannelList();
        }
      }
    },
    methods: {
      // 获取1,2级渠道列表
      getChannelList(val, flag) {
        if(flag && !val) {
          this.channels2 = [];
          this.salesModel.secondary_uid = ''
        } else {
          axios.get(`${config.host}/org/tools/qudao/list`, {
            params: {
              groupid: val,
              format: 'cors'
            }
          })
            .then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                if(flag) {
                  this.channels2 = data.data.list;
                  this.salesModel.secondary_uid = ''
                }else {
                  this.channels1 = data.data.list;
                }

              } else {
                this.$message.error(data.respmsg);
              }
            }).catch(() => {
            this.$message.error(this.$t('common.netError'));
          });
        }

      },

      getSalesInfo() {
        axios.get(`${config.host}/org/salesman/info`, {
          params: {
            userid: this.$route.query.userid || getParams('userid'),
            format: 'cors'
          }})
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.salesModel.qd_name = data.data.qd_name;
              this.salesModel.salesname = data.data.salesname;
              this.salesModel.mobile = data.data.mobile;
              this.salesModel.email = data.data.email;
              this.salesModel.idnumber = data.data.idnumber;
              this.salesModel.status = data.data.status + '';
              this.salesModel.password = data.data.password
              this.salesModel.ctime = data.data.ctime;
              this.salesModel.userid = data.data.userid
              this.voucherInfo.idcardfront_url = data.data.idcardfront
              this.voucherInfo.idcardfront_name = data.data.idcardfront.substring(data.data.idcardfront.lastIndexOf('/') + 1)

            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },
      cancelHandler() {
        this.$router.push({name: 'salesList'})
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
        } else {
          this.$message.error(res.resperr);
        }
        this[file['__ob__'].dep.subs[0].vm.$options.propsData.data.tag + 'loading'] = false;
      },
      avatarFailed(err, file) {
        this[file['__ob__'].dep.subs[0].vm.$options.propsData.data.tag + 'loading'] = false;
        this.$message.error(err);
      },
      checkPhotosIsUpdated() {
        if (!this.voucherInfo.idcardfront_url) {
          this.$message.error(this.$t('salesman.newsale.tip'));
          return false;
        }
        return true
      },
      next() {
        if (this.isUpdate) {
          this.salesRules.password = [];
          this.salesRules.confirm_password = [];
        }
        this.$refs['sales-form'].validate((valid) => {
          if (valid && this.checkPhotosIsUpdated()) {
            if (this.isUpdate) {
              this.confirm()
            } else {
              this.commit()
            }
          }
        })
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
      // 提交
      commit() {
        let params = Object.assign({}, this.salesModel)
        let url = this.isUpdate ? `${config.host}/org/salesman/edit` : `${config.host}/org/salesman/signup`
        params.format = 'cors';

        if (this.isUpdate) {
          params.userid = this.salesModel.userid;
          delete params.mobile;
          delete params.email;
        }else {
          delete params.status;

          params.qd_uid = params.secondary_uid || params.primary_uid;

        }

        delete params.qd_name;
        delete params.primary_uid;
        delete  params.secondary_uid;

        params.idcardfront = this.voucherInfo.idcardfront_name
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
                name: 'salesDetail',
                query: {userid: data.data.userid, from: (this.isUpdate ? 'edit' : 'new')}
              })
            } else {
              this.$message.error(data.respmsg);
            }
            this.isLoading = false;
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
          this.isLoading = false;
        });
      }
    }
  }
</script>
<style lang="scss">
  .new-salesman {
    background-color: #fff;
    padding: 0 30px 20px 30px;
    .el-form {
      background-color: #F7F9FA;
      margin-top: 30px;
      margin-bottom: 24px;
      padding: 30px;
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
          width: 300px;
          height: 214px;
          display: block;
        }
        .img-tip {
          width: 300px;
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
