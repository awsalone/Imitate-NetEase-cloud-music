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
    <nav ref="nav">
      <div ref="navChild">
        <router-link
          class="top"
          v-for="(item,index) in tags"
          :key="index"
          :class="{active:item.name === $route.params.id}"
          :to="{ path: `/songSheetPG/songSheetView/${item.name}` }"
        >{{item.name}}</router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { reqsongSheetPg } from '../../api/index'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      tags: [] // 子路由标签
    }
  },
  components: {
    HeaderTop
  },
  created () {
    this.init()
  },
  mounted () {
    // 初始子路由
    if (!this.$route.params.id) {
      this.$router.push('/songSheetPG/songSheetView')
    }
  },
  methods: {
    async init () {
      const result = await reqsongSheetPg()
      this.tags = result.tags
    }
  },
  watch: {
    tags () {
      this.$nextTick(() => {
        let count = null
        this.tags.forEach(item => {
          count += item.name.length * 16 + 40
        });
        this.$refs.navChild.style.width = count + 'px'
        new BScroll(this.$refs.nav, {
          click: true,
          scrollX: true
        })
      })

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
    position: fixed;
    background-color: #fff;
    top: 69px;
    padding: 5px 0;
    width: 100%;
    div {
      display: flex;
      .top {
        box-sizing: border-box;
        flex: 0 0 auto;
        margin: 0 20px;
        color: rgb(158, 154, 154);
        display: inline-block;
        padding: 3px 0 6px 0;
      }
      .active {
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>
