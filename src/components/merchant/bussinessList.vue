<template>
  <div class="shop">
    <header class="page-header">
      <h2 class="page-title">{{$t('shop.title')}}</h2>
      <!--<div>-->
        <!--<el-button size="large" type="primary" @click="createStore">{{$t('shop.create')}}</el-button>-->
      <!--</div>-->
    </header>
    <el-form class="search-form" :model="formData" ref="shop_list_form">
      <el-form-item :label="$t('shop.form.mchntid')" prop="mchntid">
        <el-input v-model="formData.mchntid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.mchntname')" prop="mchntname">
         <el-input v-model="formData.mchntname"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.submchntid')" prop="submchntid">
        <el-input v-model="formData.submchntid"></el-input>
      </el-form-item>

      <el-form-item :label="$t('shop.form.sunmchntname')" prop="sunmchntname">
        <el-input v-model="formData.sunmchntname"></el-input>
      </el-form-item>

      <div class="buttons">
        <el-button type="primary" @click="fetchData('query')">{{$t('merchant.query')}}</el-button>
        <el-button @click="reset">{{$t('merchant.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="shops" stripe v-loading="isLoading" @current-change="selectCurrentRowHandler">
      <el-table-column prop="submchnt_id" :label="$t('shop.table.submchntid')">
        <template slot-scope="scope">
          {{ scope.row.submchnt_id }}
        </template>
      </el-table-column>

       <el-table-column prop="submchnt_name"  :label="$t('shop.table.mchntname')">
        <template slot-scope="scope">
          {{ scope.row.mchnt_name }}
        </template>
      </el-table-column>

      <el-table-column width="170" prop="mchnt_name" :label="$t('shop.table.sunmchntname')">
        <template slot-scope="scope">
          {{ scope.row.submchnt_name }}
        </template>
      </el-table-column>

      <el-table-column prop="address" :label="$t('shop.table.address')">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>

      <el-table-column prop="telephone" :label="$t('shop.table.telephone')">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>

      <el-table-column prop="operating" :label="$t('shop.table.operating')">
        <template slot-scope="scope">
          {{ scope.row.operating }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="shops.length > 0"
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
          mchntid: '',
          mchntname: '',
          submchntid: '',
          sunmchntname: ''
        },
        shops: [],
        total: 0,
        pageSize: 10,
        currentPage: 0
      }
    },
    created() {
      this.formData.mchntid = this.$route.query.userid
      this.fetchData()
    },
    methods: {
      createStore() {
        this.$router.push({
          name: 'createStore',
        })
      },
      fetchData(query) {
        if(query) {
          this.currentPage = 0
        }
        let p = {
          mchnt_uid: this.formData.mchntid,
          shopname: this.formData.mchntname,
          store_uid: this.formData.submchntid,
          storename: this.formData.sunmchntname,
          page: this.currentPage > 0 ? (this.currentPage - 1) : this.currentPage,
          page_size: this.pageSize,
          format: 'cors'
        }
        this.isLoading = true;
        axios.get(`${config.host}/org/mchnt/sub/list`, {
          params: p})
          .then((res) => {
            let data = res.data;
            this.isLoading = false;
            if (data.respcd === config.code.OK) {
              this.shops = data.data.sub_infos
              this.total = data.data.sub_cnt
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
        this.formData.mchntid = '';
        this.fetchData('query');
      },
      selectCurrentRowHandler(currentRow, oldCurrentRow) { // 选择列表项，进入详情页
        this.$router.push({
          name: 'shopDetail',
          query: {userid: currentRow.submchnt_id, from: 'old'}
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
