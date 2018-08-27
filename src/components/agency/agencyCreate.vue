<template>
  <div class="agencyCreate">
    <header class="page-header style2"><h2 class="page-title">添加渠道</h2></header>
    <!-- wait / process / finish / error / success -->
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-form v-show="active === 0" ref="createform" :model="formData">
      <h3>基本信息</h3>
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别" style="width:446px">
        <el-select v-model="formData.status" placeholder="请选择级别">
          <el-option label="一级代理" value="shanghai"></el-option>
          <el-option label="二级代理" value="beijing"></el-option>
        </el-select>
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <hr/>
      <el-form-item label="代理商简称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理区域" style="width:446px">
        <el-select v-model="formData.status" placeholder="请选择省">
          <el-option label="省" value="shanghai"></el-option>
        </el-select>
        <el-select v-model="formData.status" placeholder="请选择市">
          <el-option label="市" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
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

    <el-form v-show="active === 1" ref="createform" :model="formData">
      <h3>结算信息</h3>
      <el-form-item label="账户名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="结算账号">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="总行名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <hr/>
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

    <el-form v-show="active === 2" ref="createform" :model="formData">
      <h3>支付通道信息</h3>
      <el-form-item label="微信支付">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="支付宝">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
    <footer>
      <el-button type="primary" @click="next">
        {{active === 2 ? '完成' : '下一步'}}
      </el-button>
      <el-button v-show="active !== 0" @click="pre">上一步</el-button>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        formData: {

        }
      }
    },
    created() {

    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      pre() {
        if (this.active-- <= 0) this.active = 0;
      },
      selectChange(val) {

      }
    }
  }
</script>

<style scoped lang="scss">
.agencyCreate {
  background-color: #fff;
  padding: 0 30px;
}
.el-form {
  background-color: #F7F9FA;
  margin-bottom: 24px;
  padding: 15px 30px;
  h3 {
    position: relative;
    padding: 12px 0;
    margin: 0 0 20px;
    font-size: 20px;
    color: $titleColor;
    &:after{
      content: '　';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: #232629;
    }
  }
}
.el-form-item {
  display: inline-block;
  vertical-align: top;
  margin-right: 80px;
}
.el-input {
  width: 300px;
}
.el-select {
  width: 140px;
}
.el-steps {
  padding-right: 60px;
}
hr {
  border: none;
  margin: 0;
}
footer {
  padding-bottom: 30px;
}
</style>
