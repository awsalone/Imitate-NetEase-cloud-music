<template>
  <div class="mineContain">
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
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    login () {
      window.localStorage.removeItem('tourist')
      this.$router.push('/login')
    }

  }
}
</script>
<style lang="scss">
.mineContain {
  margin-top: 70px;
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
        font-weight: 600;
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
}
</style>
