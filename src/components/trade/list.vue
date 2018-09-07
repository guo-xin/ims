<template>
  <div class="agencyList">
    <header class="page-header">
      <h2 class="page-title">交易明细</h2>
      <el-button size="large" type="primary" @click="exportExcel()">导出</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          :editable="false"
          :placeholder="$t('common.range')"
          size="large"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="全部" value=""></el-option>
          <el-option label="支付" value=""></el-option>
          <el-option label="退款" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付通道">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="全部" value=""></el-option>
          <el-option label="微信支付" value=""></el-option>
          <el-option label="支付宝" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易状态">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="全部" value=""></el-option>
          <el-option label="成功" value=""></el-option>
          <el-option label="失败" value=""></el-option>
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
      <div class="buttons">
        <el-button type="primary" @click="fetchData()">查找</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </el-form>

    <el-table :data="trades" stripe>
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
          date: '',
          name: '',
          id: '',
          agree: '',
          status: ''
        },
        trades: [{
          name: '交易1',
          id: '',
          level: '',
          uplevel: '',
          register_time: '',
          status: ''
        }, {
          name: '交易2',
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
      search() {

      },
      goDetail() {

      }
    }
  }
</script>

<style scoped lang="scss">

</style>
