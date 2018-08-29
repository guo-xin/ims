<template>
  <div class="roleCreate">
    <el-form :model="formData">
      <el-form-item label="角色名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <div class="permsGroupItem" v-for="(perm, index) in formData.perms" :key="index">
        <el-checkbox :indeterminate="perm.isIndeterminate" v-model="perm.checkAll" @change="handleCheckAllChange($event, index)">{{perm.descr}}</el-checkbox>
        <el-checkbox-group v-model="perm.checkedOptions" @change="handleCheckedCitiesChange($event, index)">
          <el-checkbox v-for="item in perm.group" :label="item.code" :key="item.code">{{item.descr}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form>
    <footer>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="reset">重置</el-button>
    </footer>
  </div>
</template>

<script>
  import config from 'config'
  export default {
    data() {
      return {
        formData: {
          perms: [] // 权限
        }
      }
    },
    created() {
      this.getAllPerms()
    },
    methods: {
      getAllPerms() {
        this.$http(`${config.host}/org/perm/perms`)
        .then((res) => {
          let data = res.data.data
          data.map((item, index) => {
            item.checkAll = false
            item.isIndeterminate = false
            item.checkedOptions = []
          })
          this.formData.perms = data
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
      reset() {
        this.formData.perms.map((item) => {
          item.checkAll = false
          item.checkedOptions = []
          item.isIndeterminate = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .permsGroupItem {
    margin-bottom: 30px;
  }
</style>
