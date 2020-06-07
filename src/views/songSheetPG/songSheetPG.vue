<template>
  <div class="con">
    <HeaderTop>
      <template #left>
        <div class="headertop">
          <span @click="$router.push('/discovery')">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span>歌单广场</span>
        </div>
      </template>
    </HeaderTop>
    <transition name="toggle">
      <nav class="border-top-1px">
        <router-link
          class="top"
          v-for="(item,index) in tags"
          :key="index"
          :class="{active:item.name === $route.params.id}"
          :to="{ path: `/songSheetPG/songSheetView/${item.name}` }"
        >{{item.name}}</router-link>
      </nav>
    </transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { reqsongSheetPg } from '../../api/index'
export default {
  data () {
    return {
      tags: []
    }
  },
  components: {
    HeaderTop
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const result = await reqsongSheetPg()
      this.tags = result.tags
      if (!this.$route.params.id) {
        this.$router.push('/songSheetPG/songSheetView')
      }
    }

  }

}
</script>
<style lang="scss">
@import url('../../static/support.css');
.con {
  width: 100%;
  height: 100%;
  display: block;
  .headertop {
    position: fixed;
    :nth-child(2) {
      font-size: 20px;
      align-items: center;
      margin-left: 5px;
      font-weight: bolder;
    }
  }
  nav {
    overflow: hidden;
    display: flex;
    position: fixed;
    background-color: #fff;
    top: 70px;
    padding: 5px 0;
    .top {
      flex: 0 0 auto;
      margin: 0 20px;
      color: rgb(158, 154, 154);
      display: inline-block;
      padding: 3px 0 6px 0;
    }
    .active {
      border-bottom: 2px solid red;
    }
    .toggle-enter-active,
    .toggle-leave-active {
      transition: all 1s ease;
    }
    .toggle-enter,
    .toggle-leave-to {
      opacity: 0;
    }
  }
}
</style>
