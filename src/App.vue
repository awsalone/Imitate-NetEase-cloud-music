<template>
  <div id="app">
    <!--标题头部-->
    <HeaderTop v-show="this.$route.meta.headerShow"></HeaderTop>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
import HeaderTop from './components/headerTop/headerTop'
import Player from './components/player/player'
export default {
  components: {
    HeaderTop,
    Player
  }
}
</script>
<style>
</style>
