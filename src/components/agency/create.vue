<template>
  <div class="agencyCreate">
    <header class="page-header style2"><h2 class="page-title">添加渠道</h2></header>
    <el-steps :active="active" finish-status="finish">
      <el-step title="基本信息"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>

    <el-form v-show="active === 0" v-loading="isLoading" ref="createform" :model="formData">
      <h3>基本信息</h3>
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别" style="width:446px">
        <el-select v-model="formData.status">
          <el-option v-for="level in levels" :label="level.text" :value="level.code" :key="level.code"></el-option>
        </el-select>
        <el-select v-model="formData.status">
          <el-option label="一级代理" value="shanghai"></el-option>
          <el-option label="二级代理" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <hr/>
      <el-form-item label="代理商简称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理区域" style="width:446px">
        <el-select v-model="formData.province" @change="selectProvince" placeholder="请选择省">
          <el-option v-for="province in areas" :label="province.areaname" :value="province.areaid" :key="province.areaid"></el-option>
        </el-select>
        <el-select v-model="formData.city" placeholder="请选择市">
          <el-option v-for="city in citys" :label="city.cityname" :value="city.cityid" :key="city.cityid"></el-option>
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
  import config from 'config'
  export default {
    data() {
      return {
        isLoading: false,
        active: 0, // 当前步骤
        formData: {
          province: '',
          city: ''
        },
        levels: [], // 代理商级别
        areas: [], // 所有省份和城市
        citys: [] // 当前省的所有城市
      }
    },
    created() {
      this.fetchAgencyLevel()
      this.fetchSalesman()
      this.fetchCity()
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      pre() {
        if (this.active-- <= 0) this.active = 0;
      },
      selectProvince(value) {
        console.log('selectProvince')
        this.areas.map((area, index) => {
          console.log(area.areaid)
          if (area.areaid === value) {
            this.citys = area.cities
          }
        })
        this.formData.city = ''
        console.log(this.citys)
      },
      fetchAgencyLevel() {
        this.isLoading = true
        this.$http(`${config.host}/org/v1/api/tools/level`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.levels = data.data.records
          } else {
            this.$message.error(data.resperr)
          }
        })
      },
      fetchSalesman() {
        this.isLoading = true
        this.$http(`${config.host}/org/v1/api/tools/slsm`)
        .then((res) => {
          this.isLoading = false

        })
      },
      fetchCity() {
        this.$http(`${config.host}/org/v1/api/tools/areacities`)
        .then((res) => {
          let data = res.data
          if (data.respcd === '0000') {
            this.areas = data.data.records
          } else {
            this.$message.error(data.resperr)
          }
        })
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
