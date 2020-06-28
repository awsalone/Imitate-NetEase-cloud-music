
<template>
  <div class="containerDis">
    <!--轮播-->
    <van-swipe class="loop" :autoplay="0" indicator-color="red">
      <van-swipe-item class="loopPic" v-for="(item,index) in loops" :key="index">
        <img :src="item.pic" alt />
        <span
          class="bottomIcon"
          style="opacity:0.9"
          :style="{backgroundColor:item.titleColor}"
        >{{item.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
    <!--导航-->
    <nav>
      <span>
        <span>
          <i class="iconfont icon-rilicalendar107"></i>
        </span>
        <span>每日推荐</span>
      </span>
      <span @click="$router.push('/songSheetPG')">
        <span>
          <i class="iconfont icon-icon-1"></i>
        </span>
        <span>歌单</span>
      </span>
      <span>
        <span>
          <i class="iconfont icon-paixingbang"></i>
        </span>
        <span>排行榜</span>
      </span>
      <span>
        <span>
          <i class="iconfont icon-fasheta_bg"></i>
        </span>
        <span>电台</span>
      </span>
    </nav>
    <!--热门歌单-->
    <div class="hotSheet">
      <div class="hotSheetBanner">
        <div>发现好歌单</div>
        <div>查看更多</div>
      </div>
      <div class="hotSheetContent">
        <ul class="hotSheetUl" ref="hotSheetList">
          <li
            class="hotSheetli"
            v-for="(item,index) in recSongList"
            :key="index"
            @click="skipSongSheet(item.id)"
          >
            <div class="picContain">
              <span id="triangle">
                <i class="iconfont icon-play"></i>
                {{item.playCount | count}}
              </span>
              <div>
                <img :src="item.picUrl+'?param=100y100'" />
              </div>
            </div>
            <span class="picText">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--推荐歌曲-->
    <div class="recmmend">
      <!--标题-->
      <div class="recmmendWords">
        <span class="recmmend1">推荐歌曲</span>
        <span class="recmmend2" @click="playAll(recNewSong,recNewSong[0].id)">播放全部</span>
      </div>
      <!--音乐列表-->
      <div class="recmmendMusic">
        <ul v-if="recNewSong">
          <li
            class="music"
            v-for="(item,index) in recNewSong"
            :key="index"
            @click="changeSong(item.id)"
          >
            <div class="playInfo">
              <div class="playPortrait">
                <img v-lazy="item.picUrl+'?param=50y50'" />
              </div>
              <div class="playMusicInfo">
                <span>{{item.name}}</span>
                <span>-{{item.song.artists[0].name}}</span>
              </div>
            </div>
            <div class="playIcon">
              <i
                class="iconfont icon-bofang_bg"
                :class="{active: item.id === songDetail.id && !playStateC}"
              ></i>
              <i
                class="iconfont icon-volume--up--filled"
                :class="{active: !(item.id === songDetail.id&& !playStateC)}"
              ></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--播放显示-->
    <button @click="a">1231231321</button>
  </div>
</template>
<script>
/* eslint-disable no-new */

import { reqBanner, reqRecSongSheet, reqrecNewSong } from '../../api/index'
import { Swipe, SwipeItem } from 'vant'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loops: [],
      recSongList: [], // 推荐歌单
      recNewSong: [], // 推荐新歌
      playState: false, // 播放状态
      curId: '' // 当前点击歌曲id
    }
  },
  components: {

    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  filters: {
    count: function (value) {
      let tranNumber = ''
      const numStr = value.toString().split('.')[0]
      if (numStr.length < 5) {
        tranNumber = numStr
      } else if (numStr.length < 9) {
        tranNumber = numStr.substring(0, numStr.length - 4) + '万'
      } else {
        tranNumber = numStr.substring(0, numStr.length - 8) + '亿'
      }
      return tranNumber
    }

  },
  methods: {
    a () {
      window.localStorage.removeItem('touristLogin')
      console.log(window.localStorage.getItem('touristLogin'))
    },
    // 获取轮播图数据
    getLoop: async function () {
      const result = await reqBanner(1)
      this.loops = result.banners
    },
    // 获取推荐歌单数据
    getrecSongList: async function () {
      const result = await reqRecSongSheet(6)
      this.recSongList = result.result
    },
    // 跳转歌单页面
    skipSongSheet (id) {
      this.$router.push({ path: `/songSheet/${id}` })
    },
    // 获取推荐歌曲
    getrecSong: async function () {
      const result = await reqrecNewSong()
      this.recNewSong = result.result
    },
    // 点击播放
    changeSong (id) {
      if (id) {
        this.curId = id
        if (!this.songDetail || this.songDetail.id !== id) {
          this.$store.dispatch('getSongDetail', { ids: id })
          this.$store.commit('receive_playState', { zt: false })
        } else {
          this.$router.push({ path: `/playerlist/${id}` })
        }
      }
    },
    // 播放全部
    playAll (list, id) {
      this.$store.commit('play_all', { playList: list })
      this.changeSong(id)
    }
  },
  mounted () {
    this.getLoop()
    this.getrecSongList()
    this.getrecSong()
    this.playState = this.playStateC
  },
  computed: {
    ...mapState(['playStateC', 'songDetail', 'playStateC']),
    active: function () {
      let state = ''
      if (this.curId === this.songDetail.id && !this.playStateC) {
        state = true
      } else {
        state = false
      }
      return state
    }

  },
  watch: {
    recSongList () {
      // 轮播
      this.$nextTick(() => {
        const count = this.recSongList.length
        this.$refs.hotSheetList.style.width = 106 * count + 10 + 'px'
        this.hotSheetScroll = new BScroll('.hotSheetContent', {
          scrollX: true,
          flickLimitDistance: 110,
          click: true
        })
      })
    }

  }
}
</script>
<style lang="scss">
@import url('../../static/support.css');
.containerDis {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  overflow: hidden;
  .iconfont {
    color: red;
    font-size: 25px;
  }

  /*轮播*/
  .loop {
    width: 300px;
    height: 100px;
    margin: 10px 0;
    border-radius: 5px;
    display: flex;
    .loopPic {
      width: 300px;
      height: 100px;
      position: relative;
      flex: 0 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
      .bottomIcon {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px;
        font-size: 13px;
        border-radius: 5px 0 0 0;
        color: white;
      }
    }
  }

  /*导航*/
  nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50px;
      height: 50px;
      i {
        vertical-align: middle;
      }
      &:last-child {
        font-size: 10px;
        flex: 0 2 auto;
      }
    }
  }
  // 推荐歌单
  .hotSheet {
    margin: 20px 0;
    width: 100%;
    overflow: hidden;
    .hotSheetBanner {
      vertical-align: middle;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      :first-child {
        font-size: 20px;
        font-weight: bold;
      }
      :last-child {
        border: 1px solid rgb(172, 171, 171);
        border-radius: 35px;
        padding: 5px;
        font-size: 13px;
        width: 60px;
        text-align: center;
      }
    }
    .hotSheetContent {
      overflow: hidden;
      .hotSheetUl {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        margin: 5px 0;
        .hotSheetli {
          margin-left: 5px;
          .picContain {
            position: relative;
            width: 100px;
            height: 100px;

            border: 1px solid #ccc;
            border-radius: 5px;
            #triangle {
              top: 3px;
              right: 10%;
              position: absolute;
              font-size: 12px;
              color: #ccc;
              i {
                font-size: 13px;
                color: #ccc;
              }
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .picText {
            word-break: break-all;
            width: 100%;
            font-size: 12px;
            font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;

            -webkit-box-orient: vertical;

            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
  /*推荐音乐*/
  .recmmend {
    margin-top: 10px;
    width: 100%;
    .recmmendWords {
      display: flex;
      justify-content: space-between;
      margin: 0 10px 10px 10px;
    }

    .recmmendMusic {
      .music {
        display: flex;
        justify-content: space-between;
        height: 60px;
        align-items: center;

        .playInfo {
          display: flex;

          .playPortrait {
            margin: 5px;
            width: 50px;
            height: 50px;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .playMusicInfo {
            display: flex;
            align-items: center;
            span:nth-child(2) {
              margin-left: 10px;
              color: #ccc;
              font-size: 12px;
            }
          }
        }

        .playIcon {
          margin-right: 10px;
          .active {
            display: none;
          }
        }
      }
    }
  }
  &::after {
    display: block;
    height: 70px;
    content: '';
  }
}
</style>
