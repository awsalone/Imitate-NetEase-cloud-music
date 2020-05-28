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
      <audio :src="songUrl" controls ref="songPlayer" id="songPlayer"></audio>

      <div id="songProgress">
        <span>{{initTime}}</span>
        <div id="line">
          <div id="controller"></div>
        </div>
        <span>{{dTime | songTime }}</span>
      </div>
      <div id="songControls">
        <div id="playMode">
          <i class="iconfont icon-xunhuan active"></i>
          <i class="iconfont icon-suiji"></i>
          <i class="iconfont icon-danquxunhuan"></i>
        </div>
        <div id="playBack">
          <i class="iconfont icon-skip--back"></i>
        </div>
        <div id="playState" @click="togglePlayState">
          <i class="iconfont icon-play" :class="{active:!playState}"></i>
          <i class="iconfont icon-pause" :class="{active:playState}"></i>
        </div>
        <div id="playForward">
          <i class="iconfont icon-skip--forward"></i>
        </div>
        <div id="playMenu">
          <i class="iconfont icon-caidan"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from '../../components/headerTop/headerTop'
import { mapState } from 'vuex'
import { reqSongLyric } from '../../api/index'
export default {
  data () {
    return {
      songAuthor: '', // 作者
      lyric: {},
      initTime: '00:00',
      dTime: '',
      playState: false,
      url: 'http://m7.music.126.net/20200528184413/45920b4b15caa8baae079124f1381c57/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2606669695/58c8/bf36/c2e7/1cdf4b558da5a2eecb444f9bca4b6997.mp3'
    }
  },
  components: {
    HeaderTop
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
    init () {
      this.$store.dispatch('getSongDetail', { ids: this.$route.params.id })
      this.$store.dispatch('getSongUrl', { id: this.$route.params.id })
      // 获取时长
      this.$refs.songPlayer.oncanplay = () => {
        this.dTime = this.$refs.songPlayer.duration
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
    }
  },
  computed:
    mapState(['songDetail', 'songUrl']),
  watch: {
    songDetail: function () {
      this.songAuthor = this.songDetail.ar[0].name
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
    height: 80px;
    i {
      font-size: 30px;
    }
    #songProgress {
      span {
        font-size: 13px;
      }
      #line {
        margin: 5px 40px;
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
