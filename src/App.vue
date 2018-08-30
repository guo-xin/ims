<template>
  <router-view/>
</template>

<script>
  export default {
    created() {
      document.title = this.$t('common.title');
    }
  }
</script>
