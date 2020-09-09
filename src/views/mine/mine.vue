<template>
  <div>我的</div>
</template>
<script>
import $axios from '../../api/$axios'
export default {
  created () {
    async function init () {
      const result = await $axios('/logout')
      console.log(result)
    }
    init()
  }
}
</script>
<style lang="scss">
</style>
