<template>
  <div id="app" v-cloak>
    <LeftMenu></LeftMenu>
    <div class="rightApp">
      <!--标题头部-->
      <HeaderTop v-show="this.$route.meta.headerShow" class="headerTop">
        <template #left>
          <i class="iconfont icon-caidan_bg menu" @click="toggleLMenu"></i>
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
      <keep-alive :max="10" include="discovery">
        <router-view :class="pseduExist?'pseudoContain':''"></router-view>
      </keep-alive>
      <Player></Player>
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/titleMenu'
import HeaderTop from './components/headerTop/headerTop'
import Player from './components/player/player'
import { mapState } from 'vuex'
import { favSongList, getUserSonglist } from './api/index'

export default {
  data () {
    return {
      lMenuSta: false,
      status: false
    }
  },
  components: {
    HeaderTop,
    Player,
    LeftMenu
  },
  computed: {
    ...mapState(['songDetail', 'lMenu', 'uid']),
    pseduExist () {
      const flag = this.$route.name === 'sComment'
      if (Object.keys(this.songDetail).length && !flag) {
        return true
      } else {
        return false
      }
    }
  },
  async created () {
    // this.getUserProfile()
    // const res = await getLoginStatus()
    const token = window.localStorage.getItem('token')
    this.status = !!token
    if (this.status) {
      this.getfavSongList()
      this.getSongList()
    }
  },
  mounted () {
    // eslint-disable-next-line no-unused-expressions
    this.lMenuSta = this.lMenu
  },
  methods: {
    // 获取喜欢音乐列表
    getfavSongList: async function () {
      const id = window.localStorage.getItem('uid') || this.uid
      const date = new Date().getTime()
      const uid = { uid: id, timestamp: date }
      if (id) {
        const res = await favSongList(uid)
        this.$store.commit('get_likelist', res.ids)
      } else {
        return false
      }
    },
    // 获取用户歌单
    async getSongList () {
      const id = this.uid || window.localStorage.getItem('uid')
      const time = JSON.parse(JSON.stringify(new Date()))
      const res = await getUserSonglist({ uid: id, timestamp: time })
      const songlist = res.playlist
      this.$store.commit('get_collectsheetList', songlist)
    },
    toggleLMenu () {
      this.lMenuSta = !this.lMenuSta
      this.$store.commit('toggle_menu')
    }
  },
  watch: {
    status: function () {
      this.getfavSongList()
      this.getSongList()
    }
  }
}
</script>
<style lang='scss'>
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

[v-cloak] {
  display: none !important;
}
#app {
  height: 100%;
  // 展示页

  .rightApp {
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
    .pseudoContain {
      &::after {
        display: block;
        height: 60px;
        content: '';
      }
    }
  }
}
</style>
