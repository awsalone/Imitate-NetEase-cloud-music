<template>
  <header>
    <i class="iconfont icon-caidan_bg menu"></i>
    <ul class="headernav">
      <transition name="bigger">
        <li>
          <router-link to="/mine">我的</router-link>
        </li>
      </transition>
      <transition name="bigger">
        <li>
          <router-link to="/discovery">发现</router-link>
        </li>
      </transition>

      <li>
        <router-link to="/town">云村</router-link>
      </li>
      <li>
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
    .router-link-active {
      font-size: 25px;
      color: black;
    }
    // 没效果，之后再调整
    .bigger-enter-active,
    .bigger-leave-active {
      transition: all 5s ease;
    }
    .bigger-enter,
    .bigger-leave-to {
      color: #7e8c8d;
      font-size: 16px;
      background-color: red;
      transform: translateX(10px);
      opacity: 0;
    }
  }
}
</style>
