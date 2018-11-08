<template>
  <div class="batch">
    <header class="page-header style2">
      <h2 class="page-title">{{$t('batch.title')}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>{{$t('merchant.detail.basic.close')}}</span></el-button>
    </header>
    <section class="basic">
      <div class="note">
        {{$t('batch.tip.txt')}}
        <el-button type="text" @click="dialogVisible = true">{{$t('batch.tip.ins')}}</el-button>{{$t('batch.tip.and')}}
        <a class="download-temp" href="javascript:void(0)">{{$t('batch.tip.template')}}</a>
        <el-dialog
          :title="$t('batch.tip.title')"
          :visible.sync="dialogVisible"
          width="40%"
          >
          <span>上传说明...</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('batch.tip.close')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <el-form v-loading="isLoading" ref="baseinfo" :model="form" :rules="baseRules">
        <h3>{{$t('batch.cap')}}</h3>
        <el-row>
          <el-col :span="4"><div style="height:90px;"></div></el-col>
          <el-col :span="16">
            <el-form-item prop="exlname" :label="$t('batch.input.cap1')">
              <el-input
                type="text"
                v-model.trim="form.file_name"
                :clearable="true"
              >
                <template slot="append">
                  <el-upload
                    class="upload-demo"
                    :with-credentials="true"
                    :action="uploadExcelInterface"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    :before-upload="beforeExcelUpload"
                    :on-success="avatarSuccess"
                    :on-error="avatarFailed"
                    :limit="1"
                    :file-list="form.fileList"
                    :data="{
                    tag: 'excel',
                    file_name: this.form.filename,
                    format: 'cors'
                  }">
                    <el-button size="small" type="primary"><i class="icon-up"></i>{{$t('batch.up.excel')}}</el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3"><div style="height:90px;"></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div style="height:90px;"></div></el-col>
          <el-col :span="16">
            <el-form-item prop="exlname" :label="$t('batch.input.cap2')">
              <el-input
                type="text"
                v-model.trim="form.filename"
                :clearable="true"
              >
                <template slot="append">
                  <el-upload
                    class="upload-demo"
                    :with-credentials="true"
                    :action="uploadZipInterface"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :show-file-list="false"
                    :on-success="avatarSuccess"
                    :before-upload="beforeZipAvatarUpload"
                    :on-change="handlePreview"
                    :on-error="avatarFailed"
                    :limit="1"
                    :file-list="form.imageList"
                    :data="{
                    tag: 'zip',
                    filename: this.form.filename,
                    content: this.form.contentZip,
                    format: 'cors'
                  }">
                    <el-button size="small" type="primary"><i class="icon-up"></i>{{$t('batch.up.zip')}}</el-button>
                  </el-upload>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3"><div style="height:90px;"></div></el-col>
        </el-row>
      </el-form>
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
        excelloading: false,
        ziploading: false,
        uploadExcelInterface: `${config.host}/org/mchnt/upload_create_file`, // 上传excel接口
        uploadZipInterface: `${config.host}/org/mchnt/upload_batch_package`, // 上传zip接口
        form: {
          filename: '',
          content_excel: '',
          contentZip: '',
          fileList: [],
          imageList: []
        },
        baseRules: {},

      }
    },
    created() {

    },
    methods: {
      cancel() {
        this.$router.push({name: 'mchnt_manage_list'})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file, fileList) {
        debugger;
        if(file.status == 'ready') {
          this.form.filename = file.name.substring(0,file.name.indexOf('.'));
          this.form.contentZip = file;
        }
      },
      beforeRemove(file, fileList) {
//        return this.$confirm(`确定移除 ${ file.name } ？`);
      },
      beforeZipAvatarUpload(file) {
        const isRightImgType = file.type === 'application/zip'
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
        debugger;
        return isRightImgType;
      },
      avatarSuccess(res, file, fileList) {
        let data = res.data;
        debugger;
        if (res.respcd === config.code.OK) {


        } else {
          this.$message.error(res.resperr);
        }
//        this[file['__ob__'].dep.subs[0].vm.data.tag + 'loading'] = false;
      },
      avatarFailed(err, file) {
        this.$message.error(err);
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
            width:112px;
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
    }
  }
</style>
