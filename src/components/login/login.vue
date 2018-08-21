<template>
  <div class="hello">
    <el-form :model="form" ref="form">
      <el-form-item prop="dateRangeValue">
        <el-date-picker
          v-model="form.dateRangeValue"
          type="datetimerange"
          :editable="false"
          :placeholder="$t('index.type')"
          size="small"
          :clearable="false">
        </el-date-picker>
      </el-form-item>
      <span class="guoxin">{{$t('index.name')}}</span>
      <el-select v-model="lang" :placeholder="$t('index.name')" @change="selectChange">
        <el-option
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form>
  </div>
</template>

<script>
  import Store from 'assets/js/store';
  export default {
    data() {
      return {
        form: {
          dateRangeValue: [new Date(), new Date()]
        },
        lang: Store.get("lang") || 'en',
        items: [
          {label: 'English', value: 'en'},
          {label: '简体中文', value: 'zh-CN'}
        ]
      }
    },
    computed: {

    },

    watch: {

    },
    created() {

    },

    methods: {
      selectChange(val) {
        this.$i18n.locale = val
        Store.set("lang", val);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.guoxin {
  color: $baseColor;
  font-size: $xlSize;
}
</style>
