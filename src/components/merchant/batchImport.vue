<template>
  <div class="batch" v-loading="isLoading">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('batch.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('merchant.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="note">
        {{$t('batch.tip.txt')}}
        <el-button type="text" @click="dialogVisible = true">{{$t('batch.tip.ins')}}</el-button>&nbsp;{{$t('batch.tip.and')}}
        <a class="download-temp" href="javascript:void(0)" @click="downloadTemp()">{{$t('batch.tip.template')}}</a>
        <el-dialog
          :title="$t('batch.tip.title')"
          :visible.sync="dialogVisible"
          width="40%"
          >
          <div class="tip-para">{{$t('batch.manual1')}}</div>
          <div class="tip-para">{{$t('batch.manual2')}}</div>
          <div class="tip-para">{{$t('batch.manual3')}}</div>
          <span slot="footer">
            <el-button @click="dialogVisible = false">{{$t('batch.tip.close')}}</el-button>
          </span>
        </el-dialog>
      </div>
        <el-dialog
          :title="$t('batch.tip.title_error')"
          :visible.sync="errorVisible"
          width="30%"
          >
          <div class="tip-para" v-for="item in error_info">{{item}}</div>
          <span slot="footer">
            <el-button @click="errorVisible = false">{{$t('common.confirm')}}</el-button>
          </span>
        </el-dialog>
      <el-form ref="baseinfo" :model="form">
        <h3>{{$t('batch.cap')}}</h3>
        <el-row>
          <el-col :span="4">
            <div style="height:90px;" ></div></el-col>
          <el-col :span="16">
            <el-form-item prop="excel_name" :label="$t('batch.input.cap1')">
              <el-input
                type="text"
                v-model.trim="form.excel_name"
                :clearable="true"
                @clear="clearExcelName"
              >
                <template slot="append">
                  <el-upload
                    class="upload-demo"
                    :with-credentials="true"
                    :action="uploadExcelInterface"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    :before-upload="beforeExcelUpload"
                    :on-remove="handleRemove"
                    :http-request="myUploadFn"
                    :data="{
                    tag: 'excel',
                    format: 'cors'
                  }">
                    <el-button size="small" :loading="excelLoading" type="primary"><i class="icon-up"></i>{{$t('batch.up.excel')}}</el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3"><div style="height:90px;"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div style="height:90px;"></div>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="zip_name" :label="$t('batch.input.cap2')">
              <el-input
                type="text"
                v-model.trim="form.zip_name"
                :clearable="true"
                @clear="clearZipPackage"
              >
                <template slot="append">
                  <el-upload
                    class="upload-demo"
                    :with-credentials="true"
                    :action="uploadZipInterface"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    :before-upload="beforeZipUpload"
                    :on-remove="handleRemove"
                    :http-request="myUploadFn"
                    :data="{
                    tag: 'zip',
                    format: 'cors'
                  }">
                    <el-button size="small" :loading="zipLoading" type="primary"><i class="icon-up"></i>{{$t('batch.up.zip')}}</el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3"><div style="height:90px;"></div></el-col>
        </el-row>
      </el-form>
      <footer>
        <el-button @click="commitHandler" :disabled="excelLoading || zipLoading">{{$t('batch.commit')}}</el-button>
      </footer>
    </section>
  </div>
</template>
<script>
  /* eslint-disable */
  import config from 'config'
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data() {
      return {
        isLoading: false,
        dialogVisible: false,
        errorVisible: false,
        excelLoading: false,
        zipLoading: false,
        uploadExcelInterface: `${config.host}/org/mchnt/upload_create_file`, // 上传excel接口
        uploadZipInterface: `${config.host}/org/mchnt/upload_batch_package`, // 上传zip接口
        form: {
          excel_name: '',
          zip_name: '',
          fileid: '',
          dir_name: '',
          file_name_new: ''
        },
        lang: '',
        error_info: []
      }
    },
    created() {
      this.lang = sessionStorage.getItem("oasbp_lang") || 'en-us';
    },
    methods: {
      // 提交
      commitHandler() {
        if(!this.form.fileid) {
          this.$message.error(this.$t('batch.rule1'))
          return;
        }
//         if(!this.form.file_name_new) {
//           this.$message.error(this.$t('batch.rule2'))
//           return;
//         }
        this.isLoading = true;
        let param = {
          fileid: this.form.fileid,
          dir_name: this.form.dir_name,
          file_name_new: this.form.file_name_new,
          format: 'cors'
        };
        console.log('commit param:', param);
        axios.post(`${config.host}/org/mchnt/mchnt_batch_create`,qs.stringify(param), {
        }).then((res) => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.$message.success(this.$t('common.createSuccess'))
            this.$router.push({
              name: 'mchnt_manage_list',
            })
          }else {
            this.$message.error(data.respmsg)
          }
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        })
      },

      clearExcelName() {
        this.form.fileid = '';
      },

      downloadTemp() {
        let params = {
         model: 'signup',
         cate: 'merchant',
         lang: this.lang,
        };
        let downUrl = `${config.host}/org/mchnt/signup/download_batch_template?${qs.stringify(params)}`;
        let a = document.createElement('a');
        a.setAttribute('download', 'true');
        a.setAttribute('href', downUrl);
        a.setAttribute('target', '_self');
        document.body.appendChild(a);
        a.click();
        a.remove();
      },

      clearZipPackage() {
        this.form.dir_name = '';
        this.form.file_name_new = '';
      },
      cancel() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      handleRemove(file, fileList) {
      },
      myUploadFn(data) {
        let formData = new FormData();
        let tag = data.data.tag;
        let reqUrl = tag === 'zip' ? this.uploadZipInterface : this.uploadExcelInterface;
        this[tag + 'Loading'] = true;

        let blob = new Blob([data.file]);
        formData.append("content", blob);
        formData.append("file_name", data.file.name.substring(0,data.file.name.indexOf('.')));
        formData.append("format", "cors");
        if(tag === 'excel') {
          this.form.excel_name = data.file.name
        }else {
          this.form.zip_name = data.file.name
        }
        axios.post(reqUrl,formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          let data = res.data;
          this[tag + 'Loading'] = false;
          if (data.respcd === config.code.OK) {
          if(data.data.error_info.length > 0){
           this.error_info = data.data.error_info;
           this.errorVisible = true;
          console.log("error",data.data.error_info);
          }else {
           if(tag === 'excel') {
              this.form.fileid = data.data.fileid;
              this.form.total_cnt = data.data.total_cnt;
            }else {
              this.form.dir_name = data.data.dir_name;
              this.form.file_name_new = data.data.file_name_new;
            }
          console.log('upload done:', this.form)
          }
          }else {
            this.$message.error(data.respmsg)
          }
        }).catch(() => {
          this[tag + 'Loading'] = false;
        })
      },
      beforeRemove(file, fileList) {
//        return this.$confirm(`确定移除 ${ file.name } ？`);
      },
      beforeZipUpload(file) {
        const isRightImgType = file.type === 'application/zip' || file.type === 'application/x-zip-compressed'
        if (!isRightImgType) {
          this.$message.error(this.$t('merchant.newMerchant.rule33'));
        }
        return isRightImgType;
      },
      beforeExcelUpload(file) {
        const isRightImgType = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        || file.type === 'application/vnd.ms-excel' || file.type === 'application/x-xls';
        if (!isRightImgType) {
          this.$message.error(this.$t('merchant.newMerchant.rule31'));
        }
        return isRightImgType;
      }
    }
  }
</script>
<style lang="scss">
  .batch {
    background-color: #fff;
    padding: 0 $baseGap $baseGap $baseGap;
    footer {
      padding-top: $baseGap;
    }
    .basic {
      .note {
        padding: $miderGap 0 $baseGap 0;
        font-size: 18px;
        color:#1D1D24;
        .el-button--text {
          font-size: 18px;
        }
        .download-temp {
          color:#2974FF;
          text-decoration: none;
          font-weight: 500;
        }
      }
      .el-form {
        background-color: rgba(247,249,250,1);
        padding-bottom: 150px;
        h3 {
          position: relative;
          padding: $baseGap 0 $miderGap 0;
          margin: 0 0 $baseGap $baseGap;
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
      }
      .el-form-item__content {
        height: 60px;width:860px;
        .el-input {
          background-color: #ffffff;
          height: 60px;width:760px;
          border-radius: 9px;
          box-shadow:3px 6px 8px 0px rgba(142,169,190,0.1);
          .el-input-group__append {
            width:146px;
          }
          .icon-up {
            display:inline-block;
            vertical-align: bottom;
            margin-right: 8px;
            width:18px;
            height:16px;
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAAABGdBTUEAALGPC/xhBQAAAUtJREFUWAntmE1uwjAQhd9YIQfoDqkXoItyhR6qyhY23UQ9B70GV4AFXKCQVXuBItyZloDiUBzHwUGVRxolnkT25+c/jQlsj5m+/9LIofHExaHEAloBwnxAyJY5vZPA7PZYaOAuIEStKQI+E4Vx8qNMzzBCJ4IIizoMU424lwBPGcUNh54zl/o6FKCbsghkG47E/GH9SrwCw9noWfMCO1kcspMW59/+p0IPmZ6Kn++zW9RbIQHRe0zEu4DyAiphSg26gGoNZMJ0BdUK6C+YLqCcgWwwvlBOQE1hfKAaA7nCtIWqnWVlReZzldOUY+IVM88i37OwsUIViisWIpBN3KhQVMimgO277EMF+zE3M/cVswLXfcZWX6V+wlZJol8J9ljg7GKu5NZBEv0eOX6bJnwMUmRKrkDk1oGVeuMvMnyhreDEa5amGC9eaPMNDkt9417u9SkAAAAASUVORK5CYII=) 0 0 no-repeat transparent;
            background-size: 18px 16px;
          }
          .el-input__inner {
            height: 60px !important;
          }
          .upload-demo {
            color: #2196F3;
          }
        }
      }
      .tip-para {
        padding: 10px 25px;
        font-size: 16px;
      }
    }
  }
</style>
