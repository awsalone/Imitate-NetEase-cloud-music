<template>
  <div class="sScontainer" v-if="songSheetList" ref="box">
    <!--标题-->
    <HeaderTop class="headerContain">
      <template #left>
        <div class="left">
          <span @click="$router.go(-1)">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span>歌单</span>
        </div>
      </template>
      <template #right>
        <div class="right">
          <span>
            <i class="iconfont icon-icon-" style="font-size:25px"></i>
          </span>
          <span>
            <i class="iconfont icon-gengduo" style="font-size:25px"></i>
          </span>
        </div>
      </template>
    </HeaderTop>
    <!--头部-->
    <div class="title" ref="scrollBorder">
      <div class="top">
        <div class="pic">
          <img :src="songSheetList.playlist.coverImgUrl" />
        </div>
        <div class="des">
          <div class="name">{{songSheetList.playlist.name}}</div>
          <div class="author"></div>
          <div class="description">{{songSheetList.playlist.description}}</div>
        </div>
      </div>
      <div class="bottom">
        <span class="vertical" @click="commentPage()">
          <i class="iconfont icon-pinglun"></i>
          <span class="verticalText">{{songSheetList.playlist.commentCount}}</span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-fenxiang"></i>
          <span class="verticalText">{{songSheetList.playlist.shareCount}}</span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-xiazai"></i>
          <span class="verticalText">下载</span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-duoxuan"></i>
          <span class="verticalText">多选</span>
        </span>
      </div>
    </div>
    <!-- 脱离定位部分 -->
    <div class="playerHead" :class="{active:scrollState}">
      <div class="playerHeadL" @click="playAll()">
        <span class="playerIcon">
          <i class="iconfont icon-bofang_bg"></i>
        </span>
        <span>
          播放全部
          <span>（共{{songSheetList.playlist.trackCount}}首）</span>
        </span>
      </div>
      <div v-if="this.fav" style="display:none"></div>
      <div
        class="playerHeadR"
        v-else-if="!status"
        @click="collet"
      >+&nbsp;收藏({{songSheetList.playlist.subscribedCount}})</div>
      <div v-else class="playerHeadr" @click="collet">已收藏</div>
    </div>
    <!-- 歌曲部分 -->
    <div class="songList" :class="{active:scrollState}">
      <ul>
        <li
          class="songItem"
          v-for="(item, index) in songDetail"
          :key="index"
          @click="changeSong(item.id)"
        >
          <div class="songItemL">
            <div class="index">{{index+1}}</div>
            <div class="musicName">
              <span class="name">{{item.name}}</span>
              <span class="author">{{item.ar[0].name}}</span>
            </div>
          </div>
          <div class="songItemR">
            <i class="iconfont icon-gengduo"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqSongSheetDetail, reqSongDetail, getcollectSonglist, getUserSonglist } from '../../api/index'
import HeaderTop from '../../components/headerTop/headerTop'
export default {
  data () {
    return {
      songSheetList: '',
      songListUrl: [],
      songDetail: '',
      scrollState: '',
      scrollHeight: '200',
      status: false, // true 已收藏，false 为收藏
      loginStatus: '',
      fav: false
    }
  },
  components: {
    HeaderTop
  },
  methods: {
    // 歌曲详情
    async getSongDetail () {
      const result = await reqSongDetail({ ids: this.songSheetListId })
      this.songDetail = result.songs
    },
    // 跳转评论
    commentPage () {
      this.$store.commit('toggle_songorlist', 1)
      this.$router.push({ path: `/songComment/${this.$route.params.id}` })
    },
    changeSong (id) {
      this.$store.dispatch('getSongDetail', { ids: id })
      this.$store.commit('receive_playState', { zt: false })
    },
    // 播放全部
    playAll () {
      if (this.songDetail && this.songDetail.length) {
        this.$store.commit('play_all', { playList: this.songDetail })
        this.changeSong(this.songDetail[0].id)
      }
    },
    // 收藏|取消歌单
    async collet () {
      const token = window.localStorage.getItem('token')
      this.loginStatus = !!token
      if (this.loginStatus) {
        const t = this.status ? 2 : 1
        this.status = !this.status
        const data = { t: t, id: this.$route.params.id }
        getcollectSonglist(data)
        this.getSongList()
      } else {
        window.localStorage.removeItem('tourist')
        this.$store.commit('delete_playList')
        this.$router.push('/login')
      }
    },
    async getSongList () {
      const id = this.uid || window.localStorage.getItem('uid')
      const time = JSON.parse(JSON.stringify(new Date()))
      const res = await getUserSonglist({ uid: id, timestamp: time })
      const songlist = res.playlist
      this.$store.commit('get_collectsheetList', songlist)
    }
  },
  computed: {
    songSheetListId () {
      const list = []
      this.songSheetList.playlist.trackIds.forEach(item => {
        list.push(item.id)
      })
      return list.join(',')
    },
    ...mapState(['collectsheetList', 'likeListIds'])
  },
  async created () {
    const result = await reqSongSheetDetail(this.$route.params.id)
    this.songSheetList = result
    const token = window.localStorage.getItem('token')
    const uid = window.localStorage.getItem('uid') || this.uid
    if (this.collectsheetList) {
      const arr = this.collectsheetList
      const id = this.$route.params.id
      const status = arr.some(function (cur) {
        return cur.id === id - 0
      })
      this.status = status
      // 喜欢歌单和自创歌单
      const fav = this.collectsheetList[0].id === this.$route.params.id - 0 || this.songSheetList.playlist.userId === uid - 0
      this.fav = fav
    }
  },
  mounted () {
    // fixed
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      if (top >= this.scrollHeight) {
        this.scrollState = true
      } else {
        this.scrollState = false
      }
    })
  },
  async beforeRouteUpdate (to, from, next) {
    const result = await reqSongSheetDetail(this.$route.params.id)
    this.songSheetList = result
    next()
  },
  updated () {
    this.$nextTick(() => {

    })
  },
  watch: {
    songSheetList () {
      this.getSongDetail()
    },
    collectsheetList () {
      if (this.collectsheetList) {
        const arr = this.collectsheetList
        const id = this.$route.params.id
        const status = arr.some(function (cur) {
          return cur.id === id - 0
        })
        this.status = status
      } else {
        this.status = false
      }
    }
  }
}
</script>
<style lang="scss">
.sScontainer {
  // 标题
  margin: 0 !important;
  .headerContain {
    font-size: 18px;
    align-items: center;
    position: fixed;
    .left {
      span {
        padding: 0 10px;
      }
    }
    .right {
      span {
        padding: 0 10px;
      }
    }
  }
  // 头部
  .title {
    margin-top: 70px;
    height: 200px;
    width: 100%;
    .top {
      display: flex;

      .pic {
        flex: 0 0 auto;
        width: 100px;
        height: 100px;
        padding: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .des {
        display: flex;
        flex-direction: column;
        margin: 15px;
        .description {
          margin-top: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 20px;
          width: 150px;
          white-space: nowrap;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      padding: 15px;
      .vertical {
        display: flex;
        flex-direction: column;
        text-align: center;
        .verticalText {
          text-align: center;
        }
      }
    }
    i {
      font-size: 25px;
      font-weight: bold;
    }
  }
  // 脱离定位部分
  .playerHead {
    &.active {
      position: fixed;
      top: 70px;
    }
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-radius: 10px 10px 0 0;
    background-color: #ccc;
    box-sizing: border-box;
    .playerHeadL {
      .playerIcon {
        display: inline-block;
        width: 20px;
      }
    }
    .playerHeadR {
      border-radius: 20px;
      background-color: red;
      margin: 8px;
      height: 40px;
      line-height: 30px;
      padding: 5px;
      box-sizing: border-box;
      vertical-align: center;
      color: white;
      letter-spacing: 1px;
      font-size: 12px;
    }
    .playerHeadr {
      border-radius: 20px;
      margin: 8px;
      height: 40px;
      background-color: rgb(163, 163, 163);
      line-height: 30px;
      padding: 5px;
      box-sizing: border-box;
      vertical-align: center;
      color: #fff;
      letter-spacing: 1px;
      font-size: 12px;
    }
  }
  // 歌曲列表
  .songList {
    width: 100%;
    &.active {
      margin-top: 60px;
    }
    .songItem {
      height: 45px;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      padding: 5px;
      .songItemL {
        display: flex;
        width: 90%;
        .index {
          width: 40px;
          height: 45px;
          line-height: 45px;
          text-align: center;
        }
        .musicName {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 90%;
          span {
            vertical-align: middle;
          }

          .name {
            font-size: 16px;
            line-height: 100%;
            margin-bottom: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .author {
            font-size: 12px;
            color: #ccc;
            line-height: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .songItemR {
        vertical-align: middle;
      }
    }
    // 占位
    &::after {
      display: block;
      height: 70px;
      content: '';
    }
  }
}
</style>
