<template>
  <div>我的</div>
</template>
<script>
import $axios from '../../api/$axios'
export default {
  created () {
    const data = { keywords: '冷血' }
    async function init (data) {
      const result = await $axios('/search', { params: data })
      console.log(data)
      console.log(result)
    }
    init(data)
  }
}
</script>
<style lang="scss">
</style>
