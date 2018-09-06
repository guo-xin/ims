<template>
  <div class="tradeTotal">
    <header class="page-header"><h2 class="page-title">交易汇总</h2></header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item label="交易日期">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="商户名称">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="一级代理">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="二级代理">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="状态一" value="shanghai"></el-option>
          <el-option label="状态二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付通道">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="状态一" value="shanghai"></el-option>
          <el-option label="状态二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">查找</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </el-form>

    <el-row class="trade-total" :gutter="10">
      <el-col :span="12">
        <el-row type="flex" align="middle">
          <el-col :span="8" class="head">
            <span>支付交易</span>
            <strong>$6789.00</strong>
          </el-col>
          <el-col :span="8">
            <span>支付交易</span>
            <strong>$1000.00</strong>
          </el-col>
          <el-col :span="8">
            <span>支付交易</span>
            <strong>$80.00</strong>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" align="middle">
          <el-col :span="8" class="head">
            <span>退款交易</span>
            <strong>$80.00</strong>
          </el-col>
          <el-col :span="8">
            <span>支付交易</span>
            <strong>$80.00</strong>
          </el-col>
          <el-col :span="8">
            <span>支付交易</span>
            <strong>$80.00</strong>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <div class="">
      <el-table align="center" :data="trades" stripe>
        <el-table-column prop="date" label="交易日期"></el-table-column>
        <el-table-column prop="id" label="商户名称"></el-table-column>
        <el-table-column prop="level" label="一级代理"></el-table-column>
        <el-table-column prop="uplevel" label="二级代理"></el-table-column>
        <el-table-column prop="register_time" label="支付通道"></el-table-column>
        <el-table-column label="支付交易" align="center">
          <el-table-column prop="register_time" label="笔数"></el-table-column>
          <el-table-column prop="register_time" label="金额"></el-table-column>
          <el-table-column prop="register_time" label="手续费"></el-table-column>
        </el-table-column>
        <el-table-column label="退款交易" align="center">
          <el-table-column prop="register_time" label="笔数"></el-table-column>
          <el-table-column prop="register_time" label="金额"></el-table-column>
          <el-table-column prop="register_time" label="手续费"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="">

      </div>
    </div>

    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
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
        trades: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {

    },
    methods: {
      search(val) {

      },
      fetchData() {

      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 1
        }
        this.fetchData()
      }
    }
  }
</script>

<style scoped lang="scss">
  %shadow {
    box-shadow: 2px 6px 8px rgba(142, 169, 190, 0.1);
  }
  .el-table_1_column_6, .el-table_1_column_10 {
    padding: 0;
  }
  .el-table thead th {
    padding: 12px 0;
  }
  .trade-total {
    margin-bottom: 15px;
    > .el-col:last-child .el-row{
      border-color: #FF3366;
    }
    .el-row {
      height: 113px;
      border-left: 6px solid #2974FF;
      border-radius: 6px;
      background-color: #fff;
      @extend %shadow;
      >.el-col {
        padding-left: 20px;
      }
    }
    .head {
      span {
        font-size: 14px;
      }
      strong {
        font-size: 38px;
      }
    }
    span {
      font-size: 12px;
      color: #717283;
    }
    strong {
      margin-top: 8px;
      font-size: 24px;
      display: block;
    }
  }
</style>
