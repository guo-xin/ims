<template>
  <div class="login">
      <div class="login-wrap">
        <img class="logo" src="../../assets/common_img/logo.png"/>
        <div class="cap">
          {{$t('login.cap1')}} <br/>
          {{$t('login.cap2')}}
        </div>
        <div class="desc">
          {{$t('login.desc')}}
        </div>
        <el-form ref="form-login"  :model="form" label-width="0px" class="form-login" :rules="rules">
          <el-form-item label="Phone Number or E-mail" prop="username">
            <el-input v-model="form.username" :clearable="true" @focus="addNameBorder" @blur="removeNameBorder" :class="isNameBorder?'hasBorderBottom':''"></el-input>
          </el-form-item>

          <el-form-item :label="$t('login.passph')" prop="password">
            <el-input v-model="form.password"  type="password" :clearable="true" @focus="addPassBorder" @blur="removePassBorder" :class="isPassBorder?'hasBorderBottom':''"></el-input>
          </el-form-item>

          <el-form-item label="" prop="checkbox">
            <el-checkbox v-model="form.checkbox">{{$t('login.checkbox')}}</el-checkbox>
            <span style="float:right" class="link-wrap">
              <router-link :to="{ name: 'forgetPassword'}" class="forget">{{$t('login.checkbox')}}</router-link>
            </span>
          </el-form-item>

          <el-form-item>
            <div class="panel-header-btn submit-btn" @click="submitHandler">
              <span class="el-icon-loading" v-if="loading"></span>
              <span v-else>{{$t('login.btn')}}</span>
            </div>
          </el-form-item>
        </el-form>

      </div>
  </div>
</template>
<script>
  import ElFormItem from "../../../node_modules/qfpay-element-ui/packages/form/src/form-item.vue";
  import ElButton from "../../../node_modules/qfpay-element-ui/packages/button/src/button.vue";
  import axios from 'axios';
  import qs from 'qs';
  import config from 'config';

  const getCookie = (sName) => {
    var aCookie = document.cookie.split(';')

    for (let sCookie of aCookie) {
      var aCrumb = sCookie.split('=')
      if (sName == aCrumb[0].replace(/(^\s*)|(\s*$)/g, '')) {
        return (aCrumb[1])
      }
    }
    return null
  }
  export default {
    components: {
      ElButton,
      ElFormItem},
    data () {
      return {
        form: {
          username: '',
          password: '',
          checkbox: false
        },
        isNameBorder: false,
        isPassBorder: false,
        loading: false,
        rules: {
          username: [
            { required: true, message: this.$t('login.msg.m1') }
          ],
          password: [
            { required: true, message: this.$t('login.msg.m2') }
          ]
        }
      }
    },
    computed: {

    },

    methods: {
      addNameBorder() {
        this.isNameBorder = true;
      },
      removeNameBorder() {
        this.isNameBorder = false;
      },
      addPassBorder() {
        this.isPassBorder = true;
      },
      removePassBorder() {
        this.isPassBorder = false;
      },
      submitHandler() {
        this.$refs['form-login'].validate((valid) => {
          if(!this.loading && valid) {
            let params;
            params = {
              username: this.form.username,
              password: this.form.password,
              format: 'cors'
            };
            this.loading = true;
            console.log(config)
            axios.post(`${config.host}/org/user/login`, qs.stringify(params), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res) => {
              this.loading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                // 当前域名下设置cookie
                let bicon = new Image();
                let sid = getCookie('sessionid') || '';
                if(sid) {
                  bicon.style.display = 'none';
                  bicon.src = `${config.ohost}/mchnt/set_cookie?sessionid=${sid}`;
                }

                this.$router.push('/main');
              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.loading = false;
              this.$message.error(this.$t('login.msg.m3'));
            });
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  body {
    background-color: #f7f7f7;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .login {
    width:100%;
    height:100%;
    background: url(../../assets/common_img/login-bg.png) 100% 100% no-repeat transparent;
    background-size: cover;
    position: relative;
    .login-wrap {
      width:519px;
      color:#ffffff;
      position: absolute;
      top:20%;
      left:23.4375%;
      .logo {
        display:inline-block;
        width:192px;
        height:36px;
        margin-bottom:40px;
      }
      .cap {
        width:519px;font-size:32px;line-height: 1;padding-bottom: 14px;font-weight: 600;
      }
      .desc {
        width:355px;
        height:74px;
        font-size:16px;
        color:rgba(255,255,255,1);
        line-height:1.3;
        font-weight: 100;
      }
      .form-login {
        width:415px;color:#ffffff;
        .link-wrap > a {
          text-decoration: none;
          color:#ffffff;
        }
        .el-form-item {    margin-bottom: 24px;width: 100%;}
        .el-form-item__label {
          color: #ffffff;
          font-size:12px;opacity:0.6;
          line-height:16px;
          padding-left:0;
        }
        .el-form-item__label:before,.el-form-item__label:after {
          content: '';
        }
        .el-form-item__content {
          line-height: 32px !important;
          .el-input {
            border-bottom: 1px solid #ffffff;
            .el-input__inner {
              border:none !important;
              padding: 0 !important;
              color: #ffffff !important;
              font-size:22px;
              line-height:1;
              height: 24px !important;
            }
          }
          .hasBorderBottom {
            border-bottom: 1px solid rgba(93,217,255,1) !important;
          }
        }
        .el-checkbox__inner {
          background-color:transparent;
          width: 18px;
          height: 18px;
          -webkit-transition:none;
          transition: none;
          border: 1px solid #5DD9FF;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          border: 1px solid #5DD9FF;
        }
        .el-checkbox__inner::after {
          border:none;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner::after {
          border: 2px solid #5DD9FF;
          border-left: 0;
          border-top: 0;
          width: 5px;
          height: 9px;
          left: 4px;
          top: 1px;
        }
        .el-checkbox {color:#ffffff;}
        .el-checkbox__input.is-checked+.el-checkbox__label {
          color:#ffffff;
        }
        .submit-btn {
          width:179px;height:40px;background-color:#FFD641;color:#3578FF;font-size:20px;border-radius:4px;display:flex;
          justify-content: center;align-items: center;cursor:pointer;
        }
        .el-form-item__error {color:#C8001B;}
      }
    }
  }
</style>
