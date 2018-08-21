<template>
  <div class="agencyList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>代理商管理</el-breadcrumb-item>
      <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="searchform" :model="formData" label-width="100px">
      <el-form-item label="代理商名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="代理商ID">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item label="代理商级别">
        <el-select v-model="formData.agree" placeholder="请选择级别">
          <el-option label="级别一" value="shanghai"></el-option>
          <el-option label="级别二" value="beijing"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="状态一" value="shanghai"></el-option>
          <el-option label="状态二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <footer>
        <el-button size="large" type="success" @click="filterAgencies()">查找</el-button>
        <el-button size="large" type="success" @click="createAgency()">创建</el-button>
      </footer>
    </el-form>

    <el-table :data="tableData" stripe border>
      <el-table-column prop="ctime" label="代理商名称"></el-table-column>
      <el-table-column prop="title" label="代理商ID"></el-table-column>
      <el-table-column prop="type_str" label="等级"></el-table-column>
      <el-table-column prop="obtain_num" label="上级代理商名称" :formatter="formatGe"></el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.start_time, scope.row.expire_time) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.id)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
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
        agencies: []
      }
    },
    created() {

    },
    methods: {
      filterAgencies(val) {

      }
    }
  }
</script>

<style scoped lang="scss">
.guoxin {
  color: $baseColor;
  font-size: $xlSize;
}
</style>
