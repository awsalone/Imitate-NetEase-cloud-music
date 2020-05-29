<template>
  <div class="contain">
    <HeaderTop>
      <template #left>
        <div class="leftContain">
          <span @click="$router.go(-1)">
            <i class="iconfont icon-jiantou3" style="font-size:20px"></i>
          </span>
          <span class="titleName">
            <div class="songName">{{songDetail.name}}</div>
            <div class="author">{{songAuthor}}</div>
          </span>
        </div>
      </template>
      <template #right>
        <div class="rightContain">
          <i class="iconfont icon-fenxiang" style="font-size:20px"></i>
        </div>
      </template>
    </HeaderTop>
    <div class="player">
      <audio :src="songUrl" ref="songPlayer" id="songPlayer"></audio>

      <div id="songProgress">
        <span>{{cTime | songTime}}</span>
        <div id="line" ref="progressP" @click="skipCtime($event)">
          <div id="controller" :style="{width:progressWidth}"></div>
        </div>
        <span>{{dTime | songTime }}</span>
      </div>
      <div id="songControls">
        <div id="playMode" @click="togglePlayMode">
          <i class="iconfont icon-xunhuan" :class="{active: playMode == 0}"></i>
          <i class="iconfont icon-suiji" :class="{active: playMode == 1}"></i>
          <i class="iconfont icon-danquxunhuan" :class="{active: playMode == 2}"></i>
        </div>
        <div id="playBack">
          <i class="iconfont icon-skip--back"></i>
        </div>
        <div id="playState" @click="togglePlayState">
          <i class="iconfont icon-play" :class="{active:!playState}"></i>
          <i class="iconfont icon-pause" :class="{active:playState}"></i>
        </div>
        <div id="playForward">
          <i class="iconfont icon-skip--forward" @click="nextSong"></i>
        </div>
        <div id="playMenu" @click="toggleShow">
          <i class="iconfont icon-caidan"></i>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" round style="height:50%">
      <ul>
        <li v-for="(item,index) in playList" :key="index">{{item.name}}</li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
// eslint-disable-next-line prefer-const
import HeaderTop from '../../components/headerTop/headerTop'
import { mapState } from 'vuex'
import { reqSongLyric } from '../../api/index'
import { Popup } from 'vant'
export default {
  data () {
    return {
      songAuthor: '', // 作者
      lyric: {},
      cTime: '',
      dTime: '',
      playState: false,
      show: false, // 弹出层
      playMode: 0
    }
  },
  components: {
    HeaderTop,
    [Popup.name]: Popup
  },
  filters: {
    songTime:
      function (value) {
        const num = Math.floor(value)
        let min, sec
        if (num >= 60) {
          min = parseInt(num / 60) < 10 ? '0' + parseInt(num / 60) : parseInt(num / 60)
          sec = num % 60 < 10 ? '0' + num % 60 : num % 60
        } else {
          min = '00'
          sec = num < 10 ? '0' + num : num
        }
        return min + ':' + sec
      }

  },
  methods: {
    // 歌词
    async getLyric () {
      const result = await reqSongLyric({ id: this.$route.params.id })
      this.lyric = result
    },
    // 初始化
    init () {
      this.$store.dispatch('getSongDetail', { ids: this.$route.params.id })
      this.$store.dispatch('getSongUrl', { id: this.$route.params.id })
      // 获取时长
      this.$refs.songPlayer.oncanplay = () => {
        this.dTime = this.$refs.songPlayer.duration
        this.cTime = this.$refs.songPlayer.currentTime
      }
    },
    // 切换播放状态
    togglePlayState () {
      this.playState = !this.playState
      if (this.playState) {
        this.$refs.songPlayer.play()
      } else {
        this.$refs.songPlayer.pause()
      }
    },
    // 播放时间定时器
    interval () {
      var that = this
      that._inner = setInterval(function () {
        that.cTime += 1
      }, 1000)
    },
    // 播放进度条跳转
    skipCtime (e) {
      this.cTime = e.offsetX / this.$refs.progressP.offsetWidth * this.dTime
      this.$refs.songPlayer.currentTime = this.cTime
    },
    // 弹出层
    toggleShow () {
      this.show = !this.show
    },
    // 播放模式
    togglePlayMode () {
      if (this.playMode < 2) {
        this.playMode += 1
      } else {
        this.playMode = 0
      }
      const index = this.playList.indexOf(this.songDetail)
      console.log(index)
    },
    // 下一首
    nextSong () {
      const that = this
      const index = this.playList.findIndex((item) => {
        return item.id === that.songDetail.id
      })
      let songId = null
      if (this.playList.length > index + 1) {
        songId = this.playList[index + 1].id
      } else {
        songId = this.playList[0].id
      }
      this.$store.dispatch('getSongDetail', { ids: songId })
      this.$store.dispatch('getSongUrl', { id: songId })
      console.log(this.$refs.songPlayer)
      this.$nextTick(() => {
        this.$refs.songPlayer.load()
        this.$refs.songPlayer.play()
      })
    }
  },
  computed: {
    ...mapState(['songDetail', 'songUrl', 'playList']),
    progressWidth: function () {
      return this.cTime / this.dTime * 100 + '%'
    }
    // playListMode: function () {
    //   const arr = []
    //   if (this.playMode === 0){
    //     arr = this.playList
    //   }else if (this.playMode === 1){

    //   }
    //   return arr
    // }
  },

  watch: {
    songDetail: function () {
      this.songAuthor = this.songDetail.ar[0].name
    },
    playState: function () {
      if (this.playState === true) {
        this.interval()
      } else {
        clearInterval(this._inner)
      }
    }
  },
  mounted () {
    this.getLyric()
    this.init()
    // this.$nextTick(() => {
    //   console.log(this.$refs.songPlayer.duration)
    // })
  },

  updated () {
  },
  beforeRouteUpdate (to, from, next) {
    this.getSongUrl()
    this.getSongDetail()
    this.getLyric()
    next()
  }
}
</script>
<style lang="scss">
.contain {
  .leftContain {
    display: flex;
    align-items: center;
    span {
      margin: 0 10px;
    }
    .titleName {
      .author {
        font-size: 12px;
        color: #ccc;
        margin-top: 3px;
      }
    }
  }
  .rightContain {
    margin: 0 10px;
  }
  .player {
    position: absolute;
    bottom: 0;
    height: 80px;
    width: 100%;
    i {
      font-size: 30px;
    }
    #songProgress {
      display: flex;
      justify-content: space-around;
      span {
        font-size: 13px;
      }
      #line {
        margin: 5px 0;
        width: 75%;
        height: 1px;
        background-color: #ccc;

        #controller {
          width: 100px;
          background-color: red;
          height: 100%;
          // &::after {
          //   content: '';
          //   display: block;
          //   width: 5px;
          //   height: 5px;
          //   border-radius: 50%;
          //   background-color: blue;
          // }
        }
      }
    }
    #songControls {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 10px;
      #playMode {
        i {
          display: none;
        }
        .active {
          display: block;
        }
      }
      #playState {
        border: 1px solid #ccc;
        border-radius: 50%;
        padding: 10px;
        i {
          display: none;
          &:first-child {
            transform: translateX(10%);
          }
        }
        .active {
          display: block;
        }
      }
    }
  }
}
</style>
