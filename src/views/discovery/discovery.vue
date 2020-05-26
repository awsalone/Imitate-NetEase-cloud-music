
<template>
  <div class="container">
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
      <span>
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
              <span id="triangle"></span>
              <div>
                <img :src="item.picUrl" />
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
        <span class="recmmend2">播放全部</span>
      </div>
      <!--音乐列表-->
      <div class="recmmendMusic">
        <div class="music">
          <div class="playInfo">
            <div class="playPortrait"></div>
            <div class="playMusicInfo">
              <span>
                形容
                <span>-沈以诚</span>
              </span>
              <span>xxxxxx</span>
            </div>
          </div>
          <div class="playIcon">
            <i class="iconfont icon-bofang_bg"></i>
          </div>
        </div>
        <div class="music">
          <div class="playInfo">
            <div class="playPortrait"></div>
            <div class="playMusicInfo">
              <span>
                形容
                <span>-沈以诚</span>
              </span>
              <span>xxxxxx</span>
            </div>
          </div>
          <div class="playIcon">
            <i class="iconfont icon-bofang_bg"></i>
          </div>
        </div>
        <div class="music">
          <div class="playInfo">
            <div class="playPortrait"></div>
            <div class="playMusicInfo">
              <span>
                形容
                <span>-沈以诚</span>
              </span>
              <span>xxxxxx</span>
            </div>
          </div>
          <div class="playIcon">
            <i class="iconfont icon-bofang_bg"></i>
          </div>
        </div>
      </div>
    </div>
    <!--播放显示-->
  </div>
</template>
<script>
/* eslint-disable no-new */

import { reqBanner, reqRecSongSheet } from '../../api/index'
import { Swipe, SwipeItem } from 'vant'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      loops: [],
      recSongList: []
    }
  },
  components: {

    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  methods: {
    getLoop: async function () {
      const result = await reqBanner(1)
      this.loops = result.banners
    },
    getrecSongList: async function () {
      const result = await reqRecSongSheet(6)
      this.recSongList = result.result
    },
    skipSongSheet (id) {
      this.$router.push({ path: `/songSheet/${id}` })
    }
  },
  mounted () {
    this.getLoop()
    this.getrecSongList()
  },
  watch: {
    recSongList () {
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
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  .iconfont {
    color: red;
    font-size: 25px;
  }

  /*轮播*/
  .loop {
    width: 300px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    overflow: hidden;
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
              border-width: 6px 0 6px 11px;
              width: 0;
              height: 0;
              border-color: transparent transparent transparent #ccc;
              border-style: solid;
              position: absolute;
              right: 20px;
              top: 2px;
              &::after {
                content: '';
                border-width: 5px 0 5px 9px;
                left: -10.5px;
                top: -5px;
                width: 0;
                height: 0;
                border-color: transparent transparent transparent
                  rgba(0, 0, 0, 0.5);
                border-style: solid;
                position: absolute;
                z-index: 2;
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

      .recmmend1 {
        margin-left: 10px;
      }

      .recmmend2 {
        margin-right: 10px;
      }
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
            background-color: #ccc;
            border-radius: 5px;
          }

          .playMusicInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;

            span:nth-child(2) {
              color: red;
            }
          }
        }

        .playIcon {
          margin-right: 10px;
        }
      }
    }
    &::after {
      display: block;
      height: 70px;
      content: '';
    }
  }
}
</style>
