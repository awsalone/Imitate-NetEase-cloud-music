<template>
  <transition name="mask" mode="out-in">
    <div
      v-show="titleSta"
      class="leftMenuContain"
      @touchmove.prevent
      @click.self="toggleMenu"
      v-cloak
    >
      <transition name="slideFade" mode="out-in">
        <div class="leftMenu" v-show="titleSta">
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
</template>
<script>
import { getUserInfo, userLogout } from '../api/index'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      titleSta: 'false'
    }
  },
  async created () {
    this.getUserProfile()
  },
  mounted () {
    // eslint-disable-next-line no-unused-expressions

    this.titleSta = this.lMenu
  },
  methods: {
    toggleMenu () {
      this.titleSta = !this.titleSta
      this.$store.commit('toggle_menu')
    },
    login () {
      this.toggleMenu()
      window.localStorage.removeItem('tourist')
      this.$store.commit('delete_playList')
      this.$router.push('/login')
    },
    logout () {
      this.toggleMenu()
      userLogout()
      this.$store.commit('get_userinfo', '')
      window.localStorage.removeItem('uid')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('tourist')
      this.$store.commit('delete_playList')
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
  computed: {
    ...mapState(['lMenu', 'uid', 'userInfo'])

  },
  watch: {
    status: function () {
      this.getUserProfile()
    },
    lMenu: function () {
      this.titleSta = this.lMenu
    }
  }

}
</script>
<style lang="scss">
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
</style>
