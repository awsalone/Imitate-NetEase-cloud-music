<template>
  <div id="app">
    <!--标题头部-->
    <HeaderTop></HeaderTop>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderTop from './components/headerTop/headerTop'

export default {
  components: {
    HeaderTop
  }
}
</script>
<style>
</style>
