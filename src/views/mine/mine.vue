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
    <div class="content">
      <card moreInfo class="contItem">
        <cardItems>
          <div class="songlistItem">
            <div class="pic">
              <img :src="favSonglist.coverImgUrl" />
            </div>
            <div class="name">
              <div class="itemName">{{favSonglist.name}}</div>
              <div class="itemCount">{{favSonglist.trackCount+'首'}}</div>
            </div>
          </div>
        </cardItems>
      </card>
      <card moreInfo titleShow class="contItem" titlename="创建歌单">
        <cardItems moreInfo v-for="(item,index) in createSonglist" :key="index">
          <div class="songlistItem">
            <div class="pic">
              <img :src="item.coverImgUrl" />
            </div>
            <div class="name">
              <div class="itemName">{{item.name}}</div>
              <div class="itemCount">{{item.trackCount+'首'}}</div>
            </div>
          </div>
        </cardItems>
      </card>
      <card moreInfo titleShow class="contItem" titlename="收藏歌单">
        <cardItems moreInfo v-for="(item,index) in collectSonglist" :key="index">
          <div class="songlistItem">
            <div class="pic">
              <img :src="item.coverImgUrl" />
            </div>
            <div class="name">
              <div class="itemName">{{item.name}}</div>
              <div class="itemCount">{{item.trackCount+'首'}}</div>
            </div>
          </div>
        </cardItems>
      </card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserSonglist } from '../../api/index'
import card from '../../components/card/card'
import cardItems from '../../components/card/cardItem'
export default {
  components: {
    card,
    cardItems
  },
  data () {
    return {
      favSonglist: '',
      createSonglist: '',
      collectSonglist: ''
    }
  },
  computed: {
    ...mapState(['userInfo', 'uid'])
  },
  methods: {
    login () {
      window.localStorage.removeItem('tourist')
      this.$router.push('/login')
    }

  },
  async created () {
    const id = this.uid || window.localStorage.getItem('uid')
    const time = JSON.parse(JSON.stringify(new Date()))
    const res = await getUserSonglist({ uid: id, timestamp: time })
    console.log(res)
    const songlist = res.playlist
    this.favSonglist = res.playlist[0]
    let borderIndex
    if (songlist.length > 1) {
      borderIndex = songlist.length
      for (let i = 1; i < songlist.length; i++) {
        if (songlist[i].userId !== id - 0) {
          borderIndex = i
          break
        }
      }
      this.createSonglist = songlist.slice(1, borderIndex)
      this.collectSonglist = songlist.slice(borderIndex)
    }
  }
}
</script>
<style lang="scss">
.mineContain {
  margin-top: 70px;
  background-color: rgb(233, 233, 233);
  height: 100%;
  .songlistItem {
    display: flex;
    .pic {
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .name {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .itemName {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .itemCount {
        font-size: 14px;
        color: #ccc;
      }
    }
  }
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
  .content {
    .contItem {
      margin: 15px 10px;
    }
  }
}
</style>
