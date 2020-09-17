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
    <div class="songContainer" @click="middleShow = !middleShow">
      <div class="songPic" v-if="middleShow">
        <div class="pic active" :style="{backgroundImage: songPic}" :class="{pause:playStateC}"></div>
      </div>
      <!-- 歌词 -->
      <div class="lyricContain" v-else @click.stop="middleShow = !middleShow">未获取到歌词</div>
    </div>
    <div>
      <ul class="bottomMenu">
        <li @click="commentPage()">
          <span class="bottomMenuItem">评论</span>
        </li>
        <li></li>
      </ul>
    </div>
    <!-- 底部播放器 -->
  </div>
</template>

<script>
// eslint-disable-next-line prefer-const
import HeaderTop from '../../components/headerTop/headerTop'
import { mapState } from 'vuex'
import { reqSongLyric } from '../../api/index'
export default {
  data () {
    return {
      songAuthor: '', // 作者
      songPic: '',
      middleShow: true, // true cd播放 false 歌词界面
      id: ''
    }
  },
  components: {
    HeaderTop
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
    },
    commentPage () {
      this.$router.push(`/songComment${this.$route.params.id}`)
    }
  },
  computed: {
    ...mapState(['songDetail', 'playStateC'])
  },

  watch: {
    // 获取歌曲歌手名
    songDetail: function () {
      this.songAuthor = this.songDetail.ar[0].name
      this.songPic = `url (${this.songDetail.al.picUrl
        })`
      this.id = this.songDetail.id
    },
    // 动态路由参数改变的渲染
    $route (to, from) {
      this.init(this.$route.params.id)
    },
    // 监听页面内id变化重新渲染
    id: function () {
      this.init(this.id)
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
@import url('../../static/support.css');
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
  .bottomMenu {
    position: absolute;
    bottom: 100px;
    background-color: #ccc;
    width: 100%;
  }
  .lyricContain {
    text-align: center;
    top: 70px;
    bottom: 80px;
    position: absolute;
    width: 100%;
  }
}
</style>
