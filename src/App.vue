<template>
  <div id="app" v-cloak>
    <!-- 右侧弹出菜单栏-->
    <transition name="mask">
      <div
        v-show="lMenuSta"
        class="leftMenuContain"
        @touchmove.prevent
        @click.self="toggleMenu"
        v-cloak
      >
        <transition name="slideFade">
          <div class="leftMenu" v-show="lMenuSta">
            <div class="profile">
              <div v-if="userInfo" class="profileInfo">
                <div>
                  <img :src="userInfo.avatarUrl" />
                </div>
                <div class="nickname">{{userInfo.nickname}}</div>
              </div>
              <div v-else>
                <button class="loginClick" @click="login">点击登录</button>
              </div>
            </div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="menuFooter" @click="logout">退出登陆</div>
          </div>
        </transition>
      </div>
    </transition>

    <div class="rightApp">
      <!--标题头部-->
      <HeaderTop v-show="this.$route.meta.headerShow" class="headerTop">
        <template #left>
          <i class="iconfont icon-caidan_bg menu" @click="toggleMenu"></i>
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
      <router-view :class="pseduExist?'pseudoContain':''"></router-view>
      <Player></Player>
    </div>
  </div>
</template>
<script>
import HeaderTop from './components/headerTop/headerTop'
import Player from './components/player/player'
import { mapState } from 'vuex'
import { getUserInfo, userLogout } from './api/index'
export default {
  data () {
    return {
      lMenuSta: 'false'
    }
  },
  components: {
    HeaderTop,
    Player
  },
  computed: {
    ...mapState(['songDetail', 'lMenu', 'uid', 'userInfo']),
    pseduExist () {
      const flag = this.$route.name === 'sComment'
      if (Object.keys(this.songDetail).length && !flag) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.getUserProfile()
  },
  mounted () {
    this.lMenuSta = this.lMenu
    // window.addEventListener('scroll', this.scrollTest)
  },
  methods: {
    scrollTest () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight || window.innerHeight
      const scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight + 70) {
        console.log('loading')
      }
    },
    toggleMenu () {
      this.lMenuSta = !this.lMenuSta
      this.$store.commit('toggle_menu')
    },
    login () {
      this.toggleMenu()
      window.localStorage.removeItem('tourist')
      this.$router.push('/login')
    },
    logout () {
      this.toggleMenu()
      userLogout()
      this.$store.commit('get_userinfo', '')
      window.localStorage.removeItem('uid')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('tourist')
      this.$router.push('/login')
    },
    async getUserProfile () {
      const uid = this.uid || window.localStorage.getItem('uid')
      if (!this.userInfo && uid) {
        const res = await getUserInfo({ uid: uid })
        this.$store.commit('get_userinfo', res.profile)
      }
    }
  },
  watch: {
    uid: function () {
      this.getUserProfile()
    }
  }
}
</script>
<style lang='scss'>
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
// .mask-enter,
// .mask-leave-to {
//   opacity: 0;
// }
// .mask-leave-active {
//   transition-delay: 0.3s;
// }
@keyframes fade {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-70vw);
  }
}
.slideFade-enter-active {
  animation: fade 0.3s reverse;
  opacity: 1;
}
.slideFade-leave-active {
  animation: fade 0.3s;
  opacity: 1;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}

[v-cloak] {
  display: none !important;
}
#app {
  height: 100%;
  // 展示页
  // 左侧菜单弹出页
  .leftMenuContain {
    position: fixed;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2020;
    .leftMenu {
      width: 70vw;
      height: 100%;
      background-color: #fff;
      position: relative;

      .profile {
        .profileInfo {
          display: flex;
          padding: 10px;
          img {
            width: 4rem;
            height: 4rem;
            display: block;
            border-radius: 50%;
          }
          .nickname {
            line-height: 4rem;
            padding-left: 1rem;
            font-size: 1.1rem;
          }
        }
        .loginClick {
          background-color: red;
          border-radius: 20px;
          padding: 10px 20px;
          border: 0;
          color: #fff;
          position: absolute;
          margin-top: 50px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .menuFooter {
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        font-size: 20px;
        padding: 10px 0;
        border-top: 1px solid #7e8c8d;
      }
    }
  }

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
