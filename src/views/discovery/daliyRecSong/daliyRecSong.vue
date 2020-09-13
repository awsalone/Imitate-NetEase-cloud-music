<template>
  <div class="sScontainer" v-if="songSheetList" ref="box">
    <!--标题-->
    <HeaderTop class="headerContain">
      <template #left>
        <div class="left">
          <span @click="$router.go(-1)">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
        </div>
      </template>
    </HeaderTop>
    <!--头部-->
    <div class="title" ref="scrollBorder">
      <div class="top">
        <p>每日推荐</p>
        <p>（此处应有背景）</p>
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
          <span>（共{{songSheetList.length}}首）</span>
        </span>
      </div>
    </div>
    <!-- 歌曲部分 -->
    <div class="songList" :class="{active:scrollState}">
      <ul>
        <li
          class="songItem"
          v-for="(item, index) in songSheetList"
          :key="index"
          @click="changeSong(item.id)"
        >
          <div class="songItemL">
            <div class="index">{{index+1}}</div>
            <div class="musicName">
              <span class="name">{{item.name}}</span>
              <span class="author">{{item.artists[0].name}}</span>
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
import { recSong } from '../../../api/index'
import HeaderTop from '../../../components/headerTop/headerTop'
export default {
  data () {
    return {
      songSheetList: '',
      scrollState: '',
      scrollHeight: '100'
    }
  },
  components: {
    HeaderTop
  },
  methods: {
    changeSong (id) {
      this.$store.dispatch('getSongDetail', { ids: id })
      this.$store.commit('receive_playState', { zt: false })
    }
  },
  async created () {
    const res = await recSong()
    this.songSheetList = res.recommend
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
  beforeRouteUpdate (to, from, next) {
    next()
  }
}
</script>
<style lang="scss" scoped>
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
  }
  // 头部
  .title {
    margin-top: 70px;
    height: 100px;
    width: 100%;
    .top {
      font-size: 20px;
      text-align: center;
      vertical-align: middle;
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
