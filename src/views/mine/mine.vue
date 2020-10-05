<template>
  <div class="mineContain">
    <!--用户信息-->
    <div class="profile">
      <div v-if="songlist" class="profileInfo">
        <div>
          <img :src="userInfo.avatarUrl" />
        </div>
        <div class="nickname">{{userInfo.nickname}}</div>
      </div>
      <div v-else>
        <button class="loginClick" @click="login">点击登录</button>
      </div>
    </div>
    <!--歌单内容-->
    <div class="content" v-if="userInfo">
      <card moreInfo class="contItem">
        <cardItems>
          <div class="songlistItem" @click="routerPush(favSonglist.id)" v-if="favSonglist">
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
      <card moreInfo titleShow class="contItem" titlename="创建歌单" @titleclick="clickTitle">
        <cardItems
          moreInfo
          v-for="(item,index) in createSonglists"
          :key="index"
          @moreInfoClick="moreInfoEv($event,item)"
        >
          <div class="songlistItem" @click="routerPush(item.id)">
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
      <card moreInfo titleShow class="contItem" titlename="收藏歌单" @titleclick="clickTitle">
        <cardItems
          moreInfo
          v-for="(item,index) in collectSonglist"
          :key="index"
          @moreInfoClick="moreInfoEv($event,item)"
        >
          <div class="songlistItem" @click="routerPush(item.id)">
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
    <!--标题弹出层-->
    <van-popup class="popup" v-model="titleshow" position="bottom" round style="height:30%">
      <div class="popupTitle">我创建的歌单（{{this.createSonglists.length}}）</div>
      <div class="popupItem" @click="createSonglist">创建歌单</div>
    </van-popup>
    <!-- 子选项弹出层 -->
    <van-popup class="popup" v-model="show" position="bottom" round style="height:30%">
      <div class="popupTitle">歌单: &nbsp;&nbsp;{{this.curSonglist.name}}</div>
      <div class="popupItem" @click="deleteSonglist">删除歌单</div>
    </van-popup>
    <promptBox v-model="promptShow" @close-click="close_click" @submit="submit_name"></promptBox>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { newSonglist, getUserSonglist, getLoginStatus, deleteSonglists } from '../../api/index'
import card from '../../components/card/card'
import cardItems from '../../components/card/cardItem'
import promptBox from '../../components/promptBox'
export default {
  name: 'mine',
  components: {
    card,
    cardItems,
    promptBox
  },
  data () {
    return {
      show: false,
      status: '', // 登陆状态
      curSonglist: {},
      borderIndex: '',
      songlist: '',
      titleshow: false,
      promptShow: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'uid']),
    favSonglist () {
      return this.songlist[0]
    },
    createSonglists () {
      return this.songlist.slice(1, this.borderIndex)
    },
    collectSonglist () {
      let res = ''
      if (this.songlist.length > 1) {
        res = this.songlist.slice(this.borderIndex)
      }

      return res
    }

  },
  methods: {
    login () {
      window.localStorage.removeItem('tourist')
      this.$router.push('/login')
    },
    routerPush (id) {
      this.$router.push(`/songSheet/${id}`)
    },
    // 子元素更多点击事件
    moreInfoEv (childParam, parentParam) {
      this.show = true
      const obj = { name: parentParam.name, id: parentParam.id }
      this.curSonglist = obj
    },
    // 删除歌单
    async deleteSonglist () {
      const id = { id: this.curSonglist.id }
      await deleteSonglists(id)
      this.show = false
      this.renderMine()
    },
    // 创建歌单显示
    createSonglist () {
      this.titleshow = false
      this.promptShow = true
    },
    // 标题点击事件
    clickTitle () {
      this.titleshow = true
    },
    //  歌单名称
    async submit_name (value) {
      const data = { name: value }
      await newSonglist(data)
      this.promptShow = false
      this.renderMine()
    },
    // 获取歌单
    renderMine () {
      const id = this.uid || window.localStorage.getItem('uid')
      if (id) {
        this.get_playlist()
      }
    },
    close_click () {
      this.promptShow = false
    },
    async get_playlist () {
      const id = this.uid || window.localStorage.getItem('uid')
      const time = JSON.parse(JSON.stringify(new Date()))
      const res = await getUserSonglist({ uid: id, timestamp: time })
      const songlist = res.playlist
      this.songlist = songlist
      let borderIndex
      if (songlist.length > 1) {
        borderIndex = songlist.length
        for (let i = 1; i < songlist.length; i++) {
          if (songlist[i].userId !== id - 0) {
            borderIndex = i
            break
          }
        }
        this.borderIndex = borderIndex
      }
    }
  },
  async created () {
    const res = await getLoginStatus()
    this.status = res.code === 200
    if (this.status) {
      this.renderMine()
    }
  },
  watch: {
    status: function () {
      this.renderMine()
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
  .popup {
    .popupTitle {
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
    .popupItem {
      text-align: center;
      padding: 10px;
      letter-spacing: 2px;
      font-size: 18px;
    }
  }
}
</style>
