<template>
  <div class="roleModify">
    <header class="page-header style2">
      <h2 v-if="isEdit" class="page-title">角色修改</h2>
      <h2 v-else class="page-title">{{isUpdate ? '角色详情' : '新建角色'}}</h2>
      <el-button type="text" @click="cancel"><i class="el-icon-close"></i><span>关闭</span></el-button>
    </header>

    <el-form :model="formData" :rules="formrules" ref="form" :disabled="isUpdate && !isEdit">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item v-if="isUpdate" label="角色状态">
        <el-select v-model="formData.status">
          <el-option label="启用" value="1"></el-option>
          <el-option label="关闭" value="9"></el-option>
        </el-select>
      </el-form-item>
      <div class="permsGroupItem" v-for="(perm, index) in formData.perms" :key="index">
        <el-checkbox :indeterminate="perm.isIndeterminate" v-model="perm.checkAll" @change="handleCheckAllChange($event, index)">{{perm.descr}}</el-checkbox>
        <el-checkbox-group v-model="perm.checkedOptions" @change="handleCheckedCitiesChange($event, index)">
          <el-checkbox v-for="item in perm.group" :label="item.code" :key="item.code">{{item.descr}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form>
    <footer>
      <el-button v-if="isUpdate" size="large" @click="cancel">关闭</el-button>
      <el-button v-else size="large" @click="reset">重置</el-button>
      <el-button v-if="isUpdate" type="primary" size="large" @click="update">{{isEdit ? '保存' : '修改'}}</el-button>
      <el-button v-else type="primary" size="large" @click="modify">提交</el-button>
    </footer>
  </div>
</template>

<script>
  import qs from 'qs'
  import config from 'config'
  export default {
    data() {
      return {
        isUpdate: false, // 新建 和 编辑
        isEdit: false, // 修改 和 保存
        roleCode: '',
        formData: {
          status: '',
          name: '', // 角色名称
          perms: [] // 权限
        },
        formrules: {
          'name': [
            {required: true, message: '请输入角色名称'}
          ]
        }
      }
    },
    created() {
      this.isUpdate = this.$route.name === 'roleEdit'
      this.getAllPerms()
    },
    methods: {
      getPerm() {
        let roleInfo = JSON.parse(localStorage.getItem('roleInfo'))
        this.roleCode = this.$route.params.code
        this.formData.status = roleInfo.status.toString()
        this.formData.name = roleInfo.role_name
        this.formData.perms.map((perm, index) => {
          roleInfo.perms.map((item) => {
            if (perm.codes.indexOf(item.code) >= 0) {
              this.formData.perms[index].checkedOptions.push(item.code)
            }
          })
          if (perm.checkedOptions.length === perm.codes.length) {
            this.formData.perms[index].checkAll = true
          } else if (perm.checkedOptions.length >= 1) {
            this.formData.perms[index].isIndeterminate = true
          }
        })
      },
      getAllPerms() {
        this.$http(`${config.host}/org/perm/perms`)
        .then((res) => {
          let data = res.data
          let perms = data.data
          if (data.respcd === '0000') {
            perms.map((item, index) => {
              item.checkAll = false
              item.isIndeterminate = false
              item.checkedOptions = []
            })
            this.formData.perms = perms
            if (this.isUpdate) {
              this.getPerm()
            }
          } else {
            this.$message.error(data.resperr)
          }

        })
      },
      handleCheckAllChange(val, index) {
        let perm = this.formData.perms[index]
        this.formData.perms[index].checkedOptions = val ? perm.codes : []
        this.formData.perms[index].checkAll = val
        this.formData.perms[index].isIndeterminate = false
      },
      handleCheckedCitiesChange(value, index) {
        let perm = this.formData.perms[index]
        let checkedCount = value.length
        perm.checkAll = checkedCount === perm.codes.length
        perm.isIndeterminate = checkedCount > 0 && checkedCount < perm.codes.length
      },
      update() {
        if (!this.isEdit) {
          this.isEdit = true
        } else {
          this.modify()
        }
      },
      modify() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false
          }
        })
        let allCheckedOptions = []
        this.formData.perms.map((item) => {
          allCheckedOptions = allCheckedOptions.concat(item.checkedOptions)
        })
        let params = {
          role_name: this.formData.name,
          perm_codes: allCheckedOptions.toString()
        }
        if (this.isUpdate) {
          params.role_code = this.roleCode
          params.status = this.formData.status
        }
        this.$http({
          method: 'post',
          url: `${config.host}/org/perm/role`,
          data: qs.stringify(params)
        })
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            if (this.isUpdate) {
              this.isEdit = false
              this.$message.success('角色修改成功')
            } else {
              this.$message.success('角色创建成功')
              this.$router.push({name: 'roleList'})
            }
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      reset() {
        this.formData.perms.map((item) => {
          item.checkAll = false
          item.checkedOptions = []
          item.isIndeterminate = false
        })
      },
      cancel() {
        this.$router.push({name: 'roleList'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-header {
    margin-bottom: 20px;
  }
  .roleModify {
    padding: 0 30px 30px;
    background-color: #fff;
  }
  .permsGroupItem {
    margin-bottom: 30px;
  }
  .el-form-item {
    display: inline-block;
    margin-right: 30px;
  }
  .el-checkbox {
    margin: 20px 30px 0 0;
  }
</style>
