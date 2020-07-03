<template>
  <div id="app">
    <!--标题头部-->
    <HeaderTop v-show="this.$route.meta.headerShow" class="headerTop" v-cloak>
      <template #left>
        <i class="iconfont icon-caidan_bg menu"></i>
      </template>
      <template #center>
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
      </template>
      <template #right>
        <i class="iconfont icon-icon- search" @click="$router.push('/search')"></i>
      </template>
    </HeaderTop>
    <keep-alive :include="['/discovery','/mine','/movie','/town']">
      <router-view></router-view>
    </keep-alive>
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
<style lang='scss'>
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
#app {
  [v-cloak] {
    display: none !important;
  }
  height: 100%;
  .headerTop {
    position: fixed;
    top: 0;
    z-index: 2;
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
}
</style>
