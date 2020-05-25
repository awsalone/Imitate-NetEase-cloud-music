<template>
  <div class="container" v-if="songSheetList" ref="box">
    <!--标题-->
    <header class="clearFix">
      <div class="headerContain">
        <div class="left">
          <span>
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span>歌单</span>
        </div>
        <div class="right">
          <span>
            <i class="iconfont icon-icon-" style="font-size:25px"></i>
          </span>
          <span>
            <i class="iconfont icon-gengduo" style="font-size:25px"></i>
          </span>
        </div>
      </div>
    </header>
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
    <div class="playerHead">
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
    <div class="songList">
      <ul>
        <li class="songItem" v-for="(item, index) in songDetail" :key="index">
          <div class="songItemL">
            <div class="index">{{index+1}}</div>
            <div class="musicName">
              <span class="name">{{item.name}}</span>
              <span class="author">{{item.al.name}}</span>
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
import { reqSongSheetDetail, reqSongUrl, reqSongDetail } from '../../api/index'
export default {
  data () {
    return {
      songSheetList: '',
      songListUrl: [],
      songDetail: []
    }
  },
  methods: {
    async getSongSheetDetail () {
      const result = await reqSongSheetDetail(this.$route.params.id)
      this.songSheetList = result
    },
    async getSongUrl () {
      const result = await reqSongUrl({ id: this.songSheetListId })
      this.songListUrl = result.data
    },
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
    },
    pageScroll () {
      const longth = document.documentElement.scrollTop || document.body.scrollTop
      return longth
    }
  },
  created () {
    this.getSongSheetDetail()
  },
  mounted () {
    window.addEventListener('scroll', () => {
      console.log(111)
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.getSongSheetDetail()
    next()
  },
  watch: {
    songSheetList () {
      this.getSongUrl()
      this.getSongDetail()
    }
  }
}
</script>
<style lang="scss">
.clearFix {
  &::after,
  &::before {
    display: block;
    content: '';
    height: 0;
    clear: both;
    visibility: hidden;
    overflow: hidden;
  }
}
.container {
  // 标题
  header {
    .headerContain {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
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
    .active {
      position: fixed;
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
  }
}
</style>
