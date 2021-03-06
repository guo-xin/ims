<template>
  <div class="roleList">
    <header class="page-header">
      <h2 class="page-title">{{$t('system.tradeLimit.title')}}</h2>
      <el-button v-if="hasCreatePerm" size="large" type="primary" @click="append()">{{ $t('common.add') }}</el-button>
    </header>

    <el-form class="search-form" ref="searchform" :model="formData">
      <el-form-item :label="$t('system.tradeLimit.userid')" prop="userid" :rules="numberRule">
        <el-input v-model="formData.userid"></el-input>
      </el-form-item>
      <div class="buttons">
        <el-button type="primary" @click="search()">{{$t('common.search')}}</el-button>
        <el-button @click="reset()">{{$t('common.reset')}}</el-button>
      </div>
    </el-form>

    <el-table :data="risks" v-loading="isLoading" stripe>
      <el-table-column prop="userid" :label="$t('system.tradeLimit.userid')"></el-table-column>
      <el-table-column prop="shopname" :label="$t('system.tradeLimit.shopname')"></el-table-column>
      <el-table-column prop="address" :label="$t('system.tradeLimit.address')"></el-table-column>
      <el-table-column prop="mobile" :label="$t('system.tradeLimit.mobile')"></el-table-column>
      <el-table-column prop="trade_amt" :label="$t('system.tradeLimit.trade_amt') + '(≤)'"></el-table-column>
      <el-table-column prop="day_total_amt" :label="$t('system.tradeLimit.day_total_amt') + '(≤)'"></el-table-column>
      <el-table-column v-if="hasEditPerm" prop="operation" :label="$t('system.tradeLimit.operation')">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">{{ $t('common.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="risks.length > 0"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentPage">
    </el-pagination>

    <el-dialog :title="isUpdate ? $t('system.tradeLimit.edit') : $t('system.tradeLimit.set')" :visible.sync="showDialog" top="20%">
      <el-form :model="appendForm" ref="appendForm">
        <el-form-item prop="userid" :rules="[noEmpty, numberRule]" :label="$t('merchant.form.mchtid')">
          <el-input v-model="appendForm.userid" :suffix-icon="loadingIcon" @change="getMerchantName"></el-input>
        </el-form-item>
        <el-form-item prop="shopname" :label="$t('merchant.form.mchtname')">
          <el-input disabled v-model="appendForm.shopname" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="trade_amt" :rules="[noEmpty, currencyRule]" :label="$t('system.tradeLimit.trade_amt')+'(≤)'">
          <el-input v-model="appendForm.trade_amt"></el-input>
        </el-form-item>
        <el-form-item prop="day_total_amt" :rules="[noEmpty, currencyRule]" :label="$t('system.tradeLimit.day_total_amt')+'(≤)'">
          <el-input v-model="appendForm.day_total_amt"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="text-button" @click="showDialog = false">{{ $t('common.close') }}</el-button>
        <el-button type="text" :loading="appendLoading" class="text-button" @click="submit()">{{ $t('common.save') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import config from 'config'
  export default {
    data() {
      let currencyValidator = (rule, val, cb) => {
        if (Number(val) === 0) {
          cb(this.$t('system.tradeLimit.zero'))
        } if (val < 0) {
          cb(this.$t('system.tradeLimit.negative'))
        } if (!/^\d+([.]\d{1,2})?$/.test(val)) {
          cb(this.$t('system.tradeLimit.decimal'))
        } else {
          cb()
        }
      }
      let numberValidator = (rule, val, cb) => {
        if (!/^\d+$/.test(val)) {
          cb(this.$t('system.tradeLimit.numerical'))
        } else {
          cb()
        }
      }
      return {
        isLoading: false,
        showDialog: false,
        isUpdate: false,
        appendLoading: false,
        appendForm: {
          userid: '',
          day_total_amt: '',
          trade_amt: ''
        },
        noEmpty: {
          required: true, message: this.$t('common.noEmpty'), trigger: 'blur'
        },
        currencyRule: {
          validator: currencyValidator
        },
        numberRule: {
          validator: numberValidator
        },
        loadingIcon: '',
        formData: {
          userid: ''
        },
        risks: [],
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      hasCreatePerm() {
        return this.$store.getters.hasPermission('transaction_limit_create')
      },
      hasEditPerm() {
        return this.$store.getters.hasPermission('transaction_limit_edit')
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      append() {
        this.showDialog = true
        this.isUpdate = false
        if (this.$refs['appendForm']) {
          this.$refs['appendForm'].resetFields()
        }
      },
      getMerchantName() {
        if (!this.appendForm.userid) {
          return false
        }
        this.loadingIcon = 'el-icon-loading'
        this.$http(`${config.host}/org/tools/mchnt/info`, {
          params: {
            userid: this.appendForm.userid,
          }
        })
        .then((res) => {
          this.loadingIcon = ''
          let data = res.data
          if (data.respcd === '0000') {
            this.appendForm.shopname = data.data.shopname
          } else {
            this.appendForm.shopname = ''
          }
        })
      },
      edit(item) {
        this.showDialog = true
        this.isUpdate = true
        this.appendForm = { ...item }
      },
      submit() {
        this.$refs['appendForm'].validate((valid) => {
          if (valid) {
            let url = `${config.host}/org/trade/risk/add`
            if (this.isUpdate) {
              url = `${config.host}/org/trade/risk/edit`
            }
            this.$http({
              method: 'post',
              url,
              data: qs.stringify(this.appendForm)
            }).then((res) => {
              let data = res.data
              if (data.respcd === '0000') {
                if (this.isUpdate) {
                  this.$message.success(this.$t('common.updateSuccess'))
                } else {
                  this.$message.success(this.$t('common.createSuccess'))
                }
                this.showDialog = false
                this.fetchData()
              } else {
                this.$message.error(data.resperr)
              }
            })
          }
        })
      },
      formatStatus(row, column, cellValue) {
        return cellValue === 1 ? this.$t('trade.common.success') : this.$t('trade.common.failed')
      },
      search() {
        this.pageSize = 10
        this.currentPage = 1
        this.fetchData()
      },
      fetchData() {
        this.isLoading = true
        this.$http(`${config.host}/org/trade/risk/info`, {
          params: {
            userid: this.formData.userid,
            page: this.currentPage - 1,
            page_size: this.pageSize
          }
        })
        .then((res) => {
          this.isLoading = false
          let data = res.data
          if (data.respcd === '0000') {
            this.risks = data.data.ret
            this.total = data.data.total
          } else {
            this.risks = []
            this.$message.error(data.resperr)
          }
        })
      },
      reset() {
        this.$refs['searchform'].resetFields()
        this.fetchData()
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
