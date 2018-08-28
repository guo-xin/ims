<template>
  <div class="agencyList">
    <header class="page-header"><h2 class="page-title">交易明细列表</h2></header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="交易时间">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付通道">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易状态">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="一级代理">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="二级代理">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-button size="large" type="primary" @click="filterAgencies()">查询</el-button>
      <el-button size="large" type="primary" @click="createAgency()">导出</el-button>
    </el-form>

    <el-table :data="agencies" stripe>
      <el-table-column prop="name" label="交易时间"></el-table-column>
      <el-table-column prop="id" label="流水号"></el-table-column>
      <el-table-column prop="level" label="商户简称"></el-table-column>
      <el-table-column prop="uplevel" label="门店名称"></el-table-column>
      <el-table-column prop="register_time" label="支付通道"></el-table-column>
      <el-table-column prop="register_time" label="交易金额"></el-table-column>
      <el-table-column prop="register_time" label="手续费"></el-table-column>
      <el-table-column prop="register_time" label="交易类型"></el-table-column>
      <el-table-column prop="register_time" label="状态"></el-table-column>
    </el-table>

    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="actvCount"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          id: '',
          agree: '',
          status: ''
        },
        agencies: [{
          name: '代理商1',
          id: '',
          level: '',
          uplevel: '',
          register_time: '',
          status: ''
        }, {
          name: '代理商2',
          id: '',
          level: '',
          uplevel: '',
          register_time: '',
          status: ''
        }]
      }
    },
    created() {

    },
    methods: {
      filterAgencies(val) {

      },
      goDetail() {

      }
    }
  }
</script>

<style scoped lang="scss">

</style>
