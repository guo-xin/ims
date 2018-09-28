<template>
  <div class="layout" v-loading.fullscreen="loading" :element-loading-text="$t('common.loading')">
    <el-container>
      <el-header>
        <svg width="150px" height="28px" viewBox="0 0 150 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="商户管理" transform="translate(-30.000000, -26.000000)" fill="#2196F3">
              <g id="Nav">
                <g id="Group-15" transform="translate(30.000000, 26.000000)">
                  <g id="logo">
                    <polygon id="Fill-1" points="7.99477986 14.0757357 21.6761643 27.7571201 28.2897989 27.7645952 14.5998181 14.0746144"></polygon>
                    <path d="M81.9562953,14.8196621 L66.530212,14.8196621 L66.530212,10.3988613 L66.530212,5.05375875 L81.9562953,5.05375875 L81.9562953,14.8196621 Z M82.6253208,0.373944136 L65.8563277,0.373944136 C63.667979,0.38291431 61.8589938,2.13508833 61.8500237,4.36230783 L61.8500237,15.5107393 C61.8500237,15.5275584 61.8589938,15.5410136 61.8589938,15.5537214 L61.8589938,27.7718461 L66.530212,27.7718461 L66.530212,19.4912541 L82.6253208,19.4912541 C84.809932,19.4912541 86.6140583,17.7383325 86.6230284,15.5107393 L86.6230284,4.36230783 C86.6140583,2.13508833 84.809932,0.38291431 82.6253208,0.373944136 Z" id="Fill-2"></path>
                    <path d="M32.7245409,1.17658785 C32.2801435,1.59968106 32.0300999,2.2044203 32.0300999,2.81700845 L32.0300999,27.8927566 L36.7050557,27.8927566 L36.7050557,15.0097177 L56.2551765,15.0097177 L56.2551765,10.3467221 L36.7050557,10.3467221 L36.7050557,5.15747639 L56.2551765,5.15747639 L56.2551765,0.494107094 L34.3743054,0.485884434 C33.7609698,0.485884434 33.1566043,0.736301797 32.7245409,1.17658785" id="Fill-4"></path>
                    <path d="M145.050445,0.520157975 L145.050445,12.081965 L129.668091,12.081965 L129.668091,0.520157975 L124.996499,0.520157975 L124.996499,14.4052401 C124.996499,15.0271722 125.243179,15.6225675 125.683091,16.0632273 C126.127489,16.4952907 126.723258,16.7453343 127.331734,16.7453343 L145.050445,16.7453343 L145.050445,23.0405277 L125.23832,23.0405277 L125.23832,27.7113722 L147.386428,27.7113722 C148.00836,27.7113722 148.595159,27.4695512 149.031333,27.0206688 C149.48059,26.580009 149.72241,25.9928363 149.72241,25.3716518 L149.72241,0.520157975 L145.050445,0.520157975 Z" id="Fill-6"></path>
                    <path d="M97.4904692,23.0920315 L112.920664,23.0920315 L112.920664,13.2655794 L97.4904692,13.2655794 L97.4904692,23.0920315 Z M117.59263,12.5834725 L117.59263,3.18048738 C117.59263,2.56715172 117.346323,1.96241248 116.906037,1.53072285 C116.478459,1.09940697 115.865123,0.848242095 115.260758,0.848242095 L92.8618593,0.848242095 L92.8618593,5.52020781 L112.920664,5.52020781 L112.920664,8.60258391 L96.8210699,8.60258391 C94.6416914,8.60258391 92.8368176,10.346909 92.8282212,12.5834725 L92.8282212,23.7913313 C92.8368176,26.0192983 94.6416914,27.7632497 96.8210699,27.7718461 L113.594548,27.7718461 C113.609872,27.7718461 113.62258,27.7632497 113.63753,27.7632497 L120.351332,27.7632497 L120.351332,23.0916577 L117.59263,23.0916577 L117.59263,12.5834725 Z" id="Fill-8"></path>
                    <path d="M6.46424389,23.1353873 C5.47303964,23.1353873 4.67133033,22.3389106 4.67133033,21.3585453 L4.6829168,6.81153913 C4.6829168,5.83080009 5.48499988,5.03507089 6.47583036,5.03507089 L19.0707024,5.05076869 C20.0607854,5.05076869 20.8643635,5.84649789 20.8643635,6.82723694 L20.852777,16.3800987 L20.852777,17.9969726 L25.5146513,22.6588468 L25.5277328,3.91529415 C25.5277328,1.96016993 23.8503102,0.373944136 21.78119,0.373944136 L3.74740239,0.373944136 C1.6775347,0.373944136 0.000112127177,1.96016993 0.000112127177,3.91529415 L0.000112127177,24.2144245 C0.000112127177,26.1785189 1.6775347,27.7718461 3.74740239,27.7718461 L19.3532629,27.7718461 L14.7104503,23.1290335 L6.46424389,23.1353873 Z" id="Fill-13"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div class="desc">{{$t('main.desc')}}</div>
        <div class="sign-in-info">
          <el-row type="flex">
            <el-col :span="16">
              <div class="outer-link-wrap">
                <a href="" class="outer-link">&nbsp;Authorit</a>
                <a href="" class="outer-link">&nbsp;Settlement /</a>
                <a href="" class="outer-link">&nbsp;Agent / </a>
              </div>
            </el-col>
            <el-col :span="5" class="lang-change">
              <el-select v-model="select" @change="selectChange">
                <el-option
                  v-for="item in items"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <div class="sign-out-wrap" @click="logoutHandler">
                 <img class="logout-icon" src="../../assets/common_img/logout.png"/>
                 <span class="logout-txt">{{$t('main.logout')}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <div class="main-frame">
        <el-aside style="width:251px;">
          <el-menu class="menu-wrap"
                   :collapse="isCollapse"
                   text-color="#1D1D24"
                   :unique-opened="true"
                   background-color="#F2F4F5"
                   @select="subMenuSelectedHandler"
                   :default-openeds="subMenuIdxs"
                   :default-active="activeIndex"
          >
            <el-submenu v-if="menu.group.length" :index="menu.index" v-for="menu in menuData"
                        v-bind:key="menu.code">
              <template slot="title">
                <i :class="menuSet[menu.code].icon+' nav-icon'"></i>
                <span slot="title">{{menu.descr}}</span>
              </template>
              <el-menu-item v-for="submenu in menu.group" v-bind:key="submenu.code" :index="submenu.index[1]" :v-if="false" @click="navTo('/main/' + submenu.code)">
                <i class=""></i>
                <span slot="title">{{submenu.descr}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="menu.code==='home'" index="1" class="no-submenu" @click="navTo('/main/' + menu.code)">
              <i :class="menuSet[menu.code].icon+' nav-icon'"></i>
              <span slot="title">
                {{menu.descr}}
              </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from '../../config';
  const navmap = {
      home: ["1"],
      mchnt_manage_list: ["2", "2-1"], // 商户列表
      shop_manage_list: ["2", "2-2"], // 门店列表
      mchnt_audit_list: ["2", "2-3"], // 商户审核
      trade_detail_list: ["3", "3-1"], // 交易明细
      trade_summary_list: ["3", "3-2"], // 交易汇总
      agent_manage_list: ["4", "4-1"],
      clearing_detail_list: ["5", "5-1"], // 清分明细
      clearing_summary_list: ["5", "5-2"], // 清分汇总
      income_report_list: ["5", "5-3"], // 应收报表
      payment_report_list: ["5", "5-4"], // 应付报表
      clearing_template_list: ["5", "5-5"], // 清分模板
      perm_user_list: ["6", "6-1"], // 用户管理
      perm_role_list: ["6", "6-2"] // 角色管理
    }
  export default {
    data() {
      return {
        loading: false,
        select: this.$i18n.locale,
        items: [
          {label: 'English', value: 'en'},
          {label: '简体中文', value: 'zh-CN'}
        ],
        isCollapse: document.body.clientWidth <= 1280,
        activeIndex: "1",
        subMenuIdxs: ["1"],
        menuSet: {
          home: {
            icon: 'home-icon'
          }, // 首页
          mchnt_manage: { // 商户管理
            icon: 'mcht-icon'
          },
          trade_manage: { // 交易管理
            icon: 'trade-icon'
          },
          agent_manage: { // 代理商管理
            icon: 'agent-icon'
          },
          settlement_manage: { // 结算管理
            icon: 'liquidation-icon'
          },
          perm_manage: { // 权限管理
            icon: 'auth-icon'
          }
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      let prePath = from.fullPath.split('/')[2];
      let curPath = to.fullPath.split('/')[2];
      let navarr = navmap[curPath]
      if(prePath !== curPath) {
        this.activeIndex = navarr.length === 2 ? navarr[1] : navarr[0]
      }
      next()
    },
    computed: {
      menuData() {
        return this.$store.state.menuData;
      }
    },
    mounted() {
      window.onresize = (e) => {
        if(document.body.clientWidth <= 1280) {
          this.isCollapse = true
        }else {
          this.isCollapse = false
        }
      }
    },
    created() {
      var me = this;
      this.$store.dispatch('getUserPermission').then(() => {
        let navarr = navmap[location.hash.split('/')[2]]
        if(location.hash.split('/')[2] !== 'home') {
          me.subMenuIdxs = navarr.splice(0, 1);
          me.activeIndex = navarr.length === 2 ? navarr[1] : navarr[0]
        }
      }).catch(() => {
        
      })
    },
    methods: {
      navTo(route) {
        this.$router.push(route)
      },
      selectChange(val) {
        this.$i18n.locale = val;
        sessionStorage.setItem("oasbp_lang", val)
        // 初始化页面及接口数据
        this.$router.go(0);
      },

      subMenuSelectedHandler(index, indexPath) {
//        console.log(index, indexPath)
      },
      router(router) {
        return `/${router}`;
      },
      logoutHandler() {
        this.loading = true;
        axios.post(`${config.host}/org/user/logout?format=cors`)
          .then((res) => {
            let data = res.data;
            this.loading = false;
            if (data.respcd === config.code.OK) {
              // 登出时删除本域cookie
              (new Image()).src = `${config.ohost}/mchnt/set_cookie?sessionid=`;
              localStorage.clear();
              this.$router.push(`/login`);
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.loading = false;
          this.$message.error(this.$t('common.netError'));
        });
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @media screen and (max-width:1280px){
    .layout .main-frame .el-main {margin-left:80px !important;}
    .el-aside {width:80px !important}
  }
  @media screen and (min-width:1281px) {

  }
  .layout {
    .tip-box {
      with: 340px;
      height: auto;
    }
    .el-header {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      display:flex;
      align-items: center;
      background-color:#ffffff;
      font-size:$xlSize;
      .desc {
        width:214px;
        height:34px;
        border-left:1px solid #717283;
        margin-left:30px;
        padding:0 15px;
        color:rgba(29,29,36,1);
        line-height:1;
      }
      .sign-in-info {
        flex:1;height:100%;
        .el-row {
          height:80px;align-items: center;
          .outer-link-wrap {
            .outer-link {float:right;text-decoration: none;color:#1D1D24;}
          }
          .lang-change {
            padding: 0 20px;
            min-width: 150px;
          }
          .sign-out-wrap {
            display: flex;
            align-items: center;
            cursor:pointer;
            .logout-icon {
              width:$xlSize;
              height:$xlSize;
              display: inline-block;
              margin-right:10px;
            }
            .logout-txt {
              font-size:$lgSize;
              color:rgba(113,114,131,1);
              font-weight: 100;
            }
          }
        }

      }
    }
    .main-frame {
      /*min-height: 600px;*/
      .menu-wrap {
        padding-bottom: 100px;
      }
      .menu-wrap:not(.el-menu--collapse) {
        width: 251px;
      }
      .el-main {
        margin-left: 246px;
        padding-top: 100px;
      }
      .el-aside {
        width:251px;
        padding-top: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        position: fixed;
        top: 80px;
        left: 0;
      }
      .el-menu {
        padding-left:15px;
        border:none;
        .el-menu-item {position:relative;}
        .el-menu-item > a {
          text-decoration: none;
          font-size:$lgSize;
          color:$submenu-font-color;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          padding-left: 68px;
        }
        .el-menu--inline .el-menu-item > a {
          color:$submenu-font-color;
        }
        .el-menu-item.no-submenu > a{
          padding: 1px 0 0 51px;
          font-size: 16px;
          color: rgb(29, 29, 36);
        }
        .el-submenu__title:hover,.el-menu-item {
          background:transparent !important;
          border-radius:2px;
        }
        .el-menu-item.is-active {
          background:$menu-item-active-bg !important;
          border-radius:2px;
          .home-icon {
            background:url(../../assets/common_img/home_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
        }
        .el-menu-item:hover {
          background:$submenu-bg-color-hover !important;
          border-radius:2px;
          .home-icon {
            background:url(../../assets/common_img/home_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
        }
        .el-submenu .el-submenu__title:hover {
          .mcht-icon {
            background:url(../../assets/common_img/mcht_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
          .trade-icon {
            background:url(../../assets/common_img/trade_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
          .liquidation-icon {
            background:url(../../assets/common_img/liquidation_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
          .agent-icon {
            background:url(../../assets/common_img/agent_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
          .auth-icon {
            background:url(../../assets/common_img/auth_light.png) 0 0 no-repeat transparent;
            background-size: contain;
          }
        }

        .el-submenu .el-menu-item.is-active {
          background-color:$menu-item-active-bg !important;
          border-radius:2px;
        }
        .el-submenu .el-menu-item.is-active > a {
          color:$submenu-font-color-selected !important;
        }
        .el-submenu .el-submenu__title > span, .el-menu-item > span{
          font-size: $lgSize;
        }
        .el-submenu .nav-icon, .el-menu-item .nav-icon {
          width:24px;
          height:24px;
          margin-right:5px;
          display: inline-block;
        }
        .home-icon {
          background:url(../../assets/common_img/home.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
        .mcht-icon {
          background:url(../../assets/common_img/mcht.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
        .trade-icon {
          background:url(../../assets/common_img/trade.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
        .liquidation-icon {
          background:url(../../assets/common_img/liquidation.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
        .agent-icon {
          background:url(../../assets/common_img/agent.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
        .auth-icon {
          background:url(../../assets/common_img/auth.png) 0 0 no-repeat transparent;
          background-size: contain;
        }
      }
    }
  }
</style>
