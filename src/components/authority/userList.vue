<template>
  <div class="userList">
    <header class="page-header"><h2 class="page-title">{{ $t('authority.crumbs.T1') }}</h2></header>

    <el-form class="search-form" ref="form" :model="form">
      <el-form-item :label="$t('authority.panel.userName')">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.panel.roleName')">
        <el-input v-model="form.role"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="请选择状态">
          <el-option label="启用" value="shanghai"></el-option>
          <el-option label="停用" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button size="large" type="primary" @click="search()">查找</el-button>
      <el-button size="large" type="primary" @click="create()">创建</el-button>
    </el-form>

    <el-table :data="userData" stripe>
      <el-table-column prop="name" label="代理商名称"></el-table-column>
      <el-table-column prop="id" label="代理商ID"></el-table-column>
      <el-table-column prop="level" label="等级"></el-table-column>
      <el-table-column prop="uplevel" label="上级代理商名称"></el-table-column>
      <el-table-column prop="register_time" label="注册时间"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.status)" type="text">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination_wrapper" v-if="userData.total >= 10">
      <el-pagination
        ref="page"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        :total="userData.total"
        @current-change="currentChange"
        :current-page="currentPage">
      </el-pagination>
    </div>
    <div class="table_placeholder" v-else></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        form: {
          user: '',
          role: '',
          state: null
        },
        userData: []
      }
    },
    created() {

    },
    methods: {
      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
//          axios.get(`${config.ohost}/fund/v1/${url}/check`, {
//            params: this.basicParams
//          }).then((res) => {
//            this.loading = false;
//            let data = res.data;
//            if(data.respcd === config.code.OK) {
//              this.settleData = data.data;
//            } else {
//              this.$message.error(data.resperr);
//            }
//          }).catch(() => {
//            this.loading = false;
//            this.$message.error(this.$t('settlement.msg.m1'));
//          });
        }
      },

      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }

        this.getSettleData();
      },

      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
