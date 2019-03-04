<template>
  <div class="salesman">
    <header class="page-header">
      <h2 class="page-title">{{$t('salesman.title')}}</h2>
      <div>
        <el-button size="large" type="primary" @click="createSalesman">{{$t('shop.create')}}</el-button>
      </div>
    </header>
    <el-form class="search-form" :model="formData" ref="shop_list_form">
      <el-form-item :label="$t('salesman.form.slsm_uid')" prop="slsm_uid">
        <el-input v-model="formData.slsm_uid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('salesman.form.salesname')" prop="salesname">
        <el-input v-model="formData.salesname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('salesman.form.mobile')" prop="mobile">
        <el-input v-model="formData.mobile"></el-input>
      </el-form-item>

      <el-form-item :label="$t('salesman.form.status')" prop="status">
        <el-select v-model="formData.status">
          <el-option :label="$t('salesman.engaged')" value="0"></el-option>
          <el-option :label="$t('salesman.retired')" value="1"></el-option>
        </el-select>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="sales" stripe v-loading="isLoading" @current-change="selectCurrentRowHandler">
      <el-table-column prop="slsm_uid" :label="$t('salesman.form.slsm_uid')">
        <template slot-scope="scope">
          {{ scope.row.slsm_uid }}
        </template>
      </el-table-column>

      <el-table-column prop="salesname"  :label="$t('salesman.form.salesname')">
        <template slot-scope="scope">
          {{ scope.row.salesname }}
        </template>
      </el-table-column>

      <el-table-column prop="email" :label="$t('salesman.table.email')">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column width="170" prop="mobile" :label="$t('salesman.form.mobile')">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>


      <el-table-column prop="idnumber" :label="$t('salesman.table.idnumber')">
        <template slot-scope="scope">
          {{ scope.row.idnumber }}
        </template>
      </el-table-column>

      <el-table-column prop="ctime" :label="$t('salesman.table.date')">
        <template slot-scope="scope">
          {{ scope.row.ctime }}
        </template>
      </el-table-column>

      <el-table-column prop="status" :label="$t('salesman.form.status')">
        <template slot-scope="scope">
          {{ status[scope.row.status] }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="sales.length > 0"
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
  import config from 'config'
  import axios from 'axios';
  export default {
    data() {
      return {
        isLoading: false,
        formData: {
          salesname: '',
          mobile: '',
          status: '',
          slsm_uid: '',
        },
        status: {
          0: this.$t('salesman.engaged'),
          1: this.$t('salesman.retired'),
        },
        sales: [],
        total: 0,
        pageSize: 10,
        currentPage: 0
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      createSalesman() {
        this.$router.push({
          name: 'salesCreate',
        })
      },
      fetchData(query) {
        if(query) {
          this.currentPage = 0
        }
        let p = {
          salesname: this.formData.salesname,
          mobile: this.formData.mobile,
          status: this.formData.status,
          slsm_uid: this.formData.slsm_uid,
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          page_size: this.pageSize,
          format: 'cors'
        }
        this.isLoading = true;
        axios.get(`${config.host}/org/salesman/list`, {
          params: p})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.sales = data.data.sales_infos
              this.total = data.data.sales_cnt
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error(this.$t('common.netError'));
          this.isLoading = false;
        });
      },
      reset() {
        this.$refs['shop_list_form'].resetFields();
        this.fetchData('query');
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) { // 选择列表项，进入详情页
        this.$router.push({
          name: 'salesDetail',
          query: {userid: currentRow.slsm_uid, from: 'old'}
        })
      },
      handleSizeChange(size = 10) {
        this.pageSize = size
        this.handleCurrentChange()
      },
      handleCurrentChange(current) {
        if (current) {
          this.currentPage = current
        } else {
          this.currentPage = 0
        }
        this.fetchData()
      }
    }
  }
</script>
<style lang="scss">
</style>
