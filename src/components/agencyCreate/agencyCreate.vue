<template>
  <div class="agencyCreate">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加渠道</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="createform" :model="formData" label-width="100px">
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select v-model="formData.status" placeholder="请选择级别">
          <el-option label="一级代理" value="shanghai"></el-option>
          <el-option label="二级代理" value="beijing"></el-option>
        </el-select>
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商简称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理区域">
        <el-select v-model="formData.status" placeholder="请选择省">
          <el-option label="省" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="formData.status" placeholder="请选择市">
          <el-option label="市" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="法人">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="法人电话">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="所属业务员">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="登录账号">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>

    <el-form ref="createform" :model="formData" label-width="100px">
      <el-form-item label="账户名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="结算账号">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="总行名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="支付名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联行号">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="IBAN No">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>

    <el-form ref="createform" :model="formData" label-width="100px">
      <el-form-item label="微信支付">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="支付宝">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {

        }
      }
    },
    created() {

    },
    methods: {
      selectChange(val) {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.guoxin {
  color: $baseColor;
  font-size: $xlSize;
}
</style>
