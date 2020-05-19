<template>
  <header>
    <i class="iconfont icon-caidan_bg menu"></i>
    <ul class="headernav">
      <li :class="{active: $route.path === '/mine'}">
        <router-link to="/mine">我的</router-link>
      </li>
      <li :class="{active: $route.path === '/discovery'}">
        <router-link to="/discovery">发现</router-link>
      </li>
      <li :class="{active: $router.path === '/town'}">
        <router-link to="/town">云村</router-link>
      </li>
      <li :class="{active: $router.path === '/movie'}">
        <router-link to="/movie">视频</router-link>
      </li>
    </ul>
    <i class="iconfont icon-icon- search"></i>
  </header>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
header {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  .menu {
    margin: 10px;
  }

  .search {
    margin: 10px;
  }

  .headernav {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    .active {
      font-size: 25px;
      color: black;
    }
  }
}
</style>
