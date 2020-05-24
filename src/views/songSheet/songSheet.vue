<template>
  <div class="container">
    <!--标题-->
    <header>
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
    </header>
    <!--头部-->
    <div class="title">
      <div class="top">
        <div class="pic"></div>
        <div class="des">
          <div class="name">111</div>
          <div class="author">222</div>
          <div class="description">333</div>
        </div>
      </div>
      <div class="bottom">
        <span class="vertical">
          <i class="iconfont icon-pinglun"></i>
          <span></span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-fenxiang"></i>
          <span></span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-xiazai"></i>
          <span>下载</span>
        </span>
        <span class="vertical">
          <i class="iconfont icon-duoxuan"></i>
          <span>多选</span>
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
          <span>（共1首）</span>
        </span>
      </div>
      <div class="playerHeadR">+&nbsp;收藏(1111)</div>
    </div>
    <!-- 歌曲部分 -->
    <div class="songList">
      <ul>
        <li class="songItem">
          <div class="songItemL">
            <div class="index"></div>
            <div class="musicName">
              <span class="name">残酷月光12313</span>
              <span class="author">林宥嘉</span>
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
import { reqSongSheetDetail } from '../../api/index'
export default {
  data () {
    return {
      songSheetList: []
    }
  },
  methods: {
    async getSongSheetDetail () {
      const result = await reqSongSheetDetail(this.$route.params.id)
      this.songSheetList = result
    }
  },
  mounted () {
    this.getSongSheetDetail()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  }
}
</script>
<style lang="scss">
.container {
  // 标题
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    align-items: center;
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
    .top {
      display: flex;

      .pic {
        background-color: #aaa;
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
      }
    }
    i {
      font-size: 25px;
      font-weight: bold;
    }
  }
  // 脱离定位部分
  .playerHead {
    height: 60px;
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
