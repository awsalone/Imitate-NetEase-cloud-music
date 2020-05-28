<template>
  <div class="container" v-if="songSheetList" ref="box">
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
    <div class="title">
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
        <span class="vertical">
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
      <div class="playerHeadL">
        <span class="playerIcon">
          <i class="iconfont icon-bofang_bg"></i>
        </span>
        <span>
          播放全部
          <span>（共{{songSheetList.playlist.trackCount}}首）</span>
        </span>
      </div>
      <div class="playerHeadR">+&nbsp;收藏({{songSheetList.playlist.subscribedCount}})</div>
    </div>
    <!-- 歌曲部分 -->
    <div class="songList" :class="{active:scrollState}">
      <ul>
        <li
          class="songItem"
          v-for="(item, index) in songDetail"
          :key="index"
          @click="$router.push({path:`/playerlist/${item.id}`})"
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
import { reqSongSheetDetail, reqSongDetail } from '../../api/index'
import HeaderTop from '../../components/headerTop/headerTop'
export default {
  data () {
    return {
      songSheetList: '',
      songListUrl: [],
      songDetail: [],
      scrollState: ''
    }
  },
  components: {
    HeaderTop
  },
  methods: {
    // 歌单
    async getSongSheetDetail () {
      const result = await reqSongSheetDetail(this.$route.params.id)
      this.songSheetList = result
    },
    // 歌曲详情
    async getSongDetail () {
      const result = await reqSongDetail({ ids: this.songSheetListId })
      this.songDetail = result.songs
    }
  },
  computed: {
    songSheetListId () {
      const list = []
      this.songSheetList.playlist.trackIds.forEach(item => {
        list.push(item.id)
      })
      return list.join(',')
    }
  },
  created () {
    this.getSongSheetDetail()
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      if (top >= 200) {
        this.scrollState = true
      } else {
        this.scrollState = false
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.getSongSheetDetail()
    next()
  },
  watch: {
    songSheetList () {
      this.getSongDetail()
    }
  }
}
</script>
<style lang="scss">
.container {
  margin-top: 70px;
  // 标题
  .headerContain {
    top: 0;
    font-size: 18px;
    align-items: center;
    z-index: 1;
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

          span {
            vertical-align: middle;
          }

          .name {
            font-size: 16px;
            line-height: 100%;
            margin-bottom: 5px;
          }

          .author {
            font-size: 12px;
            color: #ccc;
            line-height: 100%;
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
