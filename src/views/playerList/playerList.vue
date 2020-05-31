<template>
  <div class="contain">
    <!-- 背景 -->
    <div class="background" :style="{backgroundImage:songPic}"></div>
    <!-- 头部 -->
    <HeaderTop style="backgroundColor:rgba(0,0,0,0)">
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
    <!-- cd转盘 -->
    <div class="songContainer" v-show="middleShow" @click="middleShow = !middleShow">
      <div class="songPic">
        <div class="pic active" :style="{backgroundImage: songPic}" :class="{pause:playState}"></div>
      </div>
    </div>
    <!-- 歌词 -->
    <div class="lyricContain" v-show="!middleShow" @click="middleShow = !middleShow"></div>
    <!-- 底部播放器 -->
    <div class="player">
      <audio :src="songUrl" ref="songPlayer" id="songPlayer" autoplay></audio>

      <div id="songProgress">
        <span>{{cTime | songTime}}</span>
        <div id="line" ref="progressP" @click="skipCtime($event)">
          <div id="controller" :style="{width:progressWidth}"></div>
        </div>
        <span>{{dTime | songTime }}</span>
      </div>
      <div id="songControls">
        <div class="playMode" @click="togglePlayMode">
          <i class="iconfont icon-xunhuan" :class="{active: playMode == 0}"></i>
          <i class="iconfont icon-suiji" :class="{active: playMode == 1}"></i>
          <i class="iconfont icon-danquxunhuan" :class="{active: playMode == 2}"></i>
        </div>
        <div id="playBack" @click="preSong">
          <i class="iconfont icon-skip--back"></i>
        </div>
        <div id="playState" @click="togglePlayState">
          <i class="iconfont icon-play" :class="{active:playState}"></i>
          <i class="iconfont icon-pause" :class="{active:!playState}"></i>
        </div>
        <div id="playForward" @click="nextSong">
          <i class="iconfont icon-skip--forward"></i>
        </div>
        <div id="playMenu" @click="toggleShow">
          <i class="iconfont icon-caidan"></i>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" round style="height:50%" class="popup">
      <div class="popupTitle">当前播放（{{playList.length}}）</div>
      <div class="popupControl">
        <div class="popupControlL">
          <span>
            <div class="playMode" @click="togglePlayMode">
              <i class="iconfont icon-xunhuan" :class="{active: playMode == 0}"></i>
              <i class="iconfont icon-suiji" :class="{active: playMode == 1}"></i>
              <i class="iconfont icon-danquxunhuan" :class="{active: playMode == 2}"></i>
            </div>
          </span>
          <span>{{playMode ===0? '列表循环': playMode ===1 ? '随机播放' : '单曲循环'}}</span>
        </div>
        <div class="popupControlR" @click="deleteSongList">
          <i class="iconfont icon-huishouzhan_huaban"></i>
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in playList" :key="index" class="popupLi">
          <span class="popupName">{{item.name}}</span>
          <span @click="deleteSong(item.id)">
            <i class="iconfont icon-guanbi"></i>
          </span>
        </li>
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
      songPic: '',
      lyric: {},
      cTime: '',
      dTime: '',
      playMode: '',
      playState: false, // false暂停 true播放
      show: false, // 弹出层
      middleShow: true, // true cd播放 false 歌词界面
      id: ''
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
    init (id) {
      this.$store.dispatch('getSongDetail', { ids: id })
      this.$store.dispatch('getSongUrl', { id: id })

      // 获取时长
      this.$refs.songPlayer.oncanplay = () => {
        this.dTime = this.$refs.songPlayer.duration
        this.cTime = this.$refs.songPlayer.currentTime
      }
      this.$refs.songPlayer.onended = () => {
        this.nextSong()
      }
      clearInterval(this._inner)
      this.interval()
      this.playMode = this.playModeNum
    },
    // 切换播放状态
    togglePlayState () {
      this.playState = !this.playState
      const audio = this.$refs.songPlayer
      if (!this.playState) {
        audio.play()
      } else {
        audio.pause()
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
    },
    // 下一首
    nextSong () {
      const that = this
      const index = this.playListMode.findIndex((item) => {
        return item.id === that.songDetail.id
      })
      let songId = null
      if (that.playList.length === 1) {
        songId = this.playListMode[0].id
        that.$refs.songPlayer.currentTime = 0
      } else if (this.playListMode.length > index + 1) {
        songId = this.playListMode[index + 1].id
      } else {
        songId = this.playListMode[0].id
        that.$refs.songPlayer.currentTime = 0
      }
      this.id = songId
      this.playState = false
      clearInterval(this._inner)
      this.interval()
    },
    // 上一首
    preSong () {
      const that = this
      const length = that.playListMode.length
      const index = this.playListMode.findIndex((item) => {
        return item.id === that.songDetail.id
      })
      let songId = null
      if (index > 0) {
        songId = this.playListMode[index - 1].id
      } else {
        songId = this.playListMode[length - 1].id
      }
      this.id = songId
      this.playState = false
      clearInterval(this._inner)
      this.interval()
    },
    // 清空播放列表
    deleteSongList () {
      this.$store.commit('delete_playList')
      this.show = false
    },
    deleteSong (id) {
      this.$store.commit('delete_song', { id: id })
    }

  },
  computed: {
    ...mapState(['songDetail', 'songUrl', 'playList', 'playModeNum']),
    progressWidth: function () {
      return this.cTime / this.dTime * 100 + '%'
    },
    // 根据播放模式改变播放列表排序
    playListMode: function () {
      let arr = []
      if (this.playMode === 0) {
        arr = this.playList
      } else if (this.playMode === 1) {
        // 随机
        arr = this.playList
        const length = this.playList.length
        for (var i = 0; i < length; i++) {
          var index = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[index]] = [arr[index], arr[i]]
        }
      } else if (this.playMode === 2) {
        arr = [this.songDetail]
      }
      this.$store.commit('receive_playMode', { num: this.playMode })
      return arr
    }
  },

  watch: {
    // 获取歌曲歌手名
    songDetail: function () {
      this.songAuthor = this.songDetail.ar[0].name
      this.songPic = `url(${this.songDetail.al.picUrl})`
    },
    // 播放状态设置清除定时器
    playState: function () {
      clearInterval(this._inner)
      if (this.playState === false) {
        this.interval()
      } else {
        clearInterval(this._inner)
      }
    },
    // 动态路由参数改变的渲染
    $route (to, from) {
      this.init(this.$route.params.id)
    },
    // 监听页面内id变化重新渲染
    id: function () {
      this.init(this.id)
    },
    playList: function () {
      if (!this.playList.length) {
        this.show = false
      }
    }
  },
  mounted () {
    this.getLyric()
    this.id = this.$route.params.id
    this.init(this.id)
  }
}
</script>
<style lang="scss">
@keyframes rotatePic {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.contain {
  height: 100%;
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(50px);
    z-index: -1;
  }
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
  .songContainer {
    display: flex;
    .songPic {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: rgba(224, 221, 221, 0.5);
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);

      .pic {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 50%;
        background-size: 100% 100%;
        &.active {
          animation: rotatePic 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
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
      .playMode {
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
  .popup {
    .popupTitle {
      margin: 15px 0 10px 10px;
      font-size: 20px;
    }
    .popupControl {
      display: flex;
      justify-content: space-between;
      height: 25px;
      padding: 5px 10px;
      .popupControlL {
        display: flex;
        align-items: center;
        .playMode {
          i {
            display: none;
            font-size: 30px;
          }
          .active {
            display: block;
          }
        }
      }
      .popupControlR {
        i {
          font-size: 20px;
        }
      }
    }
    .popupLi {
      display: flex;
      justify-content: space-between;
      height: 25px;
      padding: 5px 10px;

      .popupName {
        display: block;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
